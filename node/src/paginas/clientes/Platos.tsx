import { Breadcrumb, Form, Modal } from "react-bootstrap";
import Footer from "../../componentes/Footer";
import type { NegociosInterface, PlatosCategoriaInterface, PlatosInterface } from "../../interfaces/Interfaces";

import Header from "../../componentes/Header";
import Menu from "../../componentes/Menu";
import { Link, useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { getDatos } from "../../servicios/PlatosCategoriasService";
import { getDatosPorNegocio, getNegocioPorUsuario, addData, deleteData } from "../../servicios/PlatosService";
import type { AlertCustomInterface } from "../../custom/AlertCustom";
import AlertCustom from "../../custom/AlertCustom";


export async function loader() {
    const usuario_id = Number(localStorage.getItem("menu_flaites_id"));
    // Verifica si la conversión fue exitosa y el valor no es NaN
    if (isNaN(usuario_id)) {
        throw new Error("usuario_id válido");
    }
    const negocio: NegociosInterface = await getNegocioPorUsuario(usuario_id);

    if (typeof negocio.id !== 'number' || isNaN(negocio.id)) {
        throw new Error("negocio.id no es un número válido");
    }

    const datos: PlatosInterface[] = await getDatosPorNegocio(negocio.id);
    const categorias: PlatosCategoriaInterface[] = await getDatos();
    return [negocio, datos, categorias];
}


const Platos = () => {
    const context = useContext(AuthContext);
    if (!context) {
        return (
            <div>Error: No se pudo cargar el contexto de autenticación.</div>
        );
    }
    const { handleValidarAcceso, showConfirm, setConfirmData } = context;
    useEffect(() => {

        handleValidarAcceso(`2`);
    },);
    let [negocio, datos, categorias] = useLoaderData() as [NegociosInterface, PlatosInterface[], PlatosCategoriaInterface[]];
    const handleCrear = () => {
        setAcciones(1);
        setNombre('');
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
    //formulario
    const [platoscategoria_id, setplatoscategoria_id] = useState('0');
    const [nombre, setNombre] = useState('');
    const [ingredientes, setingredientes] = useState('');
    const [precio, setprecio] = useState('');
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (platoscategoria_id == "0") {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "Debe seleccionar una categoría",
                headerBg: "bg-danger"
            });
            setplatoscategoria_id("");
            return false;
        }
        if (nombre.length==0 || nombre == "") {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El campo nombre es obligatorio",
                headerBg: "bg-danger"
            });
            setNombre("");
            return false;
        }
        if (precio.length==0 || precio == "") {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El campo precio es obligatorio",
                headerBg: "bg-danger"
            });
            setprecio("");
            return false;
        }
        if (ingredientes.length==0 || ingredientes == "") {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El campo ingredientes es obligatorio",
                headerBg: "bg-danger"
            });
            setingredientes("");
            return false;
        }
        // Acceder al input file
        const formData = new FormData(event.currentTarget);
        const fileInput = formData.get('foto') as File;

        // Verificar si se seleccionó un archivo
        if (!fileInput || fileInput.size === 0) {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "Debes seleccionar un archivo",
                headerBg: "bg-danger"
            });
            return;
        }

        // Validar el tipo de archivo (opcional)
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(fileInput.type)) {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "Solo se permiten imágenes (JPEG, PNG, GIF)",
                headerBg: "bg-danger"
            });
            return;
        }
         if (acciones == 1) {
                    if (await addData(parseInt(platoscategoria_id), negocio.id ? negocio.id:1, nombre, ingredientes, parseInt(precio), fileInput) == 201) {
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
    }
    //ventana modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [acciones, setAcciones] = useState(1);
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
                headerBg={alertData.headerBg}
            />
            <div className="wrapper">
                <Menu />
                <div className="main">
                    <Header />
                    <main className="content">
                        <div className="container-fluid p-0">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item active>Mi negocio: <strong>{negocio.nombre}</strong></Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className="h3 mb-3">
                                Mi negocio: <strong>{negocio.nombre}</strong>
                            </h1>
                            <p>Ir a mi negocio <a href={`/carta/${negocio.slug}`} target="_blank"><i className="fas fa-external-link-square-alt"></i></a></p>
                            <div className="row">
                                <div className="col-12 col-lg-12  d-flex">
                                    <div className="card flex-fill">
                                        <div className="card-header">
                                            <a className="btn btn-outline-primary float-end" title="Crear" onClick={handleCrear}>
                                                <i className="fas fa-check"></i> Crear
                                            </a>
                                            <h5 className="card-title mb-0"> </h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-striped table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Platos categoría</th>
                                                            <th>Nombre</th>
                                                            <th>Ingredientes</th>
                                                            <th>Precio</th>
                                                            <th>Foto</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {datos.map((dato: PlatosInterface) =>
                                                        (
                                                            <tr key={dato.id}>
                                                                <td>{dato.platoscategoria}</td>
                                                                <td>{dato.nombre}</td>
                                                                <td>{dato.ingredientes}</td>
                                                                <td>{dato.precio}</td>
                                                                <td>
                                                                    <img src={dato.foto} alt="" width="200" height="200" />
                                                                </td>
                                                                <td className="text-center">

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
                            <div className="col-lg-12">
                                <label htmlFor="perfil_id">Platos Categoría <span className='campoObligatorio'>(*)</span></label>
                                <select id="perfil_id" value={platoscategoria_id} onChange={(e) => setplatoscategoria_id(e.target.value)} className="form-control">
                                    <option value="0">Seleccione.....</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-lg-12'>
                                <label className="form-label" htmlFor="nombre">
                                    Nombre <span className='campoObligatorio'>(*)</span>
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
                                <label className="form-label" htmlFor="precio">
                                    Precio <span className='campoObligatorio'>(*)</span>
                                </label>
                                <input
                                    className="form-control"
                                    id="precio"
                                    type="text"
                                    placeholder='Precio'
                                    value={precio}
                                    onChange={(e) => { setprecio(e.target.value) }}
                                />
                            </div>
                            <div className='col-lg-12'>
                                <label className="form-label" htmlFor="ingredientes">
                                    Ingredientes <span className='campoObligatorio'>(*)</span>
                                </label>
                                <textarea
                                    id="ingredientes"
                                    value={ingredientes}
                                    onChange={(e) => { setingredientes(e.target.value) }}
                                    className="form-control"></textarea>
                            </div>
                            <div className='col-lg-12'>
                                <label className="form-label" htmlFor="foto">
                                    Foto <span className='campoObligatorio'>(*)</span>
                                </label>
                                <input
                                    className="form-control"
                                    id="foto"
                                    type="file"
                                    name="foto"
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

export default Platos