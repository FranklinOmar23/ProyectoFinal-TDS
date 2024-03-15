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
import socketIOClient from "socket.io-client";
import "../Css/chat.css"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import toast, { Toaster } from 'react-hot-toast';

const ENDPOINT = "http://localhost:5000";


function InformacionesCard() {
    const { user, messages, addMessage } = useAuth();
    const [userNombre, setUserNombre] = useState('Usuario no encontrado');
    const [messageInput, setMessageInput] = useState('');
    const [selectedOption, setSelectedOption] = useState('1');

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
    socket.on("message", (message) => {
        console.log('Mensaje recibido:', message);
        if (typeof message === 'object' && message.text && message.time && message.user) {
            const newMessages = [message, ...messages];
            localStorage.setItem('messages', JSON.stringify(newMessages));
            addMessage(message);
        }
    });

    return () => {
        socket.disconnect();
    };
}, [messages, addMessage]);
    return (
        <div className="col-md-6">
            {/* Contenido de la tarjeta de Informaciones */}
            <div className="card shadow mb-4">
                <div className="card-header py-3" >
                    <h6 className="text-success fw-bold m-0">Informaciones</h6>
                </div>
                <ul className="list-group list-group-flush ul-chat chat-container">
                    <div className='contenedor-padre'>
                        {messages.map((message, index) => (
                            <div key={index} className="message-container">
                                <span className="name-user">
                                    {message.user}
                                    </span>
                                <li className="message-item" style={{ backgroundColor: message.color, color: 'white' }}>
                                    {message.text}
                                    {message.time &&
                                        <span className="message-time">
                                            {new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                        </span>
                                    }
                                </li>
                            </div>
                        ))}
                    </div>
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
        if (!canvasRef.current || !multa) {
            return; // No renderizar el gráfico si no hay multas
        }

        let ultimasMultas = [];
        if (multa.multasDelAgente.length >= 5) {
            // Filtrar las últimas 5 multas basándote en la fecha si hay al menos 5 multas
            ultimasMultas = multa.multasDelAgente
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha descendente
                .slice(0, 5); // Seleccionar las últimas 5 multas
        } else {
            // Si hay menos de 5 multas, mostrar todas las multas disponibles
            ultimasMultas = multa.multasDelAgente;
        }

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

    if (!multa) {
        return null; // No renderizar el componente si no hay multas
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
        <div className={`${relojClass}`}>
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
    const [map, setMap] = useState(null);
    const { requerimiento } = useAuth();
    const [userLocation, setUserLocation] = useState(null);
  
    useEffect(() => {
      let newMap;
  
      const initMap = async () => {
        if (newMap) {
          return;
        }
  
        try {
          const position = await getCurrentLocation();
          setUserLocation(position.coords);
  
          newMap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 16);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(newMap);
          setMap(newMap);
  
          // Crear círculo de ubicación del usuario
          const userCircle = L.circle([position.coords.latitude, position.coords.longitude], {
            color: 'green',
            fillColor: 'green',
            fillOpacity: 0.5,
            radius: 32,
          }).addTo(newMap);
          userCircle.bindPopup("Tu ubicación actual");
  
          // Agregar círculos para los requerimientos
          if (requerimiento && requerimiento.requerimientos) {
            requerimiento.requerimientos.forEach((req) => {
              const { latitud, longitud, direccion, fecha, requerimiento, nivel } = req;
  
              // Definir el color del círculo según el nivel
              let color;
              switch (nivel) {
                case 1:
                  color = 'yellow';
                  break;
                case 2:
                  color = 'orange';
                  break;
                case 3:
                  color = 'red';
                  break;
                default:
                  color = 'blue'; // Color predeterminado para otros casos
              }
  
              // Crear un círculo con el color determinado
              const reqCircle = L.circle([latitud, longitud], {
                color: color,
                fillColor: color,
                fillOpacity: 0.5,
                radius: 300,
              }).addTo(newMap);
  
              reqCircle.bindPopup(`<b> Lugar: ${direccion}</b><br> Fecha: ${fecha}<br> Requerimiento: ${requerimiento}`);
            });
          }
        } catch (error) {
          console.error('Error al obtener la ubicación del usuario', error);
          toast.error('No se pudo obtener la ubicación del usuario.');
        }
      };
  
      initMap();
  
      // Limpiar el mapa al desmontar el componente
      return () => {
        if (newMap) {
          newMap.remove();
        }
      };
    }, [requerimiento]);
  
    const getCurrentLocation = () => {
      return new Promise((resolve, reject) => {
        const options = {
          enableHighAccuracy: true,
          maximumAge: 60000, // 60 segundos
          timeout: 20000, 
        };
  
        navigator.geolocation.getCurrentPosition(
          resolve,
          (error) => {
            reject(`Error al obtener la ubicación del usuario: ${error.message}`);
          },
          options
        );
      });
    };
  
    return (
      <>
        <div id="page-top"></div>
        <div id="wrapper">
          <Navbar />
          <div className="d-flex flex-column" id="content-wrapper">
            <Topbar titulo="Home" />
            <div className="container">
              <div className="row">
                <div className="col-md-6" style={{ height: '400px' }} id="map"></div>
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
          <a className="border rounded d-inline scroll-to-top" href="#page-top">
            <IconoTop width={40} height={40} />
            <i className="fas fa-angle-up"> </i>
          </a>
        </div>
      </>
    );
  }
  
  export default Home;