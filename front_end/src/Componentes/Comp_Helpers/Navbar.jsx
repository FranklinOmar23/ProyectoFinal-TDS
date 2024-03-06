import React, { useState } from "react";
import { IconoHistorial, IconoHome, IconoMultas, IconoXD, Icono } from "./Iconos.jsx";
import "../../Css/Navestilo.css";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
      setIsOpen(!isOpen);
  };

  const handleLinkClick = (e) => {
      const listItems = document.querySelectorAll('.MenuList li');
      listItems.forEach(item => item.classList.remove('active'));
      e.target.parentNode.parentNode.classList.add('active');
  };

  return (
      <div>
          <div className={`menuTogle ${isOpen ? "active" : ""}`} onClick={toggleSidebar}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
          </div>
          <nav className={`sidebar ${isOpen ? "active" : ""}`}>
              <ul>
                  <li className="logo" style={{ background: '#ff000000' }}>
                      <a href="#" className="simple-text">
                          <img src="https://nizaero.com/wp-content/uploads/2018/07/Logo-DIGESETT-292x300.png" alt="Logo" />
                      </a>
                  </li>
                  <div className="MenuList">
                      <li style={{ '--bg': '#ffe600' }}>
                          <a href="/home-agente" onClick={handleLinkClick}>
                              <div className="icon">
                                  <IconoHome width={20} height={20} />
                              </div>
                              <p>Inicio</p>
                          </a>
                      </li>
                      <li style={{ '--bg': '#2bff00' }}>
                          <a href="/perfil" onClick={handleLinkClick}>
                              <div className="icon">
                                  <IconoXD width={20} height={20} />
                              </div>
                              <p>Perfil</p>
                          </a>
                      </li>
                      <li style={{ '--bg': '#81760d' }}>
                          <a href="/nuevamulta" onClick={handleLinkClick}>
                              <div className="icon">
                                  <IconoMultas width={20} height={20} />
                              </div>
                              <p>Nuevas Multas</p>
                          </a>
                      </li>
                      <li style={{ '--bg': '#4d0000' }}>
                          <a href="/historial" onClick={handleLinkClick}>
                              <div className="icon">
                                  <IconoHistorial width={20} height={20} />
                              </div>
                              <p>Historial</p>
                          </a>
                      </li>
                  </div>
                  <div className="bottom">
                      <li style={{ '--bg': '#ff0000' }}>
                          <a href="#">
                          </a>
                      </li>
                      <li style={{ '--bg': '#7c2121' }}>
                          <a href="/">
                              <div className="icon">
                                  <Icono width={20} height={20} />
                              </div>
                              <p>Salir</p>
                          </a>
                      </li>
                  </div>
              </ul>
          </nav>
      </div>
  );
}

export default Navbar;