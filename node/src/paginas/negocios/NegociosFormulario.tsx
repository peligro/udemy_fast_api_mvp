import Menu from '../../componentes/Menu'
import Header from '../../componentes/Header'
import { Breadcrumb, Form } from 'react-bootstrap'
import Footer from '../../componentes/Footer'
import type { CategoriaInterface, EstadoInterface, NegociosInterface, UsuarioInterface } from '../../interfaces/Interfaces';
import { getDatos as getDatosEstados } from '../../servicios/EstadoService';
import { getDatos } from '../../servicios/CategoriasService';
import { getDatos as getDatosUsuarios } from '../../servicios/UsuariosService';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import type { AlertCustomInterface } from '../../custom/AlertCustom';
import AlertCustom from '../../custom/AlertCustom';
import { addData, getDatosPorId, setData } from '../../servicios/NegociosService';


export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const accion = url.searchParams.get('accion');
    const idParam = url.searchParams.get('id');
    const id = idParam ? parseInt(idParam) : 0;

    let negocio: NegociosInterface | null = null;

    if (accion !== "1") {
        const [negocioData] = await getDatosPorId(id);
        negocio = negocioData;
    }

    const [categorias, usuarios, estados] = await Promise.all([
        getDatos(),
        getDatosUsuarios(),
        getDatosEstados()
    ]);

    return {
        categorias,
        usuarios: usuarios[0], // Revisa si realmente quieres solo el primer usuario
        estados: estados[0],  // Revisa si realmente quieres solo el primer estado
        negocio,
        accion,
        id
    };
}
/*
export async function loader() {
    const categorias: CategoriaInterface[] = await getDatos();
    //desafío, crear API que liste sólo los usuarios activos
    const usuarios: UsuarioInterface[] = await getDatosUsuarios();
    //desafío, si hay más de 2 estados al 1 y 2, se debe crear otro endpoint en el backend
    const estados: EstadoInterface[] = await getDatosEstados();
    return [categorias, usuarios[0], estados[0]];
}
*/

