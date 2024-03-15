import React, { useState, useRef, useEffect } from 'react';
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/bootstrap.min.css";
import "../Css/animate.min.css";
import "../Css/adicciones.css"
import "../Css/relojestilo.css";
import { IconoTop } from "../Componentes/Comp_Helpers/Iconos.jsx"
import Footer from './Comp_Helpers/Footer.jsx';
import Navbar from './Comp_Helpers/Navbar.jsx';
import Topbar from './Comp_Helpers/Topbar.jsx';
import { useAuth } from '../context/provider.jsx';
import Chart from "chart.js/auto";

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
    const { multa } = useAuth();

    useEffect(() => {
        if (!canvasRef.current || !multa || !multa.multasDelAgente || multa.multasDelAgente.length < 5) {
            return; // No renderizar el gráfico si no hay multas o si hay menos de 5 multas
        }

        // Filtrar las últimas 5 multas basándote en la fecha
        const ultimasMultas = multa.multasDelAgente
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha descendente
            .slice(0, 5); // Seleccionar las últimas 5 multas

        // Procesar los datos de las multas para contar cuántas veces se ha impuesto cada tipo de multa
        const conteoMultas = ultimasMultas.reduce((acc, multa) => {
            const razon = multa.razon;
            acc[razon] = (acc[razon] || 0) + 1;
            return acc;
        }, {});

        // Preparar los datos para el gráfico
        const labels = Object.keys(conteoMultas);
        const data = Object.values(conteoMultas);

        const datos = {
            labels: labels,
            datasets: [{
                data: data,
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
    }, [multa]); // Dependencia del efecto: se ejecuta cada vez que cambian los datos de multa

    if (!multa || !multa.multasDelAgente || multa.multasDelAgente.length < 5) {
        return null; // No renderizar el componente si no hay multas o si hay menos de 5 multas
    }

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





export function Reloj({ fullWidth = false }) {
    const { user } = useAuth(); // Obtén el objeto user del contexto
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState({ horas: 0, minutos: 0, segundos: 0 });
   
    useEffect(() => {
       const calcularTiempoTranscurrido = () => {
         if (user && user.user && user.user.horario_entrada) {
           const ahora = new Date();
           // Convertir el horario de entrada a un objeto Date
           const entrada = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), ...user.user.horario_entrada.split(':'));
   
           // Calcular el tiempo transcurrido desde la entrada hasta el momento actual
           const tiempoTranscurrido = ahora - entrada;
   
           // Convertir milisegundos a horas, minutos y segundos
           const horas = Math.floor(tiempoTranscurrido / 3600000);
           const minutos = Math.floor((tiempoTranscurrido % 3600000) / 60000);
           const segundos = Math.floor((tiempoTranscurrido % 60000) / 1000);
   
           setTiempoTranscurrido({ horas, minutos, segundos });
         } else {
           setTiempoTranscurrido({ horas: 0, minutos: 0, segundos: 0 });
         }
       };
   
       // Llamar a la función inicialmente para establecer el tiempo transcurrido
       calcularTiempoTranscurrido();
   
       // Establecer un intervalo para actualizar el tiempo transcurrido cada segundo
       const intervalId = setInterval(() => {
         calcularTiempoTranscurrido();
       }, 1000); // 1000 milisegundos = 1 segundo
   
       // Limpiar el intervalo cuando el componente se desmonte
       return () => clearInterval(intervalId);
    }, [user]); // Dependencia del efecto: se ejecuta cada vez que cambia el objeto user
   
    const relojClass = fullWidth ? "col-md-12" : "col-md-6";
   
    return (
        <div className={`${relojClass} card shadow mb-4`}>
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
};
   



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
                        <Reloj  />
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