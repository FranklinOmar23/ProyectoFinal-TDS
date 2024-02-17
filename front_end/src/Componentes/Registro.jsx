import React, { useState } from 'react';
import RegistroCampos from "./Comp_Helpers/RegistroCampos";
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/animate.min.css";
import "../Css/registroestilo.css";
import "../Css/adicciones.css";
import toast, { Toaster } from 'react-hot-toast';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [cedula, setCedula] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !email || !contrasena || !confirmarContrasena) {
      toast.error('Por favor, complete todos los campos.');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      toast.error('Las contraseñas no coinciden.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    if (cedula.length !== 11) {
      toast.error('La cédula debe tener 11 dígitos.');
      return;
    }

    if (!validatePassword(contrasena)) {
      toast.error('La contraseña debe contener al menos un carácter especial.');
      return;
    }


    // Aquí iría la lógica para enviar la solicitud de registro al backend
    // Por ahora, solo mostraremos un mensaje de éxito
    toast.success('¡Registro exitoso! Redirigiendo a la página de inicio de sesión...');
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(password);
  };

  return (
    <div className="registro-background">
      <div className='bubbles'>
        {/* Toaster para mostrar notificaciones */}
        <Toaster
          toastOptions={{
            style: {
              height: '90px',
              width: '300px',
              fontSize: '16px',
            },
          }}
        />
        <div className=" container1 row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10 pulse animated">
            <div className="card shadow-lg o-hidden border-0 mt-5">
              <div className="card-body p-0">
                <div className="row container2">
                  {/* Imagen del logo */}
                  <div className="col-lg-5  d-lg-flex flex-column align-items-center">
                    <img className="image1 img-fluid m-auto" src="https://nizaero.com/wp-content/uploads/2018/07/Logo-DIGESETT-292x300.png" alt="Logo" />
                    <h2 className='h2'>DIGESETT</h2>
                    <h3 className=" h3 text-center">Sistema de gestion de transito</h3>
                  </div>
                  {/* Formulario de registro */}
                  <div className="col-lg-7">
                    <div className="p-5" style={{ background: 'var(--bs-card-border-color)' }}>
                      <div className="text-center">
                        <h4 className="text-dark mb-4">Regístrate</h4>
                      </div> {/* Aquí van los campos de registro (el formulario)*/}
                      <form onSubmit={handleSubmit} className="user">
                        {/* Campo para el Nombre */}
                        <div className="mb-3 row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input className="form-control form-control-user" type="text" id="nombre" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                          </div>
                          <div className="col-sm-6">
                            {/* Campo para la cédula */}
                            <input className="form-control form-control-user" type="text" id="cedula" placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
                          </div>
                        </div>
                        <div className="mb-3">
                          {/* Campo para el correo electrónico */}
                          <input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3 row">
                          {/* Campos para la contraseña*/}
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input className="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                          </div>
                          {/* Confirmacion de contraseña */}

                          <div className="col-sm-6">
                            <input className="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder="Confirmar contraseña" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} />
                          </div>
                        </div>
                        {/* Botón de registro */}
                        <button type="submit" className="btn btn-primary d-block btn-user w-100" style={{ background: 'var(--bs-emphasis-color)' }}>Registrarse</button>
                      </form>
                      {/* Campos para la redireccion de login y contraseña */}

                      <div className="text-center mt-3">
                        <p>¿Ya tienes una cuenta? <a href="/">Inicia sesión</a></p>
                        <p>¿Olvidaste tu contraseña? <a href="/olvidocontrasena">Recupérala aquí</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
    </div>
  );

}

export default Registro;