import { Breadcrumb, Form, Modal } from "react-bootstrap";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import Menu from "../../componentes/Menu";
import { getDatos, getDatosPorId, deleteData, setLogo } from "../../servicios/NegociosService";
import type { NegociosInterface } from "../../interfaces/Interfaces";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link, useLoaderData } from "react-router-dom";
import ImagenCustom from "../../custom/ImagenCustom";
import AlertCustom, { type AlertCustomInterface } from "../../custom/AlertCustom";

export async function loader() {
    const datos: NegociosInterface[] = await getDatos();
    return [datos[0]];

}

const Negocios = () => {
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
    let [datos] = useLoaderData() as [NegociosInterface[]];


    //state para detalle negocio
    const [negocioDetalle, setNegocioDetalle] = useState<NegociosInterface | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    //ventana modal logo
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => {
        setShow2(false);
    }
    const handleShowLogo = async (data: NegociosInterface) => {
        setNegocioDetalle(data);
        setShow2(true);
    }
    const handleSubmitLogo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    // Validar tamaño del archivo (opcional)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (fileInput.size > maxSize) {
        setAlertData({
            estado: true,
            titulo: "Alerta !!!",
            detalle: "El archivo es demasiado grande (máximo 5MB)",
            headerBg: "bg-danger"
        });
        return;
    }

    try {
         
        
        // Llamar al servicio para subir el logo
        const response = await setLogo(negocioDetalle?.id || 0, fileInput);
        
        // Éxito
        setAlertData({
            estado: true,
            titulo: "Éxito !!!",
            detalle: "Logo subido correctamente",
            headerBg: "bg-success"
        });

        // Cerrar el modal después de 2 segundos
        setTimeout(() => {
            setShow2(false);
            window.location.reload(); // Recargar para ver los cambios
        }, 2000);

    } catch (error) {
        console.error('Error al subir logo:', error);
        setAlertData({
            estado: true,
            titulo: "Error !!!",
            detalle: error instanceof Error ? error.message : "Ocurrió un error al subir el logo",
            headerBg: "bg-danger"
        });
    } finally {
        setLoading(false);
    }
};
    //ventana modal AJAX
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = async (id: number) => {
        try {
            setLoading(true);
            setError(null);

            const [data, status] = await getDatosPorId(id);

            if (status === 200) {
                setNegocioDetalle(data);
                setShow(true);
            } else {
                setError('No se pudo cargar la información del negocio');
            }
        } catch (err) {
            setError('Ocurrió un error al cargar los datos');
            console.error('Error al cargar negocio:', err);
        } finally {
            setLoading(false);
        }
    };
    /*
    const handleShow=(id:number)=>
    {
        console.log(`id=${id}`)
        setShow(true);
    }
    */
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
                                <Breadcrumb.Item active>Negocios</Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className="h3 mb-3">
                                Negocios
                            </h1>

                            <div className="row">

                                <div className="col-12 col-lg-12  d-flex">
                                    <div className="card flex-fill">
                                        <div className="card-header">
                                            <Link to="/negocios/formulario?accion=1&id=0" className="btn btn-outline-primary float-end" title="Crear" >
                                                <i className="fas fa-check"></i> Crear
                                            </Link>
                                            <h5 className="card-title mb-0"> </h5>
                                        </div>

                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-striped table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Estado</th>
                                                            <th>Usuario</th>
                                                            <th>Categoría</th>
                                                            <th>Nombre</th>
                                                            <th>Logo</th>
                                                            <th>Detalle</th>
                                                            <th>Fecha</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {datos.map((dato: NegociosInterface) =>
                                                        (
                                                            <tr key={dato.id}>
                                                                <td>{dato.id}</td>
                                                                <td>
                                                                    <div className={`text-${dato.estado_id == 1 ? 'primary' : 'danger'} `} style={{ fontWeight: "bold" }}>
                                                                        {dato.estado}
                                                                    </div>
                                                                </td>
                                                                <td>{dato.usuario}</td>
                                                                <td>{dato.categoria}</td>
                                                                <td>{dato.nombre}</td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <ImagenCustom
                                                                        imagenUrl={`${dato.logo}`}
                                                                        titulo={`Logo ${dato.nombre}`}
                                                                    >
                                                                        <i className="fas fa-image" style={{ color: "#2f64b1" }} title={`Logo ${dato.nombre}`}></i>
                                                                    </ImagenCustom>

                                                                </td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <Link to="#" title={`Detalle ${dato.nombre}`} onClick={() => dato.id && handleShow(dato.id)}>
                                                                        <i className="fas fa-search"></i>
                                                                    </Link>

                                                                </td>
                                                                <td>{dato.fecha}</td>
                                                                <td className="text-center">

                                                                    <Link to="#" title={`Editar logo ${dato.nombre}`} onClick={() => { handleShowLogo(dato) }}>
                                                                        <i className="fas fa-upload"></i>
                                                                    </Link>
                                                                    &nbsp;&nbsp;
                                                                    <Link to={`/negocios/formulario?accion=2&id=${dato.id}`} title="Editar">
                                                                        <i className="fas fa-edit"></i>
                                                                    </Link>
                                                                    &nbsp;&nbsp;
                                                                    <Link onClick={() => { dato.id && handleEliminar(dato.id) }} to="#" title="Eliminar"><i className="fas fa-trash"></i></Link>
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
            {/*modal ajax */}
            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {negocioDetalle ? `Detalle: ${negocioDetalle.nombre}` : 'Cargando...'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : negocioDetalle ? (
                        <div className="card mb-3">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>{negocioDetalle.nombre}</td>
                                    </tr>
                                    <tr>
                                        <td>Categoría</td>
                                        <td>{negocioDetalle.categoria}</td>
                                    </tr>
                                    <tr>
                                        <td>Correo</td>
                                        <td>{negocioDetalle.correo}</td>
                                    </tr>
                                    <tr>
                                        <td>Teléfono</td>
                                        <td>{negocioDetalle.telefono}</td>
                                    </tr>
                                    <tr>
                                        <td>Dirección</td>
                                        <td>{negocioDetalle.direccion}</td>
                                    </tr>
                                    <tr>
                                        <td>Facebook</td>
                                        <td><a href={negocioDetalle.facebook} target="_blank">{negocioDetalle.facebook}</a></td>
                                    </tr>
                                    <tr>
                                        <td>Intagram</td>
                                        <td><a href={negocioDetalle.instagram} target="_blank">{negocioDetalle.instagram}</a></td>
                                    </tr>
                                    <tr>
                                        <td>Tiktok</td>
                                        <td><a href={negocioDetalle.tiktok} target="_blank">{negocioDetalle.tiktok}</a></td>
                                    </tr>
                                    <tr>
                                        <td>Twitter</td>
                                        <td><a href={negocioDetalle.twitter} target="_blank">{negocioDetalle.twitter}</a></td>
                                    </tr>
                                    <tr>
                                        <td>Descripción</td>
                                        <td>{negocioDetalle.descripcion}</td>
                                    </tr>
                                    <tr>
                                        <td>Mapa</td>
                                        <td>
                                            <iframe src={negocioDetalle.mapa} width='600' height='300' style={{ border: "0" }} loading='lazy' referrerPolicy='no-referrer-when-downgrade'></iframe>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                </Modal.Body>
            </Modal>
            {/*
             <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Título</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    detalle
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button variant="primary">Alguna acción</Button>
                </Modal.Footer>
            </Modal>
            */}

            {/*//modal ajax */}
            {/*modal logo */}
            <Modal show={show2} size="lg" onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Subir logo a negocio: <strong>{negocioDetalle?.nombre}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-8">
                            <Form onSubmit={handleSubmitLogo}>
                                <div className="form-group">
                                    <label htmlFor="foto">Foto</label>
                                    <input type="file" id="foto" name="foto" className="form-control" />
                                </div>
                                <hr />
                                <button className='btn btn-primary'>
                                    <i className="fas fa-upload"></i> Subir
                                </button>
                            </Form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/*modal logo */}
        </>
    )
}

export default Negocios
{/*
    <div className="wrapper">
                <Menu />

                <div className="main">
                    <Header />
                    <main className="content">
                        <div className="container-fluid p-0">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item active>Negocios</Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className="h3 mb-3">
                                Negocios
                            </h1>

                            <div className="row">

 <div className="col-12 col-lg-12  d-flex">
                                    <div className="card flex-fill">
                                        <div className="card-header">
                                            <a className="btn btn-outline-primary float-end" title="Crear" >
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
                                                <th>Estado</th>
                                                <th>Categoría</th>
                                                <th>Nombre</th>
                                                <th>Logo</th>
                                                <th>Detalle</th> 
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          
                                           
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
    */}