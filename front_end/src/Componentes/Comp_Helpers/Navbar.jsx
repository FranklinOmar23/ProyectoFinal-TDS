import React, { useState } from "react";
import { IconoHistorial, IconoHome, IconoMultas, IconoXD, Icono, IconoTop } from "./Iconos.jsx";
import "../../Css/adicciones.css";

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
      <nav className={`navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark ${sidebarOpen ? 'toggled' : ''}`} style={{ background: 'rgb(4, 131, 55)', width: sidebarOpen ? '300px' : '80px', transition: 'width 0.3s ease' }}>
      <div className="container-fluid d-flex flex-column p-0">
          <div className="m-4 d-flex justify-content-center">
              <a className="navbar-brand" href="#">
                  <img className="img-fluid" width="150" height="150" src="https://nizaero.com/wp-content/uploads/2018/07/Logo-DIGESETT-292x300.png" alt="Logo" />
              </a>
          </div>
          <hr className="sidebar-divider my-0" />
          <ul className="navbar-nav text-light justify-content-center" id="accordionSidebar">
              <li className="nav-item"><a className="nav-link active" href="/home"></a></li>
              <hr className="sidebar-divider" />
              <div className="sidebar-heading">
                  <p className="mb-0">Menú</p>
              </div>

              {/* Icono del inicio/home */}
              <li className="nav-item"><a className="btn btn-primary nav-link btn-lg" role="button" href="/home-agente" data-bs-target="index.html" style={{ background: 'transparent' }}><IconoHome width={20} height={20} /><i className="fas fa-th-large"></i><span id="spanInicio">Inicio</span></a></li>
              {/* Icono del perfil */}
              <li className="nav-item"><a className="btn btn-primary nav-link " role="button" href="/perfil" data-bs-target="perfil.html" style={{ background: 'transparent' }}><IconoXD width={20} height={20} /><i className="fas fa-user-circle"></i><span id="spanPerfil">Perfil</span></a></li>
              {/* Icono de multa */}
              <li className="nav-item"><a className="btn btn-primary nav-link btn-lg" role="button" href="/nuevamulta" data-bs-target="nuevaMulta.html" style={{ background: 'transparent' }}><IconoMultas width={20} height={20} /><i className="fas fa-folder"></i><span id="spanMultas">Nuevas Multas</span></a></li>
              {/* Icono del historial */}
              <li className="nav-item"><a className="btn btn-primary nav-link btn-lg" role="button" href="/historial" data-bs-target="historial.html" style={{ background: 'transparent' }}><IconoHistorial width={20} height={20} /><i className="fas fa-chart-area"></i><span id="spanHistorial">&nbsp;Historial</span></a></li>

              <hr className="sidebar-divider" />
          </ul>
          <div className="text-center d-none d-md-inline">
                <button className="btn rounded-circle border-0" id="sidebarToggle" type="button" onClick={toggleSidebar}>
                        <Icono className="cerrar-menu" width={40} height={40} />
                </button>
          </div>
      </div>
  </nav>
    );
}

export default Navbar;