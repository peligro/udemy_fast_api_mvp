import { useContext, useEffect, useState } from 'react'
import dayjs from "dayjs";//npm i dayjs
import "dayjs/locale/es";
import { getDatosPorId } from '../servicios/UsuariosService';
import type { UsuarioInterface } from '../interfaces/Interfaces';
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';
const Header = () => {
    const [valorMenu, setvalorMenu] = useState('Ocultar');
    const [iconoMenu, setIconoMenu] = useState('fa-long-arrow-alt-left');
    let setMenu = () => {
        var e = document.getElementsByClassName("js-sidebar")[0];
        e.classList.toggle("collapsed"), e.addEventListener("transitionend", (function () {
            window.dispatchEvent(new Event("resize"));
            if (valorMenu == 'Mostrar') {
                setvalorMenu('Ocultar');
                setIconoMenu('fa-long-arrow-alt-left');
            } else {
                setvalorMenu('Mostrar');
                setIconoMenu('fa-long-arrow-alt-right');
            }
        }));
    };
    const genFechaActual = () => {
        dayjs.locale('es');
        let fecha = new Date();
        let day = dayjs(fecha).format("dddd");
        // Capitalizar la primera letra del día de la semana
        day = day.charAt(0).toUpperCase() + day.slice(1);
        let date = day + " " + dayjs(fecha).format("DD") + " de " + dayjs(fecha).format("MMMM") + " de " + dayjs(fecha).format("YYYY");
        return date;
    };
    let [time, changeTime] = useState(new Date().toLocaleTimeString());
    useEffect(function () {
        setInterval(() => {
            changeTime(new Date().toLocaleTimeString());
        }, 1000);
    }, []);

    const [userData, setUserData] = useState<UsuarioInterface>();

    useEffect(() => {
        const fetchUserData = async () => {
            const id = localStorage.getItem('menu_flaites_id');
            if (id) {
                const [data, status] = await getDatosPorId(Number(id));
                if (status === 200) {
                    setUserData(data);
                    localStorage.setItem('menu_flaites_perfil_id', `${data.perfil_id}`);
                }
            }
        };

        fetchUserData();
    }, []);
    const context = useContext(AuthContext);
    if (!context) {
        return (
            <div>Error: No se pudo cargar el contexto de autenticación.</div>
        );
    }
    const { handleCerrarSesion } = context;
    return (
        <>
            <nav className="navbar navbar-expand navbar-light navbar-bg">
                <a className="sidebar-toggle js-sidebar-toggle" onClick={() => { setMenu() }} title={valorMenu}>
                    <i className={`fas ${iconoMenu} align-self-center`}></i>
                </a>

                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav navbar-align">
                        <li className="nav-item dropdown">
                            <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
                                <i className="fas fa-long-arrow-alt-down align-middle"></i>
                            </a>
                            <a className="nav-link d-none d-sm-inline-block">
                                {genFechaActual()}
                            </a>
                            <a className="nav-link d-none d-sm-inline-block">
                                <span className="text-dark">|</span>
                            </a>
                            <a className="nav-link d-none d-sm-inline-block">
                                {time}
                            </a>
                            <a className="nav-link d-none d-sm-inline-block">
                                <span className="text-dark">|</span>
                            </a>
                            <a className="nav-link d-none d-sm-inline-block">
                                {userData?.perfil}
                            </a>
                            <a className="nav-link d-none d-sm-inline-block">
                                <span className="text-dark">|</span>
                            </a>
                            <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
                                <span className="text-dark">
                                    {userData?.nombre}
                                </span>
                                <img src="/img/perfil.png"
                                    className="avatar img-fluid rounded me-1" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
 
                                <Link className="dropdown-item" title="Cerrar sesión" to="#" onClick={()=>{handleCerrarSesion()}}>
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Cerrar sesión</Link>
                            </div>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    )
}

export default Header
{/* 
<nav className="navbar navbar-expand navbar-light navbar-bg">
    <a className="sidebar-toggle js-sidebar-toggle" onClick={()=>{setMenu()}} title={valorMenu}>
    <i className="fas fa-long-arrow-alt-left"></i>
</a>

    <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
            <li className="nav-item dropdown">
                <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
                    <i className="fas fa-long-arrow-alt-down align-middle"></i>
                </a>
                <a className="nav-link d-none d-sm-inline-block">
                    fecha
                </a>
                <a className="nav-link d-none d-sm-inline-block">
                    <span className="text-dark">|</span>
                </a>
                <a className="nav-link d-none d-sm-inline-block">
                    reloj
                </a>
                <a className="nav-link d-none d-sm-inline-block">
                    <span className="text-dark">|</span>
                </a>
                <a className="nav-link d-none d-sm-inline-block">
                    perfil
                </a>
                <a className="nav-link d-none d-sm-inline-block">
                    <span className="text-dark">|</span>
                </a>
                <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
                    <span className="text-dark">
                       nombre
                    </span>
                    <img src="/img/perfil.png"
                    className="avatar img-fluid rounded me-1" />
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                
                    <a className="dropdown-item" title="Cerrar sesión" >
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Mi perfil</a>
                        <hr/>
                    <a className="dropdown-item" title="Cerrar sesión" >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Cerrar sesión</a>
                </div>
            </li>
        </ul>
        
    </div>
</nav>*/}