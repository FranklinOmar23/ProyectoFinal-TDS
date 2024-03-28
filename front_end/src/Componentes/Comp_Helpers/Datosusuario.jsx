import React from "react";
import personaimg from "../../persona.jpg"
import carImage from "../../carroprovisionalMulta.jpg";


function DatosUse() {

    return(
      <>
      <div class="card-group">
        <div class="card shadow mb-3">
            <div class="card-body">
                <div className="card-header py-3">
                <h4
                        class="card-title"
                        style={{color: 'var(--bs-emphasis-color)'}}
                      >
                        Datos del Usuario
                      </h4>
                </div>
                <div class="card-body">
                <form className= 'mt-4'>
                    <div className="row mb-3 multalist">
                        <div className="col">
                            <label className="form-label"><strong>Nombre:</strong></label>
                            <p>Nombre</p>
                        </div>
                        <div className="col">
                            <label className="form-label"><strong>Cedula:</strong></label>
                            <p>Cedula</p>
                        </div>
                    </div>
                    <div className="row mb-3 multalist">
                        <div className="col">
                            <label className="form-label"><strong>Telefono:</strong></label>
                            <p>Telefono</p>
                        </div>
                        <div className="col">
                            <label className="form-label"><strong>Correo:</strong></label>
                            <p>Correo</p>
                        </div>
                    </div>
                </form>
                <button
                class="btn btn-primary mx-auto"
                type="button"
                style={{background: 'rgb(4, 131, 55)', borderColor: 'rgb(4, 131, 55)'}}
                >
                Editar
                </button>
            </div>
            </div>
            </div>
            <div class="card shadow mb-3">
            <div className="card-body">
            <div className='row justify-content-start'>
            <div className='col-md-4 fotoper'>
                <h4 className="card-title text-center" style={{ color: 'var(--bs-emphasis-color)', fontSize: '22px'}}>
                Foto de Perfil
                </h4>
                <img src={personaimg} className="rounded" style={{ marginBottom: '10px', height:'200px', width: '200px' }} />
            </div>

            <div className='col-md-4 fotocar'>
                <h4 className="card-title text-center" style={{ color: 'var(--bs-emphasis-color)', fontSize: '22px' }}>
                Foto del Vehículo
                </h4>
                <img src={carImage} className="rounded" style={{ marginBottom: '10px', height:'200px', width: '200px' }} />
            </div>
            </div>
            </div>
            </div>
     </div>

      </>   
    );
}

export default DatosUse;