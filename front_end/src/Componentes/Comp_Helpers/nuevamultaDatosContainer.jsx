import React from "react";

function NmDatosCon ({nombre}) {

    return(
        <>
        <div className="card shadow mb-3">
            <div className="card-header py-3">
            <p className="text-success m-0 fw-bold">Datos</p>
            </div>
            <div className="card-body">
            <form>
            <div className="row">
                <div className="col">
                    <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Nombre</strong></label>
                    <input className="form-control" type="text" id="username" placeholder="user.name" name="username" value={nombre} readOnly /></div>
                    </div>
                <div className="col">
                    <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Placa</strong></label><input className="form-control" type="email" id="email" placeholder="user@example.com" name="email" /></div>
                    </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>Matrícula</strong></label><input className="form-control" type="text" id="first_name" placeholder="John" name="first_name" /></div>
                </div>
                <div className="col">
                    <div className="mb-3"><label className="form-label" htmlFor="last_name"><strong>Vehículo</strong></label><input className="form-control" type="text" id="last_name" placeholder="Doe" name="last_name" /></div>
                </div>
                </div>
                    <div className="mb-3"><button className="btn btn-success btn-sm link-light" type="submit">Guardar</button></div>
            </form>
            </div>
        </div>
        </>
    );
}

export default NmDatosCon;