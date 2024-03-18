import React, {useState} from "react";

function FormEmerg ({ closeForm }){

    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');

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
    

    return (
        <>
        <div class="container d-flex justify-content-center align-items-center vh-50">
        <div className="col-lg-5">
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="text-success fw-bold m-0">Agrega un requerimiento</h6>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-auto d-flex justify-content-center align-items-center">
                    <form>
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
                                    <input className="form-control" type="text" id="direccion" placeholder="Dirección" name="direccion"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="requerimiento"><strong>Requerimiento</strong></label>
                                    <input className="form-control" type="text" id="requerimiento" placeholder="Requerimiento" name="requerimiento"/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="fecha"><strong>Fecha</strong></label>
                                    <input className="form-control" type="text" id="fecha" placeholder="Fecha" name="fecha"/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="nivel"><strong>Nivel</strong></label>
                                    <select className="form-select" id="nivel" name="nivel">
                                        <option value="nivel1">1</option>
                                        <option value="nivel2">2</option>
                                        <option value="nivel3">3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-success btn-sm link-light float-start me-2" onClick={closeForm}>Cancelar</button>
                            <button className="btn btn-success btn-sm link-light float-end" type="submit" onClick={closeForm}>Guardar</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default FormEmerg;