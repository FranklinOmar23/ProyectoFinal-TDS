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
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import 'leaflet-geosearch/assets/css/leaflet.css';


import toast, { Toaster } from 'react-hot-toast';

const ENDPOINT = "http://localhost:5000";


function InformacionesCard() {
  const { messages, addMessage } = useAuth();
  const [expandedMessages, setExpandedMessages] = useState({});
  const [showFirstTime, setShowFirstTime] = useState(true); // Estado para controlar qué tiempo mostrar

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

  const handleToggleExpand = (index) => {
    setExpandedMessages(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
    setShowFirstTime(prevState => !prevState); // Cambiar el estado para alternar entre los tiempos
  
  };

  return (
    <div className="col-md-6">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="text-success fw-bold m-0">Informaciones</h6>
        </div>
        <ul className="list-group list-group-flush ul-chat chat-container">
          <div className='contenedor-padre'>
            {messages.map((message, index) => (
              <div key={index} className="message-container">
                <span className="name-user">
                  {message.user}
                </span>
                <li className={`message-item ${expandedMessages[index] ? 'expanded' : 'collapsed'}`} 
                    style={{ backgroundColor: message.color, color: 'white' }} 
                    onClick={() => handleToggleExpand(index)}>
                  {message.text}  -
                  <span className="message-ver">
                      {expandedMessages[index] ? 'Ver menos...' : 'Ver más...'}
                  </span>
                  
                  {expandedMessages[index] &&
                    <div>
                      <p><strong>Latitud:</strong> {message.latitud}</p>
                      <p><strong>Longitud:</strong> {message.longitud}</p>
                      <p><strong>Dirección:</strong> {message.direccion}</p>
                      <p><strong>Nivel:</strong> {message.nivel}</p>
                      <p><strong>Fecha:</strong> {message.fecha}</p>
                    </div>
                  }
                  {/* Mostrar uno de los tiempos según el estado */}
                  {showFirstTime ? (
                    <span className="message-time">
                      {message.time &&
                        new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                  ) : (
                    <span className="message-time2">
                      {message.time &&
                        new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                  )}
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
  const { user } = useAuth();
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState({ horas: 0, minutos: 0, segundos: 0 });
  const [flipClasses, setFlipClasses] = useState(Array(3).fill(''));

  useEffect(() => {
    const calcularTiempoTranscurrido = () => {
      if (user && user.user && user.user.horario_entrada) {
        const ahora = new Date();
        const entrada = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), ...user.user.horario_entrada.split(':'));
        const tiempoTranscurrido = ahora - entrada;
        const horas = Math.floor(tiempoTranscurrido / 3600000);
        const minutos = Math.floor((tiempoTranscurrido % 3600000) / 60000);
        const segundos = Math.floor((tiempoTranscurrido % 60000) / 1000);
        setTiempoTranscurrido({ horas, minutos, segundos });
      } else {
        setTiempoTranscurrido({ horas: 0, minutos: 0, segundos: 0 });
      }
    };

    calcularTiempoTranscurrido();

    const intervalId = setInterval(() => {
      calcularTiempoTranscurrido();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [user]);

  useEffect(() => {
    setFlipClasses(Array(3).fill('flip'));
    const timeoutIds = Array.from({ length: 3 }, (_, index) => {
      return setTimeout(() => {
        setFlipClasses(prevClasses => {
          const newClasses = [...prevClasses];
          newClasses[index] = '';
          return newClasses;
        });
      }, 800 );
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, [tiempoTranscurrido]);

  const relojClass = fullWidth ? "col-md-12" : "col-md-6";

  const getTimeRemaining = (targetDateTime) => {
    const nowTime = Date.now();
    const complete = nowTime >= targetDateTime;

    if (complete) {
      return {
        complete,
        seconds: 0,
        minutes: 0,
        hours: 0,
      };
    }

    const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);
    const hours = Math.floor(secondsRemaining / 60 / 60);
    const minutes = Math.floor(secondsRemaining / 60) - hours * 60;
    const seconds = secondsRemaining % 60;

    return {
      complete,
      seconds,
      minutes,
      hours,
    };
  };

  const updateTimeSection = (sectionID, timeValue) => {
    const firstNumber = Math.floor(timeValue / 10) || 0;
    const secondNumber = timeValue % 10 || 0;
    const sectionElement = document.getElementById(sectionID);
    if (!sectionElement) return; // Verificar si el elemento existe
    const timeSegments = sectionElement.querySelectorAll('.time-segment');

    updateTimeSegment(timeSegments[0], firstNumber);
    updateTimeSegment(timeSegments[1], secondNumber);
  };

  const updateTimeSegment = (segmentElement, timeValue) => {
    const segmentElements = getTimeSegmentElements(segmentElement);

    if (parseInt(segmentElements.segmentDisplayTop.textContent, 10) === timeValue) {
      return;
    }

    segmentElements.segmentOverlay.classList.add('flip');

    updateSegmentValues(
      segmentElements.segmentDisplayTop,
      segmentElements.segmentOverlayBottom,
      timeValue
    );

    const finishAnimation = () => {
      segmentElements.segmentOverlay.classList.remove('flip');
      updateSegmentValues(
        segmentElements.segmentDisplayBottom,
        segmentElements.segmentOverlayTop,
        timeValue
      );

      segmentElements.segmentOverlay.removeEventListener('animationend', finishAnimation);
    };

    segmentElements.segmentOverlay.addEventListener('animationend', finishAnimation);
  };

  const getTimeSegmentElements = (segmentElement) => {
    const segmentDisplay = segmentElement.querySelector('.segment-display');
    const segmentDisplayTop = segmentDisplay.querySelector('.segment-display__top');
    const segmentDisplayBottom = segmentDisplay.querySelector('.segment-display__bottom');
    const segmentOverlay = segmentDisplay.querySelector('.segment-overlay');
    const segmentOverlayTop = segmentOverlay.querySelector('.segment-overlay__top');
    const segmentOverlayBottom = segmentOverlay.querySelector('.segment-overlay__bottom');

    return {
      segmentDisplayTop,
      segmentDisplayBottom,
      segmentOverlay,
      segmentOverlayTop,
      segmentOverlayBottom,
    };
  };

  const updateSegmentValues = (displayElement, overlayElement, value) => {
    displayElement.textContent = value;
    overlayElement.textContent = value;
  };

  useEffect(() => {
    const timeRemainingBits = getTimeRemaining(new Date().getTime());
    updateTimeSection('seconds', timeRemainingBits.seconds);
    updateTimeSection('minutes', timeRemainingBits.minutes);
    updateTimeSection('hours', timeRemainingBits.hours);

    const countdownTimer = setInterval(() => {
      const isComplete = updateAllSegments();

      if (isComplete) {
        clearInterval(countdownTimer);
      }
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  const updateAllSegments = () => {
    const timeRemainingBits = getTimeRemaining(new Date().getTime());
    updateTimeSection('seconds', timeRemainingBits.seconds);
    updateTimeSection('minutes', timeRemainingBits.minutes);
    updateTimeSection('hours', timeRemainingBits.hours);

    return timeRemainingBits.complete;
  };

  return (
    <div className={`${relojClass}`}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="text-success fw-bold m-0">Tiempo transcurrido desde la entrada</h6>
        </div>
        <div className="body-card">
          <div className="countdown">
            {Object.entries(tiempoTranscurrido).map(([key, value], index) => (
              <div className="time-section" key={key}>
                <div className="time-group">
                  <div className="time-segment">
                    <div className="segment-display">
                      <div className={`segment-display__top ${flipClasses[index]}`}>{value.toString().padStart(2, '0')}</div>
                      <div className={`segment-display__bottom ${flipClasses[index]}`}>{value.toString().padStart(2, '0')}</div>
                      <div className={`segment-overlay ${flipClasses[index]}`}>
                        <div className="segment-overlay__top"></div>
                        <div className="segment-overlay__bottom"></div>
                      </div>
                    </div>
                  </div>
                  <p>{key}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}





function Home() {
  const [map, setMap] = useState(null);
  const { requerimiento } = useAuth();
  const [userLocation, setUserLocation] = useState(null);
  const [clickedCoords, setClickedCoords] = useState(null);

  
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

        // Después de inicializar el mapa
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
          provider: provider,
          autoComplete: true,
          autoCompleteDelay: 250,
          showMarker: true,
        });

        newMap.addControl(searchControl);

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
        } const onMapClick = (e) => {
          setClickedCoords(e.latlng);
        };
        newMap.on('click', onMapClick);
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
              <div className="col-md-6" style={{ height: '400px', position: 'relative' }} id="map">
              <div className='lati'>
              {clickedCoords && (
                  <div>
                    <p className='leaflet-control-coordinates leaflet-control'>
                      Lat: {clickedCoords.lat.toFixed(6)} Long: {clickedCoords.lng.toFixed(6)}
                    </p>
                  </div>
              )}
            </div>
              </div>
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