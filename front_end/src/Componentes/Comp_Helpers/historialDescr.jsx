import React from "react";

function HisDescr (){

    return (
        <>
        <div class="col-lg-8">
            <div class="row">
                <div class="col">
                    <div class="card shadow mb-3">
                        <div class="card-header py-3">
                            <p class="text-success m-0 fw-bold">Descripción</p>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="username"><strong>Lugar</strong></label></div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="email"><strong>Fecha</strong></label></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="first_name"><strong>Detalles</strong></label></div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="last_name"><strong>Testigos</strong></label></div>
                                    </div>
                                </div>
                                <div class="mb-3"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card shadow">
                    <div className="card-header py-3">
                        <p className="text-success m-0 fw-bold">Multas Previas</p>
                    </div>
                    <div className="card-body">
                        <div className="multa" style={{ borderBottom: '1px solid #ccc', padding: '5px 0' }}>
                        <p><strong>Multa de tráfico por exceso de velocidad</strong> <button className="btn btn-success btn-sm link-light detalles-btn" style={{ float: 'right' }}>Detalles</button></p>
                        </div>
                        <div className="multa" style={{ borderBottom: '1px solid #ccc', padding: '5px 0' }}>
                        <p><strong>Multa de estacionamiento indebido</strong> <button className="btn btn-success btn-sm link-light detalles-btn" style={{ float: 'right' }}>Detalles</button></p>
                        </div>
                        <div className="multa" style={{ borderBottom: '1px solid #ccc', padding: '5px 0' }}>
                        <p><strong>Multa por no llevar el cinturón de seguridad</strong> <button className="btn btn-success btn-sm link-light detalles-btn" style={{ float: 'right' }}>Detalles</button></p>
                        </div>
                        <div className="multa" style={{ borderBottom: '1px solid #ccc', padding: '5px 0' }}>
                        <p><strong>Multa por hablar por teléfono mientras se conduce</strong> <button className="btn btn-success btn-sm link-light detalles-btn" style={{ float: 'right' }}>Detalles</button></p>
                        </div>
                    </div>
            </div>
        </div>
        </>
    );
};

export default HisDescr;