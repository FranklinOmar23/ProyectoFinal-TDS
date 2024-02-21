import React, { useState } from "react";
import OlvidocontraCampos from "./Comp_Helpers/olvidocontraCampos";
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/animate.min.css";
import "../Css/olvidocontraseestilo.css";
import toast, { Toaster } from 'react-hot-toast';
import { EnviarCorreo } from "../new_password";

function Olvidocontrase() {
    const [email, setEmail] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const generateRandomPassword = () => {
        const length = 8;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const handleResetPassword = () => {
        if (!validateEmail(email)) {
            toast.error('Por favor, ingrese un correo electrónico válido.');
            return;
        }
        
        const newPassword = generateRandomPassword();
        EnviarCorreo(email, newPassword);
        
    };

    return (
        <div className="olvidocontra-background">
            <Toaster 
                toastOptions={{
                    style: {
                        height: '90px',
                        width: '300px',
                        fontSize: '16px',
                    },
                }}
            />
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-12 col-xl-10 pulse animated">
                    <div className="card shadow-lg o-hidden border-0 my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-flex">
                                    <img className="m-auto" src="https://nizaero.com/wp-content/uploads/2018/07/Logo-DIGESETT-292x300.png" alt="Logo" />
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-5" style={{ background: 'var(--bs-card-border-color)' }}>
                                        <div className="text-center">
                                            <h4 className="text-dark mb-2">Se le olvidó la contraseña?</h4>
                                            <p className="mb-4">Lo entendemos, estas cosas pasan. Ingresa tu direccion de correo electrónico abajo y te enviaremos un enlace para restablecer la contraseña!</p>
                                        </div>
                                        <OlvidocontraCampos onSubmit={handleResetPassword} setEmail={setEmail} />
                                        <div className="text-center">
                                            <hr />
                                            <a className="link-body-emphasis small" href="/Registro">Crear una cuenta!</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="link-body-emphasis small" href="/Login">Ya estás registrado? Inicia Sesión!</a>
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
}

export default Olvidocontrase;