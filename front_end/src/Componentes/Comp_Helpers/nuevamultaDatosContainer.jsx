import React from "react";

function NmDatosCon () {

    return(
        <>
        <div class="card shadow mb-3">
            <div class="card-header py-3">
            <p class="text-success m-0 fw-bold">Datos</p>
            </div>
            <div class="card-body">
            <form>
            <div class="row">
                <div class="col">
                    <div class="mb-3"><label class="form-label" for="username"><strong>Nombre</strong></label><input class="form-control" type="text" id="username" placeholder="user.name" name="username" /></div>
                    </div>
                <div class="col">
                    <div class="mb-3"><label class="form-label" for="email"><strong>Placa</strong></label><input class="form-control" type="email" id="email" placeholder="user@example.com" name="email" /></div>
                    </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="mb-3"><label class="form-label" for="first_name"><strong>Matrícula</strong></label><input class="form-control" type="text" id="first_name" placeholder="John" name="first_name" /></div>
                </div>
                <div class="col">
                    <div class="mb-3"><label class="form-label" for="last_name"><strong>Vehículo</strong></label><input class="form-control" type="text" id="last_name" placeholder="Doe" name="last_name" /></div>
                </div>
                </div>
                    <div class="mb-3"><button class="btn btn-success btn-sm link-light" type="submit">Guardar</button></div>
            </form>
            </div>
        </div>
        </>
    );
}

export default NmDatosCon;