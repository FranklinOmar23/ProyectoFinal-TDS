import React, { useState, useRef, useEffect } from 'react';
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/bootstrap.min.css";
import "../Css/animate.min.css";
import "../Css/adicciones.css";
import "../Css/relojestilo.css";

import { IconoTop } from "../Componentes/Comp_Helpers/Iconos.jsx"
import Footer from './Comp_Helpers/Footer.jsx';
import Navbar from './Comp_Helpers/Navbar.jsx';
import Topbar from './Comp_Helpers/Topbar.jsx';
import Chart from "chart.js/auto";
import { useAuth } from '../context/provider.jsx';

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
    const canvasRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const datos = {
            labels: ['Uso del Celular', 'Sin matrícula', 'Sin cinturón', 'Obstrucción al peatón'],
            datasets: [{
                data: [45, 30, 60, 80],
                backgroundColor: [
                    'rgb(122, 187, 139)',
                    'rgb(147, 199, 89)',
                    'rgb(180, 123, 91)',
                    'rgb(199, 191, 115)'
                ]
            }]
        };

        const opciones = {
            responsive: true,
            maintainAspectRatio: false
        };

        const contexto = canvasRef.current.getContext('2d');
        const newChartInstance = new Chart(contexto, {
            type: 'pie',
            data: datos,
            options: opciones
        });
        setChartInstance(newChartInstance);

        // Obtener los elementos de la leyenda y asignarles el color correspondiente
        const legendItems = document.querySelectorAll('.legend li');
        legendItems.forEach((item, index) => {
            const color = newChartInstance.data.datasets[0].backgroundColor[index];
            const dot = item.querySelector('.dot');
            dot.style.background = color;
        });

        return () => {
            if (newChartInstance) {
                newChartInstance.destroy();
            }
        };
    }, []);

    return (
        <div className="col-md-6">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="text-success fw-bold m-0">Multas Recientes</h6>
                </div>
                <div className="card-body"> 
                    <canvas ref={canvasRef} width="300px" height="300px"></canvas>
                </div>
            </div>
        </div>
    );
}






function Reloj() {
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState({ horas: 0, minutos: 0, segundos: 0 });
    const horarioEntrada = "09:00:00"; // Establecer el horario de entrada manualmente
    const horarioSalida = "18:00:00";  // Establecer el horario de salida manualmente

    useEffect(() => {
        const calcularTiempoTranscurrido = () => {
            const ahora = new Date();
            const horaActual = ahora.getHours();
            const minutosActual = ahora.getMinutes();
            const segundosActual = ahora.getSeconds();

            const [horaEntradaH, minutosEntradaH, segundosEntradaH] = horarioEntrada.split(':').map(Number);
            const [horaSalidaH, minutosSalidaH, segundosSalidaH] = horarioSalida.split(':').map(Number);

            let diferenciaSegundos;
            
            // Si es antes del horario de entrada
            if (horaActual < horaEntradaH || (horaActual === horaEntradaH && minutosActual < minutosEntradaH) || (horaActual === horaEntradaH && minutosActual === minutosEntradaH && segundosActual < segundosEntradaH)) {
                diferenciaSegundos = (horaEntradaH - horaActual) * 3600 + (minutosEntradaH - minutosActual) * 60 + (segundosEntradaH - segundosActual);
            }
            // Si es después del horario de salida
            else if (horaActual > horaSalidaH || (horaActual === horaSalidaH && minutosActual > minutosSalidaH) || (horaActual === horaSalidaH && minutosActual === minutosSalidaH && segundosActual > segundosSalidaH)) {
                diferenciaSegundos = 0;
            }
            // Si es dentro del horario laboral
            else {
                diferenciaSegundos = (horaActual - horaEntradaH) * 3600 + (minutosActual - minutosEntradaH) * 60 + (segundosActual - segundosEntradaH);
            }

            const horas = Math.floor(diferenciaSegundos / 3600);
            const minutos = Math.floor((diferenciaSegundos % 3600) / 60);
            const segundos = diferenciaSegundos % 60;

            setTiempoTranscurrido({ horas, minutos, segundos });
        };

        // Calcular el tiempo transcurrido cada segundo
        const intervalo = setInterval(calcularTiempoTranscurrido, 1000);

        // Limpiar el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalo);
    }, []);


    return (
        <div className="col-md-6">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="text-success fw-bold m-0">Tiempo transcurrido desde la entrada</h6>
                </div>
                <div className="body-card">
                    <div className='reloj-item'>
                        <div className='horas'>{tiempoTranscurrido.horas}</div> 
                        <p>Hora</p>
                    </div>
                    <div className='reloj-item'>
                        <div className='minutos'>{tiempoTranscurrido.minutos}</div>
                        <p>Minutos</p>
                    </div>
                    <div className='reloj-item'>
                        <div className='segundos'>{tiempoTranscurrido.segundos}</div>
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

