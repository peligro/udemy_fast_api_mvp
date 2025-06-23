import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <nav id="sidebar" className="sidebar js-sidebar ">
        <div className="sidebar-content js-simplebar">
          <Link className="sidebar-brand" to="/">
            <span className="align-middle">
              <img src="/img/loguito.png" style={{ width: "150px" }} />
            </span>
          </Link>

          <ul className="sidebar-nav">
            <li className="sidebar-header">Administración</li>
            <li className="sidebar-item active">
              <Link className="sidebar-link" to="/modulos" title="Módulos">
                <i className="align-middle fas fa-list-ol"></i>
                <span className="align-middle">Módulos</span>
              </Link>
            </li>
            <li className="sidebar-item ">
              <Link className="sidebar-link" to="/perfiles" title="Perfiles">
                <i className="align-middle fas fa-list"></i>
                <span className="align-middle">Perfiles</span>
              </Link>
            </li>
            <li className="sidebar-item ">
              <Link className="sidebar-link" to="/usuarios" title="Usuarios">
              <i className="align-middle fas fa-lock"></i>
                <span className="align-middle">Usuarios</span>
              </Link>
            </li>
            <li className="sidebar-header">Clientes</li>

            <li className="sidebar-item ">
              <Link className="sidebar-link" to="/cuentas" title="Cuentas">
                <i className="align-middle  far fa-list-alt"></i>
                <span className="align-middle">Cuentas</span>
              </Link>
            </li>
            <li className="sidebar-item ">
              <Link className="sidebar-link" to="/clientes" title="Clientes">
              <i className="align-middle fas fa-users"></i>
                <span className="align-middle">Clientes</span>
              </Link>
            </li>
            <li className="sidebar-header">Cobranza</li>

            <li className="sidebar-item ">
              <Link className="sidebar-link" to="/cobranzas" title="Cobranza">
              <i className=" align-middle fas fa-hand-holding-usd"></i>
                <span className="align-middle">Cobranza</span>
              </Link>
            </li>
            <li className="sidebar-item ">
              <Link className="sidebar-link" to="/mail-masivo" title="Mail masivo">
              <i className="align-middle fas fa-mail-bulk"></i>
                <span className="align-middle">Mail masivo</span>
              </Link>
            </li>
            <li className="sidebar-header">Reportes</li>

            <li className="sidebar-item ">
            <Link className="sidebar-link" to="/reportes" title="Reporte mensual">
            <i className="align-middle fas fa-file-excel"></i>
                <span className="align-middle">Reporte mensual</span>
            </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Menu;