const NegociosFormulario = () => {
    const { categorias, usuarios, estados, negocio, accion, id } = useLoaderData() as {
        categorias: CategoriaInterface[],
        usuarios: UsuarioInterface[],
        estados: EstadoInterface[],
        negocio: NegociosInterface | null,
        accion: string | null,
        id: string
    };
    //state de campos
    const [estado_id, setEstado_id] = useState(accion === "1" ? "0" : negocio?.estado_id?.toString() || "0");
    const [categoria_id, setCategoria_id] = useState(accion === "1" ? "0" : negocio?.categoria_id?.toString() || "0");
    const [usuario_id, setUsuario_id] = useState(accion === "1" ? "0" : negocio?.usuario_id?.toString() || "0");
    const [nombre, setNombre] = useState(accion === "1" ? "" : negocio?.nombre || "");
    const [correo, setCorreo] = useState(accion === "1" ? "" : negocio?.correo || "");
    const [telefono, setTelefono] = useState(accion === "1" ? "" : negocio?.telefono || "");
    const [direccion, setDireccion] = useState(accion === "1" ? "" : negocio?.direccion || "");
    const [facebook, setFacebook] = useState(accion === "1" ? "" : negocio?.facebook || "");
    const [instagram, setInstagram] = useState(accion === "1" ? "" : negocio?.instagram || "");
    const [twitter, setTwitter] = useState(accion === "1" ? "" : negocio?.twitter || "");
    const [tiktok, setTiktok] = useState(accion === "1" ? "" : negocio?.tiktok || "");
    const [mapa, setMapa] = useState(accion === "1" ? "" : negocio?.mapa || "");
    const [descripcion, setDescripcion] = useState(accion === "1" ? "" : negocio?.descripcion || "");
    /*
    const [estado_id, setEstado_id] = useState("0");
    const [categoria_id, setCategoria_id] = useState("0");
    const [usuario_id, setUsuario_id] = useState("0");
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [mapa, setMapa] = useState('');
    const [descripcion, setDescripcion] = useState('');
    */


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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (usuario_id == "0") {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "Debe seleccionar un usuario",
                headerBg: "bg-danger"
            });
            setNombre("");
            return false;
        }
        if (categoria_id == "0") {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "Debe seleccionar una categoría",
                headerBg: "bg-danger"
            });
            setNombre("");
            return false;
        }
        if (nombre.length == 0 && nombre == "") {

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
        if (telefono.length == 0 && telefono == "") {

            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El campo teléfono es obligatorio",
                headerBg: "bg-danger"
            });
            setTelefono("");
            return false;
        }
        if (direccion.length == 0 && direccion == "") {

            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El campo dirección es obligatorio",
                headerBg: "bg-danger"
            });
            setDireccion("");
            return false;
        }
        if (mapa.length == 0 && mapa == "") {

            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El campo mapa es obligatorio",
                headerBg: "bg-danger"
            });
            setMapa("");
            return false;
        }
        if (descripcion.length == 0 && descripcion == "") {

            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El campo descripción es obligatorio",
                headerBg: "bg-danger"
            });
            setDescripcion("");
            return false;
        }
        if (accion == "1") {
            if (await addData({ nombre: nombre, correo: correo, telefono: telefono, categoria_id: parseInt(categoria_id), usuario_id: parseInt(usuario_id), direccion: direccion, facebook: facebook, tiktok: tiktok, twitter: twitter, instagram: instagram, mapa: mapa, descripcion: descripcion }) == 201) {
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
        } else {
            if (await setData({ id: parseInt(id), estado_id: parseInt(estado_id), nombre: nombre, correo: correo, telefono: telefono, categoria_id: parseInt(categoria_id), usuario_id: parseInt(usuario_id), direccion: direccion, facebook: facebook, tiktok: tiktok, twitter: twitter, instagram: instagram, mapa: mapa, descripcion: descripcion }) == 200) {
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

    }
    /*
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    */
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
                                <Breadcrumb.Item href="/negocios/listar">Negocios</Breadcrumb.Item>
                                <Breadcrumb.Item active>{accion=="1" ? "Crear":`Editar: ${negocio?.nombre}`}</Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className="h3 mb-3">
                                {accion=="1" ? "Crear":`Editar: ${negocio?.nombre}`}
                            </h1>
                            <div className="row">

                                <div className="col-8 col-lg-8  d-flex">
                                    <div className="card flex-fill">
                                        <div className="card-body">

                                            <Form onSubmit={handleSubmit}>
                                                <div className="col-lg-12">
                                                    {accion == "2" && (
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
                                                        <label htmlFor="usuario_id">Usuarios <span className='campoObligatorio'>(*)</span></label>
                                                        <select id="usuario_id" value={usuario_id} onChange={(e) => setUsuario_id(e.target.value)} className="form-control">
                                                            <option value="0">Seleccione.....</option>
                                                            {usuarios
                                                                .filter(usuario => usuario.estado_id === 1)  // Filtra solo usuarios activos
                                                                .map(usuario => (
                                                                    <option key={usuario.id} value={usuario.id}>
                                                                        {usuario.nombre}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <label htmlFor="perfil_id">Categoría <span className='campoObligatorio'>(*)</span></label>
                                                        <select id="perfil_id" value={categoria_id} onChange={(e) => setCategoria_id(e.target.value)} className="form-control">
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
                                                            onChange={(e) => setNombre(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        <label className="form-label" htmlFor="correo">
                                                            Correo <span className='campoObligatorio'>(*)</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="correo"
                                                            type="text"
                                                            placeholder='Correo'
                                                            value={correo}
                                                            onChange={(e) => setCorreo(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        <label className="form-label" htmlFor="telefono">
                                                            Teléfono <span className='campoObligatorio'>(*)</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="telefono"
                                                            type="text"
                                                            placeholder='Teléfono'
                                                            value={telefono}
                                                            onChange={(e) => setTelefono(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        <label className="form-label" htmlFor="direccion">
                                                            Dirección <span className='campoObligatorio'>(*)</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="direccion"
                                                            type="text"
                                                            placeholder='Dirección'
                                                            value={direccion}
                                                            onChange={(e) => setDireccion(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        <label className="form-label" htmlFor="facebook">
                                                            Facebook
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="facebook"
                                                            type="text"
                                                            placeholder='Facebook'
                                                            value={facebook}
                                                            onChange={(e) => setFacebook(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        <label className="form-label" htmlFor="instagram">
                                                            Instagram
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="instagram"
                                                            type="text"
                                                            placeholder='Instagram'
                                                            value={instagram}
                                                            onChange={(e) => setInstagram(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        <label className="form-label" htmlFor="tiktok">
                                                            Tiktok
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="tiktok"
                                                            type="text"
                                                            placeholder='Tiktok'
                                                            value={tiktok}
                                                            onChange={(e) => setTiktok(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        <label className="form-label" htmlFor="twitter">
                                                            Twiiter
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="twitter"
                                                            type="text"
                                                            placeholder='Twitter'
                                                            value={twitter}
                                                            onChange={(e) => setTwitter(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        <label className="form-label" htmlFor="mapa">
                                                            Mapa <span className='campoObligatorio'>(*)</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="mapa"
                                                            type="text"
                                                            placeholder='Mapa'
                                                            value={mapa}
                                                            onChange={(e) => setMapa(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        <label className="form-label" htmlFor="descripcion">
                                                            Descripción <span className='campoObligatorio'>(*)</span>
                                                        </label>
                                                        <textarea
                                                            id="descripcion"
                                                            placeholder='Descripción'
                                                            value={descripcion}
                                                            onChange={(e) => setDescripcion(e.target.value)}
                                                            className="form-control">
                                                        </textarea>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-6"></div>
                                                    <div className="col-6 d-flex justify-content-end">
                                                        <button className="btn btn-primary">
                                                            {accion == "1" ?
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
                                            {/* //formulario */}

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default NegociosFormulario
/*
<div className="wrapper">
                <Menu />
                <div className="main">
                    <Header />
                    <main className="content">
                        <div className="container-fluid p-0">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="/negocios/listar">Negocios</Breadcrumb.Item>
                                <Breadcrumb.Item active>Crear</Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className="h3 mb-3">
                                Negocios
                            </h1>
                            <div className="row">

                                <div className="col-12 col-lg-12  d-flex">
                                    <div className="card flex-fill">
                                        <div className="card-body">
                                           
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
*/