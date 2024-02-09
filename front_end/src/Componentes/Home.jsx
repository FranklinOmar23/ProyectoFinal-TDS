import React, { useState } from 'react';
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/bootstrap.min.css";
import "../Css/animate.min.css";


import toast, { Toaster } from 'react-hot-toast';


function Navbar() {
    return (
        <nav className="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark" style={{ background: 'rgb(4, 131, 55)' }}>
            <div className="container-fluid d-flex flex-column p-0">
                <a className="navbar-brand d-flex flex-column justify-content-lg-center align-items-lg-center sidebar-brand m-4" href="#">
                    <div className="sidebar-brand-icon rotate-n-15"></div>
                    <div className="sidebar-brand-text mx-3"></div>
                    <img className="img-fluid d-lg-flex" width="100" height="70" src="https://nizaero.com/wp-content/uploads/2018/07/Logo-DIGESETT-292x300.png" alt="Logo" />
                </a>
                <hr className="sidebar-divider my-0" />
                <ul className="navbar-nav text-light" id="accordionSidebar">
                    <li className="nav-item"><a className="nav-link active" href="index.html"></a></li>
                    <hr className="sidebar-divider" />
                    <div className="sidebar-heading">
                        <p className="mb-0">Menú</p>
                    </div>
                    <li className="nav-item"><a className="btn btn-primary nav-link" role="button" href="index.html" data-bs-target="index.html" style={{ background: 'transparent' }}><i className="fas fa-th-large"></i><span id="spanInicio">Inicio</span></a></li>
                    <li className="nav-item"><a className="btn btn-primary nav-link" role="button" data-bs-target="perfil.html" href="perfil.html" style={{ background: 'transparent' }}><i className="fas fa-user-circle"></i><span id="spanPerfil">Perfil</span></a></li>
                    <li className="nav-item"><a className="btn btn-primary nav-link" role="button" data-bs-target="nuevaMulta.html" href="nuevaMulta.html" style={{ background: 'transparent' }}><i className="fas fa-folder"></i><span id="spanMultas">Nuevas Multas</span></a></li>
                    <li className="nav-item"><a className="btn btn-primary nav-link" role="button" data-bs-target="historial.html" href="historial.html" style={{ background: 'transparent' }}><i className="fas fa-chart-area"></i><span id="spanHistorial">&nbsp;Historial</span></a></li>
                    <hr className="sidebar-divider" />
                </ul>
                <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
            </div>
        </nav>
    );
}

