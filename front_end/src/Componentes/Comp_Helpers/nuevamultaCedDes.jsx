import React, { useState } from "react";
import axios from 'axios';
import NmDatosCon from "./nuevamultaDatosContainer.jsx";
import carImage from "../../carroprovisionalMulta.jpg";
import "../../Css/nuevamulta.css"

function NmCedDes({ setNombre, setCedula }) {
    const [cedula, setCedulaState] = useState(""); // Estado para almacenar la cédula

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cedulaValue = e.target.value;
            try {
                const response = await axios.post('http://localhost:4000/getUserNameByCedula', { cedula: cedulaValue });
                setNombre(response.data.nombre);
                setCedula(cedulaValue); // Actualiza el estado de la cédula
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
                            onChange={(e) => setCedulaState(e.target.value)} // Actualiza el estado de la cédula
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="text-success fw-bold m-0">Vehículo</h6>
                        </div>
                        <div class="card-body">
                        <div className="row">
                            <div className="col-auto d-flex justify-content-center align-items-center imagencontainer" style={{ minHeight: '150px' }}>
                                {/* Espacio reservado para la imagen */}
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
                                    <div class="mb-3 multa">
                                <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                            </div>
                            <div class="mb-3 multa">
                                <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                            </div>
                            <div class="mb-3 multa">
                                <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                            </div>
                            <div class="mb-3 multa">
                                <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                            </div>
                            <div class="mb-3 multa">
                                <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                            </div>
                            <div class="mb-3 multa">
                                <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                            </div>
                            <div class="mb-3 multa">
                                <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                            </div>
                            <div class="mb-3 multa">
                                <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NmCedDes;
