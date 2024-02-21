import React, {useState} from "react";
import axios from 'axios';
import NmDatosCon from "./nuevamultaDatosContainer.jsx";

function NmCedDes({ setNombre }) {
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cedula = e.target.value;
            try {
                const response = await axios.post('http://localhost:4000/getUserNameByCedula', { cedula });
                setNombre(response.data.nombre);
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
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div className="multa-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="fs-6 fw-bolder text-success card-title mb-3">Historial</h4>
                            <div className="multas-wrapper">
                                <div className="multas-scroll">
                                    <div className="multas">
                                        <div className="mb-3 multa">
                                            <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                                        </div>
                                        <div className="mb-3 multa">
                                            <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                                        </div>
                                        <div className="mb-3 multa">
                                            <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                                        </div>
                                        <div className="mb-3 multa">
                                            <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                                        </div>
                                        <div className="mb-3 multa">
                                            <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                                        </div>
                                        <div className="mb-3 multa">
                                            <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                                        </div>
                                        <div className="mb-3 multa">
                                            <strong>Razón:</strong> Exceso de velocidad - <strong>Monto:</strong> $100
                                        </div>
                                        <div className="mb-3 multa">
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