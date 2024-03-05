import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../../context/provider.jsx';
import NmDatosCon from "./nuevamultaDatosContainer.jsx";
import carImage from "../../carroprovisionalMulta.jpg";
import "../../Css/nuevamulta.css";

function NmCedDes({ setNombre, setCedula }) {
    const [cedula, setCedulaState] = useState("");
    const { multa } = useAuth();
    const [historialMultas, setHistorialMultas] = useState([]);

    useEffect(() => {
        setCedulaState(multa?.cedula_usuario || "");
        // Asegurarse de que multa sea un array antes de asignarlo a historialMultas
        setHistorialMultas(Array.isArray(multa?.multasDelAgente) ? multa?.multasDelAgente : []);
    }, [multa]);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cedulaValue = e.target.value;
            try {
                const response = await axios.post('http://localhost:4000/getUserNameByCedula', { cedula: cedulaValue });
                setNombre(response.data.nombre);
                setCedula(cedulaValue);
            } catch (error) {
                console.error('Error al obtener el nombre del usuario:', error);
            }
        }
    };

    return (
        <>
            <div className="col-lg-4">
                <div className="card mb-3"></div>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="text-success fw-bold m-0">Cédula</h6>
                        <input
                            className="form-control"
                            type="text"
                            id="cedula"
                            placeholder="Cédula"
                            name="cedula"
                            value={cedula}
                            onChange={(e) => setCedulaState(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="text-success fw-bold m-0">Vehículo</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-auto d-flex justify-content-center align-items-center imagencontainer" style={{ minHeight: '150px' }}>
                                {carImage ? (
                                    <img src={carImage} alt="Carro" className="imagenfoto" />
                                ) : (
                                    <span>No hay foto disponible</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="multa-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="fs-6 fw-bolder text-success card-title mb-3">Historial</h4>
                            <div className="multas-wrapper">
                                <div className="multas-scroll">
                                    <div className="multas">
                                    {historialMultas
                                        .filter((m) => m.id_agente === multa?.id_agente) // Filtrar por ID del agente
                                        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha, más reciente primero
                                        .slice(0, 3) // Obtener las últimas 3 multas
                                        .map((m, index) => (
                                            <div key={index} className="mb-3 multa">
                                                <strong>Razón:</strong> {m.razon} - <strong>Monto:</strong> ${m.monto}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NmCedDes;
