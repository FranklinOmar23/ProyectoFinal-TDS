import React, { useEffect, useState } from "react";
import { useAuth } from '../../context/provider.jsx';
import "../../Css/Navestilo.css";

function Navbar() {
    const { user } = useAuth();
    const [userNombre, setUserNombre] = useState('Usuario no encontrado');
    const [isOpen, setIsOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('home-agente');

    useEffect(() => {
        if (user && user.user && user.user.nombre) {
            setUserNombre(user.user.nombre);
        }
    }, [user]);

    useEffect(() => {
        const storedActiveMenuItem = sessionStorage.getItem('activeMenuItem');
        if (storedActiveMenuItem) {
            setActiveMenuItem(storedActiveMenuItem);
        }
    }, []);

    const handleLinkClick = (e, pageName) => {
        setActiveMenuItem(pageName);
        sessionStorage.setItem('activeMenuItem', pageName);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className={`menuTogle ${isOpen ? "active" : ""}`} onClick={toggleSidebar}></div>
            <nav className={`sidebar ${isOpen ? "active" : ""}`}>
                <ul>
                    <li className="logo" style={{ background: '#ff000000' }}>
                        <a className="navbar-brand" href="#">
                            <img className="img-fluid" width="150" height="150" src="https://nizaero.com/wp-content/uploads/2018/07/Logo-DIGESETT-292x300.png" alt="Logo" />
                        </a>
                    </li>
                    <div className="MenuList">
                        <li style={{ '--bg': '#cbb910' }} className={activeMenuItem === 'home-agente' ? 'active' : ''}>
                            <a href="/home-agente" onClick={(e) => handleLinkClick(e, 'home-agente')}>
                                <div className="icon2">
                                    <i className="fas fa-home"></i>
                                </div>
                                <p>Inicio</p>
                            </a>
                        </li>
                        <li style={{ '--bg': '#D5670C' }} className={activeMenuItem === 'perfil' ? 'active' : ''}>
                            <a href="/perfil" onClick={(e) => handleLinkClick(e, 'perfil')}>
                                <div className="icon2">
                                    <i className="fa-solid fa-user"></i>
                                </div>
                                <p>Perfil</p>
                            </a>
                        </li>
                        <li style={{ '--bg': '#107E72 ' }} className={activeMenuItem === 'nuevamulta' ? 'active' : ''}>
                            <a href="/nuevamulta" onClick={(e) => handleLinkClick(e, 'nuevamulta')}>
                                <div className="icon2">
                                    <i className="fa-solid fa-folder-open"></i>
                                </div>
                                <p>Nuevas Multas</p>
                            </a>
                        </li>
                        <li style={{ '--bg': '#67436A' }} className={activeMenuItem === 'historial' ? 'active' : ''}>
                            <a href="/historial" onClick={(e) => handleLinkClick(e, 'historial')}>
                                <div className="icon2">
                                    <i className="fa-solid fa-chart-simple"></i>   
                                </div>
                                <p>Historial</p>
                            </a>
                        </li>
                    </div>
                    <div className="bottom">
                        <li style={{ '--bg': '#ff0000' }}>
                            <a href="#">
                                <div className="icon2">
                                    <div className="imgbx">
                                        <img src="../avatar1.jpeg" alt="Avatar" />
                                    </div>
                                </div>
                                <p>{userNombre}</p>
                            </a>
                        </li>
                        <li style={{ '--bg': '#7c2121' }}>
                            <a href="/">
                                <div className="icon2">
                                    <i className="fa-solid fa-right-from-bracket"></i>
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
