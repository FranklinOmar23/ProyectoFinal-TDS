import React, { useState, useRef, useEffect } from 'react';
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/bootstrap.min.css";
import "../Css/animate.min.css";
import "../Css/adicciones.css"
import "../Css/relojestilo.css";
import "../Css/graficopastel.css";
import { IconoTop } from "../Componentes/Comp_Helpers/Iconos.jsx"
import Footer from './Comp_Helpers/Footer.jsx';
import Navbar from './Comp_Helpers/Navbar.jsx';
import Topbar from './Comp_Helpers/Topbar.jsx';

import toast, { Toaster } from 'react-hot-toast';


function Map() {
    const googleMapsUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBIwLAPjCguzhFQCiT4RuILjVdUVVp_dq4&q=Santo+Domingo,Republica+Dominicana";

    return (
        <div className="col-md-6">
            <iframe 
                allowFullScreen 
                frameBorder="0" 
                src={googleMapsUrl} 
                width="100%" 
                height="400">
            </iframe>
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
        <div className="col-md-6">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="text-success fw-bold m-0">Multas Recientes</h6>
                </div>
                <div className="card-body" style={{ minHeight: '250px', position: 'relative' }}>
                    <div className="pie-chart" style={{ width: '200px', height: '200px', margin: '60px auto 20px' }}>
                        <div className="slice" style={{ '--value': 45 }}>
                            <span className="value-label">45%</span>
                        </div>
                        <div className="slice" style={{ '--value': 30 }}>
                            <span className="value-label">30%</span>
                        </div>
                        <div className="slice" style={{ '--value': 15 }}>
                            <span className="value-label">15%</span>
                        </div>
                        <div className="slice" style={{ '--value': 10 }}>
                            <span className="value-label">10%</span>
                        </div>
                    </div>
                    <ul className="legend" style={{  }}>
                        <li>
                            <span className="dot" style={{ background: 'rgb(122, 187, 139)' }}></span>
                            Uso del Celular
                        </li>
                        <li>
                            <span className="dot" style={{ background: 'rgb(147, 199, 89)' }}></span>
                            Sin matrícula
                        </li>
                        <li>
                            <span className="dot" style={{ background: 'rgb(180, 123, 91)' }}></span>
                            Sin cinturón
                        </li>
                        <li>
                            <span className="dot" style={{ background: 'rgb(199, 191, 115)' }}></span>
                            Obstrución al peatón
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}





function Reloj() {
    const [tiempo, setTiempo] = useState({ horas: 0, minutos: 0, segundos: 0 });

    useEffect(() => {
        const horasAFuturo = 5; 
        const fechaFinalizacion = new Date();
        fechaFinalizacion.setHours(fechaFinalizacion.getHours() + horasAFuturo);

        const intervalo = setInterval(() => {
            const ahora = new Date().getTime();
            const diferencia = fechaFinalizacion - ahora;

            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            setTiempo({ horas, minutos, segundos });

            if (diferencia < 0) {
                clearInterval(intervalo);
            }
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className="col-md-6">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="text-success fw-bold m-0">Tiempo de finalización</h6>
                </div>
                <div className="body-card">
                    <div className='reloj-item'>
                        <div className='horas'>{tiempo.horas}</div> 
                        <p>Hora</p>
                    </div>
                    <div className='reloj-item'>
                        <div className='minutos'>{tiempo.minutos}</div>
                        <p>Minutos</p>
                    </div>
                    <div className='reloj-item'>
                        <div className='segundos'>{tiempo.segundos}</div>
                        <p>Segundos</p>
                    </div>
                </div>
            </div>
        </div>
    );
}




function Home() {

    return (
        <>
        <div id="page-top"></div>
        <div id="wrapper">
            <Navbar />
            <div className="d-flex flex-column" id="content-wrapper">
                <Topbar titulo="Home"/>
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
                        <Reloj />
                    </div>
                </div>
                <Footer />
            </div>
            <a className="border rounded d-inline scroll-to-top" href="#page-top"> <IconoTop width={40} height={40} /><i className="fas fa-angle-up"> </i></a>
        </div>
        </>
    );
}

export default Home;

