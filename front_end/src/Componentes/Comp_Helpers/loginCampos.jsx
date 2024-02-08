import React, { useState } from 'react';

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
    onLogin(e, cedula, password);
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
          name="password"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
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
