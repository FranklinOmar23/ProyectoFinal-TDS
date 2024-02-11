import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginCampos from './Comp_Helpers/loginCampos';
import '../Css/Footer-Dark-icons.css';
import '../Css/sidebar-menu.css';
import '../Css/animate.min.css';
import '../Css/loginestilo.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
  const handleLogin = async (userData) => {
    try {
      // Validar que los campos no estén vacíos y que la cédula tenga al menos 11 caracteres
      /*if (!userData.cedula || !userData.contrasena || userData.cedula.length < 11) {
        throw new Error('Por favor, completa todos los campos y asegúrate de que la cédula tenga al menos 11 caracteres');
      }*/

      const response = await axios.post('http://localhost:4000/login', userData);
      console.log(response.data);
      toast.success('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Mostrar el mensaje de error al usuario
      toast.error(error.message);
    }
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
                        <Link to="/olvidoClave" className="link-body-emphasis small">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link to="/registro" className="link-body-emphasis small">
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
