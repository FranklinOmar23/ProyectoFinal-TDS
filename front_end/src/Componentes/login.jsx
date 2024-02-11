import React from 'react';
import { Link } from 'react-router-dom';
import LoginCampos from './Comp_Helpers/loginCampos';
import '../Css/Footer-Dark-icons.css';
import '../Css/sidebar-menu.css';
import '../Css/animate.min.css';
import '../Css/loginestilo.css';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const validateInputs = (cedula, password) => {
    // Validar que no haya campos vacíos
    if (!cedula || !password) {
      toast.error('Por favor, completa todos los campos.');
      return false;
    }

    // Eliminar guiones de la cédula y validar que tenga 11 dígitos
    const cedulaWithoutDashes = cedula.replace(/-/g, '');
    if (cedulaWithoutDashes.length !== 11) {
      toast.error('La cédula debe tener 11 dígitos.');
      return false;
    }

    // Validar que la contraseña inicie con mayúscula y tenga al menos un carácter especial
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    if (!passwordRegex.test(password)) {
      toast.error('La contraseña debe iniciar con mayúscula y contener al menos un carácter especial.');
      return false;
    }

    return true;
  };

  const handleLogin = (e, cedula, password) => {
    e.preventDefault();

    // Validación de campos
    if (!validateInputs(cedula, password)) {
      return;
    }

    // Simulación de lógica de inicio de sesión exitoso
    toast.success('Inicio de sesión exitoso.');
  };

  return (
    <div className="login-background">
      <Toaster 
        toastOptions={{
          style: {
            height: '90px',
            width: '300px',
            fontSize: '16px',
          },
        }}
      />
      <div className="container pulse animated">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-flex">
                    <img
                      className="img-fluid m-auto"
                      src="https://nizaero.com/wp-content/uploads/2018/07/Logo-DIGESETT-292x300.png"
                      alt="Logo"
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5" style={{ background: 'var(--bs-card-border-color)' }}>
                      <div className="text-center">
                        <h4 className="text-dark mb-4">¡Bienvenido!</h4>
                      </div>
                      <LoginCampos onLogin={handleLogin} />
                      <div className="text-center">
                        <Link to="/Olvidocontra" className="link-body-emphasis small">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link to="/Registro" className="link-body-emphasis small">
                          ¡Crea tu cuenta!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
