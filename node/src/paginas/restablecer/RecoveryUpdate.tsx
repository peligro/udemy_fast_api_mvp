
import { Form } from 'react-bootstrap'
import Footer from '../../componentes/Footer'
import { useState } from 'react';
import type { AlertCustomInterface } from '../../custom/AlertCustom';
import { Link, useParams } from 'react-router-dom';
import AlertCustom from '../../custom/AlertCustom';
import { sendDataRecovery } from '../../servicios/RestablecerTokenService';

const RecoveryUpdate = () => {
    const {token} = useParams();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    let [boton, setBoton] = useState("block");
    let [preloader, setPreloader] = useState("none");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
         if (!token) {
        setAlertData({
            estado: true,
            titulo: "Error",
            detalle: "Token no válido",
            headerBg: "bg-danger"
        });
        return;
    }

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
        if (password2.length == 0 && password2 == "") {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "El campo repetir contraseña es obligatorio",
                headerBg: "bg-danger"
            });
            setPassword2("");
            return false;
        }
        if (password!=password2) {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "Las contraseñas ingresadas no coinciden",
                headerBg: "bg-danger"
            });
            setPassword("");
            setPassword2("");
            return false;
        }

        setBoton("none");
        setPreloader("block");
        //console.log(`Todo ok | correo=${correo} | password=${password}`);
      
        if (await sendDataRecovery({ token: token, password: password }) == 200) {
            setAlertData({
                estado: true,
                titulo: "Excelente !!!",
                detalle: "Se creó el registro exitosamente",
                headerBg: "bg-success"
            });

        } else {
            setAlertData({
                estado: true,
                titulo: "Alerta !!!",
                detalle: "Se produjo un error inesperado",
                headerBg: "bg-danger"
            });
        }
        setInterval(() => {
            window.location.href = "/login";
        }, 2000);
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


                <div className="main">

                    <main className="content">
                        <div className="container-fluid p-0">
                            <h1 className="h3 mb-3">
                                Restablecer contraseña
                            </h1>

                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-8">
                                    <Form
                                        id="form"
                                        noValidate
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="mb-3">
                                            <label className="form-label">Contraseña</label>
                                            <input type="password" id="password" placeholder="Contraseña:" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />

                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Repetir Contraseña</label>
                                            <input type="password" id="password2" placeholder="Repetir Contraseña:" className="form-control" value={password2} onChange={(e) => setPassword2(e.target.value)} />

                                        </div>

                                        <div className="text-center mt-3">
                                            <div className="col-12 text-center" style={{ display: boton }}>
                                                <button type="submit" className="btn btn-lg btn-primary" title="Entrar" id="boton"> <i className="fas fa-lock-open"></i> Entrar</button>
                                            </div>
                                            <div className="col-12 text-center" style={{ display: preloader }}>
                                                <img src="/img/load.gif" alt="" />
                                            </div>

                                            <hr />
                                            <Link to="/login">Volver al login</Link>
                                        </div>
                                    </Form>
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

export default RecoveryUpdate