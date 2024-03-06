import React, { useEffect, useState} from "react";
import { useAuth } from '../../context/provider.jsx';
import "../../Css/Navestilo.css";

function Navbar() {
    const { user } = useAuth();
    const [userNombre, setUserNombre] = useState('Usuario no encontrado');

    useEffect(() => {
        if (user && user.user && user.user.nombre) {
            setUserNombre(user.user.nombre);
        }
    }, [user]);

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = (e) => {
        const clickedItem = e.target.parentNode.parentNode;
        const menuTogle = document.querySelector('.menuTogle');
        const sidebar = document.querySelector('.sidebar');
        menuTogle.classList.toggle('active');
        sidebar.classList.toggle('active');
        const listItems = document.querySelectorAll('.MenuList li');
        listItems.forEach(item => item.classList.remove('active'));
        clickedItem.classList.add('active');
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
                        <li style={{ '--bg': '#ffe600' }} className="active">
                            <a href="/home-agente" onClick={handleLinkClick}>
                                <div className="icon2">
                                    <i className="fas fa-home"></i>
                                </div>
                                <p>Inicio</p>
                            </a>
                        </li>
                        <li style={{ '--bg': '#2bff00' }}>
                            <a href="/perfil" onClick={handleLinkClick}>
                                <div className="icon2">
                                    <i className="fa-solid fa-user"></i>
                                </div>
                                <p>Perfil</p>
                            </a>
                        </li>
                        <li style={{ '--bg': '#81760d' }}>
                            <a href="/nuevamulta" onClick={handleLinkClick}>
                                <div className="icon2">
                                <i class="fa-solid fa-folder-open"></i>
                                </div>
                                <p>Nuevas Multas</p>
                            </a>
                        </li>
                        <li style={{ '--bg': '#4d0000' }}>
                            <a href="/historial" onClick={handleLinkClick}>
                                <div className="icon2">
                                    <i class="fa-solid fa-chart-simple"></i>   
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
