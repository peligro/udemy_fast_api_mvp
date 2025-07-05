import { Link, useLoaderData } from "react-router-dom";
import type { EstadoInterface, PerfilInterface, UsuarioInterface } from "../interfaces/Interfaces";
import { addData, deleteData, getDatos, setData } from "../servicios/UsuariosService";
import { getDatos as getDatosPerfil } from "../servicios/PerfilesService";
import { getDatos as getDatosEstado } from "../servicios/EstadoService";
import Header from "../componentes/Header";
import Menu from "../componentes/Menu";
import { Breadcrumb, Form, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import Footer from "../componentes/Footer";
import type { AlertCustomInterface } from "../custom/AlertCustom";
import AlertCustom from "../custom/AlertCustom";

export async function loader() {
    const datos: UsuarioInterface[] = await getDatos();
    const perfiles: PerfilInterface[] = await getDatosPerfil();
    const estados: EstadoInterface[] = await getDatosEstado();
    return [datos[0], perfiles, estados[0]];
}

const Usuarios = () => {
    const context = useContext(AuthContext);
    if (!context) {
        return (
            <div>Error: No se pudo cargar el contexto de autenticación.</div>
        );
    }
    const { handleValidarAcceso, showConfirm, setConfirmData } = context;
    useEffect(() => {

        handleValidarAcceso(`1`);
    },);
    let [datos, perfiles, estados] = useLoaderData() as [UsuarioInterface[], PerfilInterface[], EstadoInterface[]];
    //ventana modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [acciones, setAcciones] = useState(1);
    const [accionesId, setAccionesId] = useState<number | undefined>();


    //formulario
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [perfil_id, setPerfil_id] = useState('0');
    const [estado_id, setEstado_id] = useState('0');
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (perfil_id=="0") {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El campo perfil es obligatorio",
                headerBg: "bg-danger"
            });
            setNombre("");
            return false;
        }
        if (nombre.trim() == "") {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El campo nombre es obligatorio",
                headerBg: "bg-danger"
            });
            setNombre("");
            return false;
        }
        if (correo.length == 0 && correo == "") {

            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El campo correo es obligatorio",
                headerBg: "bg-danger" 
            });
            setCorreo("");
            return false;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(correo)) {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El E-Mail ingresado no es válido",
                headerBg: "bg-danger" 
            });
            setCorreo("");
            return false;
        }
        if (telefono.trim() == "") {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El campo teléfono es obligatorio",
                headerBg: "bg-danger"
            });
            setTelefono("");
            return false;
        }
        if(acciones==1)
        {
            if (password.length == 0 && password == "") {
                setAlertData({
                    estado: true,
                    titulo: "Alerta !!!",
                    detalle: "El campo contraseña es obligatorio",
                    headerBg: "bg-danger"
                });
                setPassword("");
                return false;
            }
        }
       
        if (acciones == 1) {
            if ( await addData({ nombre: nombre, correo:correo, telefono:telefono, password:password, perfil_id:parseInt(perfil_id) })==201) {
                setAlertData({
                    estado: true,
                    titulo: "Excelente !!!",
                    detalle: "Se creó el registro exitosamente",
                    headerBg: "bg-success"
                });
                setInterval(() => {
                    window.location.href = location.href
                }, 2000);
            } else {
                setAlertData({
                    estado: true,
                    titulo: "Alerta !!!",
                    detalle: "Se produjo un error inesperado",
                    headerBg: "bg-danger"
                });
            }
        }
        if (acciones == 2) {
        if (await setData( {id: accionesId, nombre: nombre, correo:correo, telefono:telefono, password:password, perfil_id:parseInt(perfil_id), estado_id:parseInt(estado_id), editar: (password=="")? 0:1 }) == 200) {
                setAlertData({
                    estado: true,
                    titulo: "Excelente !!!",
                    detalle: "Se modificó el registro exitosamente",
                    headerBg: "bg-success"
                });
                setInterval(() => {
                    window.location.href = location.href
                }, 2000);
            } else {
                setAlertData({
                    estado: true,
                    titulo: "Alerta !!!",
                    detalle: "Se produjo un error inesperado",
                    headerBg: "bg-danger"
                });
            }
        }

    };
    const handleCrear = () => {
        setAcciones(1);
        setNombre('');
        setCorreo('');
        setTelefono('');
        setPassword('');
        setPerfil_id('0');
        handleShow();
    };
    const handleEditar = (modulo: UsuarioInterface) => {

        setAcciones(2);
        setAccionesId(modulo.id);
        setNombre(modulo.nombre);
        setCorreo(modulo.correo);
        setTelefono(modulo.telefono);
        setPassword('');
        setPerfil_id(`${modulo.perfil_id}`);
        setEstado_id(`${modulo.estado_id}`);
        handleShow();
    };
    const handleEliminar = async (id: number) => {
        showConfirm({
            titulo: "Confirmar",
            detalle: "¿Realmente desea eliminar este registro?",
            headerBg: "bg-info",
            esConfirm: true,
            onConfirm: async () => {
                try {
                    await deleteData(id);
                    setAlertData({
                        estado: true,
                        titulo: "Excelente !!!",
                        detalle: "Se eliminó el registro exitosamente",
                        headerBg: "bg-success"
                    });
                    setTimeout(() => {  // Cambié setInterval por setTimeout
                        window.location.href = location.href;
                    }, 2000);
                } catch (error) {
                    setAlertData({
                        estado: true,
                        titulo: "Alerta !!!",
                        detalle: "Se produjo un error inesperado",
                        headerBg: "bg-danger"
                    });
                }
            },
            onClose: () => setConfirmData(null)
        });
    };
    //modal
    const [alertData, setAlertData] = useState<AlertCustomInterface>({
        estado: false,
        titulo: "",
        detalle: "",
        headerBg: "bg-primary" // Valor por defecto
    });

    const handleCloseModal = () => {
        setAlertData(prev => ({
            ...prev,
            estado: false
        }));

    };
    return (
        <>
            <AlertCustom
                estado={alertData.estado}
                titulo={alertData.titulo}
                detalle={alertData.detalle}
                onClose={handleCloseModal}
                headerBg={alertData.headerBg} // Pasa el valor del estado
            />
            <div className="wrapper">
                <Menu />

                <div className="main">
                    <Header />
                    <main className="content">
                        <div className="container-fluid p-0">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item active>Usuarios</Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className="h3 mb-3">
                                Usuarios
                            </h1>

                            <div className="row">

                                <div className="col-12 col-lg-12  d-flex">
                                    <div className="card flex-fill">
                                        <div className="card-header">
                                            <a className="btn btn-outline-primary float-end" title="Crear" onClick={() => { handleCrear() }}>
                                                <i className="fas fa-check"></i> Crear
                                            </a>
                                            <h5 className="card-title mb-0"> </h5>
                                        </div>

                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-striped table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Perfil</th>
                                                            <th>Estado</th>
                                                            <th>Nombre</th>
                                                            <th>Correo</th>
                                                            <th>Fecha</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {datos.map((dato: UsuarioInterface) =>
                                                        (
                                                            <tr key={dato.id}>
                                                                <td>{dato.id}</td>
                                                                <td>{dato.perfil}</td>
                                                                <td>
                                                                    <div className={`text-${dato.estado_id==1 ? 'primary':'danger'} `} style={{fontWeight:"bold"}}>
                                                                        {dato.estado}
                                                                    </div>
                                                                </td>
                                                                <td>{dato.nombre}</td>
                                                                <td>{dato.correo}</td>
                                                                <td>{dato.fecha}</td>
                                                                <td className="text-center">

                                                                    <Link to="#" onClick={() => {handleEditar(dato) }} title="Editar">
                                                                        <i className="fas fa-edit"></i>
                                                                    </Link>
                                                                    &nbsp;&nbsp;
                                                                    <Link onClick={() => { handleEliminar(dato.id)}} to="#" title="Eliminar"><i className="fas fa-trash"></i></Link>
                                                                </td>
                                                            </tr>
                                                        ))}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>


                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
            {/*modal */}
            <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {acciones == 1 ? "Crear" : "Editar"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="row gy-3">

                            {acciones==2 && (
                                <>
                                <div className="col-lg-12">
                                <label htmlFor="estado_id">Estado</label>
                                <select id="estado_id" value={estado_id} onChange={(e) => setEstado_id(e.target.value)} className="form-control"> 
                                    {estados.map((estado) => (
                                        <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                                    ))}
                                </select>
                            </div>
                                </>
                            )}
                            <div className="col-lg-12">
                                <label htmlFor="perfil_id">Perfil</label>
                                <select id="perfil_id" value={perfil_id} onChange={(e) => setPerfil_id(e.target.value)} className="form-control">
                                    <option value="0">Seleccione.....</option>
                                    {perfiles.map((perfile) => (
                                        <option key={perfile.id} value={perfile.id}>{perfile.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-lg-12'>
                                <label className="form-label" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    className="form-control"
                                    id="nombre"
                                    type="text"
                                    placeholder='Nombre'
                                    value={nombre}
                                    onChange={(e) => { setNombre(e.target.value) }}
                                />
                            </div>
                            <div className='col-lg-12'>
                                <label className="form-label" htmlFor="correo">
                                    Correo
                                </label>
                                <input
                                    className="form-control"
                                    id="correo"
                                    type="text"
                                    placeholder='Correo'
                                    value={correo}
                                    onChange={(e) => { setCorreo(e.target.value) }}
                                />
                            </div>
                            <div className='col-lg-12'>
                                <label className="form-label" htmlFor="telefono">
                                    Teléfono
                                </label>
                                <input
                                    className="form-control"
                                    id="telefono"
                                    type="text"
                                    placeholder='Teléfono'
                                    value={telefono}
                                    onChange={(e) => { setTelefono(e.target.value) }}
                                />
                            </div>
                            <div className='col-lg-12'>
                                <label className="form-label" htmlFor="password">
                                    Contraseña
                                </label>
                                <input
                                    className="form-control"
                                    id="password"
                                    type="password"
                                    placeholder='Contraseña'
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-6"></div>
                            <div className="col-6 d-flex justify-content-end">
                                <button className="btn btn-primary">
                                    {acciones == 1 ?
                                        (
                                            <>
                                                <i className="fas fa-plus"></i> Crear
                                            </>
                                        ) :
                                        (
                                            <>
                                                <i className="fas fa-pencil-alt"></i>  Editar
                                            </>
                                        )}
                                </button>
                            </div>
                        </div>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Usuarios