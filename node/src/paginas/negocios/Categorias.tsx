import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import type { CategoriaInterface } from "../../interfaces/Interfaces";
import { Link, useLoaderData } from "react-router-dom";
import { addData, getDatos, setData, deleteData } from "../../servicios/CategoriasService";
import Footer from "../../componentes/Footer";
import { Breadcrumb, Form, Modal } from "react-bootstrap";
import Header from "../../componentes/Header";
import Menu from "../../componentes/Menu";
import AlertCustom, { type AlertCustomInterface } from "../../custom/AlertCustom";

export async function loader() {
    const datos: CategoriaInterface[] = await getDatos();
    return [datos];
}

const Categorias = () => {
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
    let [datos] = useLoaderData() as [CategoriaInterface[]];
    //ventana modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [acciones, setAcciones] = useState(1);
    const [accionesId, setAccionesId] = useState<number | undefined>();
    //formulario
    const [nombre, setNombre] = useState('');

    const handleCrear = () => {
        setAcciones(1);
        setNombre('');
        handleShow();
    };
    const handleEditar = (modulo: CategoriaInterface) => {
    
            setAcciones(2);
            setAccionesId(modulo.id);
            setNombre(modulo.nombre);
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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
        if (acciones == 1) {

            if (await addData({ nombre: nombre }) == 201) {
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
        if (await setData({ id: accionesId, nombre: nombre }) == 200) {
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
                                <Breadcrumb.Item active>Categorías</Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className="h3 mb-3">
                                Categorías
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
                                                            <th>Nombre</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {datos.map((dato: CategoriaInterface) =>
                                                        (
                                                            <tr key={dato.id}>
                                                                <td>{dato.id}</td>
                                                                <td>{dato.nombre}</td>
                                                                <td className="text-center">

                                                                    <Link to="#" onClick={() => { handleEditar(dato)}} title="Editar">
                                                                        <i className="fas fa-edit"></i>
                                                                    </Link>
                                                                    &nbsp;&nbsp;
                                                                    <Link onClick={() => { dato.id && handleEliminar(dato.id)}} to="#" title="Eliminar"><i className="fas fa-trash"></i></Link>
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

export default Categorias