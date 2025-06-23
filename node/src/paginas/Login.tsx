import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { sendDataLogin } from "../servicios/LoginService";
import AuthContext from "../context/AuthProvider";

const Login = () => {
    const context = useContext(AuthContext);
    if (!context) {
        return (
            <div>Error: No se pudo cargar el contexto de autenticación.</div>
        );
    }
    const { handleIniciarSesion } = context;

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    let [boton, setBoton] = useState("block");
    let [preloader, setPreloader] = useState("none");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (correo.length == 0 && correo == "") {
            alert("El campo E-Mail es obligatorio");
            setCorreo("");
            return false;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(correo)) {
            alert("El E-Mail ingresado no es válido");
            setCorreo("");
            return false;
        }
        if (password.length == 0 && password == "") {
            alert("El campo Contraseña es obligatorio");
            setPassword("");
            return false;
        }
        setBoton("none");
        setPreloader("block");
        //console.log(`Todo ok | correo=${correo} | password=${password}`);
        const peticion= await sendDataLogin({correo:correo, password:password});
        if(peticion[1]==200)
        {
            //console.log(`Todo ok | id=${peticion[0].data.id} | nombre=${peticion[0].data.nombre} | token=${peticion[0].data.token}`);
            handleIniciarSesion(peticion[0].data.id, peticion[0].data.nombre, peticion[0].data.token);
            window.location.href="/";
        }else
        {
            alert("Ocurrió un error inesperado");
            window.location.href="/login";
        }
    };
    return (
        <>
            <main className="d-flex w-100">
                <div className="container d-flex flex-column">
                    <div className="row vh-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">

                                <div className="text-center mt-4">
                                    <h1 className="h2">{import.meta.env.VITE_API_TITULO}</h1>
                                    <p className="lead">
                                        Desarrollado con FastAPI de Python y React 19
                                    </p>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="m-sm-4">
                                            <div className="text-center">
                                                <img src="/img/logo.svg" alt={`${import.meta.env.VITE_API_TITULO}`} className="img-fluid rounded-circle" width="132" height="132" />
                                            </div>
                                            <Form
                                                id="form"
                                                noValidate
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="mb-3">
                                                    <label className="form-label">E-Mail</label>
                                                    <input type="text" id="correo" placeholder="E-Mail:" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Contraseña</label>
                                                    <input type="password" id="password" placeholder="Contraseña:" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />

                                                </div>

                                                <div className="text-center mt-3">
                                                    <div className="col-12 text-center" style={{ display: boton }}>
                                                        <button type="submit" className="btn btn-lg btn-primary" title="Entrar" id="boton"> <i className="fas fa-lock-open"></i> Entrar</button>
                                                    </div>
                                                    <div className="col-12 text-center" style={{ display: preloader }}>
                                                        <img src="/img/load.gif" alt="" />
                                                    </div>


                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login