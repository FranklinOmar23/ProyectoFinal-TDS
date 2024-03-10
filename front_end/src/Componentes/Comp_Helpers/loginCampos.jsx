import React, { useState } from 'react';
import "../../Css/perfil.css";

const LoginCampos = ({ onLogin }) => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeCedula = (e) => {
    setCedula(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCredentials = {
      cedula,
      contrasena: password // Corrección aquí
    };

    onLogin(userCredentials); // Envía los datos al componente padre para el manejo del inicio de sesión
  };

  return (
    <form className="user" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          className="form-control form-control-user"
          type="text"
          placeholder="Introduzca su número de cédula"
          name="cedula"
          value={cedula}
          onChange={handleChangeCedula}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control form-control-user"
          type="password"
          placeholder="Introduzca su contraseña"
          name="contrasena" // Corrección aquí
          value={password}
          onChange={handleChangePassword}
        /><i class="fa-solid fa-eye"></i>
        <i class="fa-solid fa-eye-slash"></i>
      </div>
      {/*
      <div className="mb-3">
        <div className="custom-control custom-checkbox small">
          <input
            className="form-check-input custom-control-input"
            type="checkbox"
            id="formCheck-1"
          />
          <label className="form-check-label custom-control-label" htmlFor="formCheck-1">
            Recuérdame
          </label>
        </div>
      </div>
      */}
      <button
        className="btn btn-primary d-block btn-user w-100"
        type="submit"
        style={{ background: 'var(--bs-emphasis-color)' }}
      >
        Iniciar Sesión
      </button>
      <hr />
    </form>
  );
};

export default LoginCampos;