function Topbar() {
    return (
        <nav className="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
            <div className="container-fluid">
                <div href="#index.html"></div>
                <div>
                    <nav className="navbar navbar-expand navbar-light" id="sidebar-wrapper">
                        <div className="container"><button data-bs-toggle="collapse" className="navbar-toggler d-none" data-bs-target="#navbarResponsive"></button></div>
                    </nav>
                </div>
                <div></div>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <h3 className="text-dark mb-0">Home</h3>
                    <ul className="navbar-nav flex-nowrap ms-auto">
                        <li className="nav-item dropdown d-sm-none no-arrow show"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i className="fas fa-search"></i></a>
                            <div className="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
                                <form className="me-auto navbar-search w-100">
                                    <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                                        <div className="input-group-append"><button className="btn btn-primary py-0" type="button"><i className="fas fa-search"></i></button></div>
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <div className="nav-item dropdown no-arrow">
                                <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" id="linkNotificaciones" href="#">
                                    <span className="badge bg-danger badge-counter"></span>
                                    <i className="fas fa-bell fa-fw"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                                    <h6 className="dropdown-header">alerts center</h6>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="me-3">
                                            <div className="bg-primary icon-circle"><i className="fas fa-file-alt text-white"></i></div>
                                        </div>
                                        <div>
                                            <span className="small text-gray-500">December 12, 2019</span>
                                            <p>A new monthly report is ready to download!</p>
                                        </div>
                                    </a>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="me-3">
                                            <div className="bg-success icon-circle"><i className="fas fa-donate text-white"></i></div>
                                        </div>
                                        <div>
                                            <span className="small text-gray-500">December 7, 2019</span>
                                            <p>$290.29 has been deposited into your account!</p>
                                        </div>
                                    </a>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="me-3">
                                            <div className="bg-warning icon-circle"><i className="fas fa-exclamation-triangle text-white"></i></div>
                                        </div>
                                        <div>
                                            <span className="small text-gray-500">December 2, 2019</span>
                                            <p>Spending Alert: We've noticed unusually high spending for your account.</p>
                                        </div>
                                    </a>
                                    <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <div className="shadow dropdown-list dropdown-menu dropdown-menu-end" aria-labelledby="alertsDropdown"></div>
                        </li>
                        <div className="d-none d-sm-block topbar-divider"></div>
                        <li className="nav-item dropdown no-arrow">
                            <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span className="d-none d-lg-inline me-2 text-gray-600 small">John Doe</span><img className="border rounded-circle img-profile"  src="../../" /></a>
                                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in"><a className="dropdown-item" href="#"><i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Perfil</a><a className="dropdown-item" href="#"><i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>Ajustes</a>
                                    <div className="dropdown-divider"></div><a className="dropdown-item" href="#"><strong><span style={{ color: 'rgb(209, 211, 226)' }}>Cerrar Sesión</span></strong></a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

function Map() {
    return (
        <div className="col-md-6">
            <iframe allowFullScreen frameBorder="0" src="https://cdn.bootstrapstudio.io/placeholders/map.html" width="100%" height="400"></iframe>
        </div>
    );
}

function InformacionesCard() {
    return (
        <div className="col-md-6">
            {/* Contenido de la tarjeta de Informaciones */}
            <div className="card shadow mb-4">
                <div className="card-header py-3" >
                    <h6 className="text-success fw-bold m-0">Informaciones</h6>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                                <h6 className="mb-0"><strong>Lunch meeting</strong></h6><span className="text-xs">10:30 AM</span>
                            </div>
                            <div className="col-auto">
                                <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-1"/><label className="form-check-label" htmlFor="formCheck-1"></label></div>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                                <h6 className="mb-0"><strong>Lunch meeting</strong></h6><span className="text-xs">11:30 AM</span>
                            </div>
                            <div className="col-auto">
                                <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-2"/><label className="form-check-label" htmlFor="formCheck-2"></label></div>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                                <h6 className="mb-0"><strong>Lunch meeting</strong></h6><span className="text-xs">12:30 AM</span>
                            </div>
                            <div className="col-auto">
                                <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-3"/><label className="form-check-label" htmlFor="formCheck-3"></label></div>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                                <h6 className="mb-0"><strong>Lunch meeting</strong></h6><span className="text-xs">12:30 AM</span>
                            </div>
                            <div className="col-auto">
                                <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-4"/><label className="form-check-label" htmlFor="formCheck-4"></label></div>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                                <h6 className="mb-0"><strong>Lunch meeting</strong></h6><span className="text-xs">12:30 AM</span>
                            </div>
                            <div className="col-auto">
                                <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-5"/><label className="form-check-label" htmlFor="formCheck-5"></label></div>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                                <h6 className="mb-0"><strong>Lunch meeting</strong></h6><span className="text-xs">12:30 AM</span>
                            </div>
                            <div className="col-auto">
                                <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-6"/><label className="form-check-label" htmlFor="formCheck-6"></label></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function MultasRecientesCard() {
    return (
        <div className="col">
            {/* Contenido de la tarjeta de Multas Recientes */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="text-success fw-bold m-0">Multas Recientes</h6>
                </div>
                <div className="card-body">
                    <h4 className="small fw-bold">Customer Database<span className="float-end">60%</span></h4>
                    <div className="progress mb-4">
                        <div className="progress-bar bg-primary" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: '60%' }}><span className="visually-hidden">60%</span></div>
                    </div>
                    <h4 className="small fw-bold">Payout Details<span className="float-end">80%</span></h4>
                    <div className="progress mb-4">
                        <div className="progress-bar bg-info" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: '80%' }}><span className="visually-hidden">80%</span></div>
                    </div>
                    <h4 className="small fw-bold">Account setup<span className="float-end">Complete!</span></h4>
                    <div className="progress mb-4">
                        <div className="progress-bar bg-success" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}><span className="visually-hidden">100%</span></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="text-center bg-dark">
            {/* Contenido del pie de página */}
            <div className="container text-white py-4 py-lg-5">
                <p className="mb-0"><br />Dirección General de Seguridad de Tránsito y Transporte Terrestre | DIGESETT<br /><br />Ave. Expreso V Centenario esq. San Martín, Santo Domingo, R.D<br /><br />info@digesett.gob.do<br /><br /></p>
                <p className="text-muted mb-0">Todos los Derechos Reservados © 2024&nbsp;</p>
            </div>
        </footer>
    );
}

function Home() {

    return (
        <div id="wrapper">
            <Navbar />
            <div className="d-flex flex-column" id="content-wrapper">
                <Topbar />
                <div className="container">
                    <div className="row">
                        <Map />
                        <InformacionesCard />
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="d-sm-flex justify-content-between align-items-center mb-4"></div>
                    <div className="row">
                        <MultasRecientesCard />
                    </div>
                </div>
                <Footer />
            </div>
            <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
        </div>
    );
}

export default Home;

