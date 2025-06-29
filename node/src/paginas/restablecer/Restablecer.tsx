
import { Form } from 'react-bootstrap'
import Footer from '../../componentes/Footer'
import { useState } from 'react';
import type { AlertCustomInterface } from '../../custom/AlertCustom';
import { Link } from 'react-router-dom';
import AlertCustom from '../../custom/AlertCustom';
import { sendData } from '../../servicios/RestablecerTokenService';

const Restablecer = () => {
    const [correo, setCorreo] = useState("");
    let [boton, setBoton] = useState("block");
    let [preloader, setPreloader] = useState("none");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


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

        setBoton("none");
        setPreloader("block");
        //console.log(`Todo ok | correo=${correo} | password=${password}`);
        if (await sendData({ correo: correo }) == 200) {
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
            window.location.href = location.href
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
                                            <label className="form-label">E-Mail</label>
                                            <input type="text" id="correo" placeholder="E-Mail:" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
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

export default Restablecer