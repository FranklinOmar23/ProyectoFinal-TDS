import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

function FormEmerg({ latitud: propLatitud, longitud: propLongitud }) {
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [latitudForm, setLatitudForm] = useState('');
    const [longitudForm, setLongitudForm] = useState('');
    const [direccion, setDireccion] = useState('');
    const [detalles, setDetalles] = useState('');
    const [requerimiento, setRequerimiento] = useState('');
    const [fecha, setFecha] = useState('');
    const [nivel, setNivel] = useState('nivel1');
    const [error, setError] = useState('');

    useEffect(() => {
        setLatitud(propLatitud);
        setLongitud(propLongitud);
    }, [propLatitud, propLongitud]);

    const obtenerUbicacionActual = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitud(position.coords.latitude);
                setLongitud(position.coords.longitude);
            });
        } else {
            alert('La geolocalización no es soportada por este navegador.');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Realizar validaciones
        if (!direccion.trim() || !detalles.trim() || !requerimiento.trim() || !fecha.trim()) {
            toast.error('Todos los campos son requeridos');
            return;
        }
        // Si todas las validaciones pasan, reseteamos el estado de error
        //g
        // Aquí puedes enviar los datos a donde sea necesario, como una API o un componente padre
    };

    return (
        <>
            <Toaster
                    toastOptions={{
                        style: {
                            height: '90px',
                            width: '300px',
                            fontSize: '16px',
                        },
                    }}
                />
            <div className="container d-flex justify-content-center align-items-center vh-50">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="text-success fw-bold m-0">Agrega un requerimiento</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-auto d-flex justify-content-center align-items-center">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="latitud"><strong>Latitud</strong></label>
                                                <input className="form-control" type="text" id="latitud" placeholder="Latitud" name="latitud" value={latitud} readOnly />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="longitud"><strong>Longitud</strong></label>
                                                <input className="form-control" type="text" id="longitud" placeholder="Longitud" name="longitud" value={longitud} readOnly />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-success btn-sm link-light" type="button" onClick={obtenerUbicacionActual}>Añadir ubicación actual</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="direccion"><strong>Dirección</strong></label>
                                                <input className="form-control" type="text" id="direccion" placeholder="Dirección" name="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="detalles"><strong>Detalles</strong></label>
                                                <input className="form-control" type="text" id="detalles" placeholder="Detalles" name="detalles" value={detalles} onChange={(e) => setDetalles(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="requerimiento"><strong>Requerimiento</strong></label>
                                                <input className="form-control" type="text" id="requerimiento" placeholder="Requerimiento" name="requerimiento" value={requerimiento} onChange={(e) => setRequerimiento(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="fecha"><strong>Fecha</strong></label>
                                                <input className="form-control" type="text" id="fecha" placeholder="Fecha" name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="nivel"><strong>Nivel</strong></label>
                                                <select className="form-select" id="nivel" name="nivel" value={nivel} onChange={(e) => setNivel(e.target.value)}>
                                                    <option value="nivel1">1</option>
                                                    <option value="nivel2">2</option>
                                                    <option value="nivel3">3</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-success btn-sm link-light float-end" type="submit">Guardar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormEmerg;