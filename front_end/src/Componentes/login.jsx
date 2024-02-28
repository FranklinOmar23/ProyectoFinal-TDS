import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginCampos from './Comp_Helpers/loginCampos';
import '../Css/Footer-Dark-icons.css';
import '../Css/sidebar-menu.css';
import '../Css/animate.min.css';
import '../Css/loginestilo.css';
import '../Css/adicciones.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import BurbujasAnim from './Comp_Helpers/BurbujasAnim';
import { useAuth } from '../context/provider';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  
  const handleLogin = async (userData) => {
    try {
      const response = await axios.post('http://localhost:4000/login', userData);
      console.log(response.data);

      // Obtener el rol del usuario desde la respuesta del backend
      const { role } = response.data.user;

      // Redirigir al usuario según su rol
      switch (role) {
        case 'USUARIO':
          navigate('/home-user');
          break;
        case 'AGENTE':
          navigate('/home-agente');
          break;
        case 'ADMINISTRADOR':
          navigate('/home-adm');
          break;
        default:
          // Redirigir a una vista por defecto en caso de un rol desconocido
          navigate('/');
      }
        //CARGARE EL CONTEXT
        loginUser(response.data);
        console.log('Usuario después de iniciar sesión:', response.data);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      toast.error("Error al iniciar sesión, por favor verifica tus credenciales e intenta de nuevo.");
    }
  };
  return (
<div className="login-background">
      <div class="bubbles">
        <Toaster
          toastOptions={{
            style: {
              height: '90px',
              width: '300px',
              fontSize: '16px',
            },
          }}
        />
        <div className="container-fluid" style={{ minHeight: '100vh' }}>
          <div className="container1 pulse animated">
            <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
              <div className="col-md-9 col-lg-12 col-xl-10">
                <div className="card shadow-lg o-hidden border-0 my-5">
                  <div className="card-body p-0">
                    <div className="row container3">
                      <div className="col-lg-6 d-lg-flex flex-column align-items-center">
                        <img
                          className="img-fluid m-auto justify-content-t ima"
                          src="https://nizaero.com/wp-content/uploads/2018/07/Logo-DIGESETT-292x300.png"
                          alt="Logo"
                        />
                        <h2 >DIGESETT</h2>
                        <h3 className="text-center">Sistema de gestion de transito</h3>
                      </div>
                      <div className="col-lg-6">
                        <div className="p-5" style={{ background: 'var(--bs-card-border-color)' }}>
                          <div className="text-center">
                            <h4 className="text-dark mb-4">¡Bienvenido!</h4>
                          </div>
                          <LoginCampos onLogin={handleLogin} />
                          <div className="text-center">
                            <Link to="/olvidocontrasena" className="link-body-emphasis small">
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
        <BurbujasAnim />
      </div>
    </div>

  );
};

export default Login;
