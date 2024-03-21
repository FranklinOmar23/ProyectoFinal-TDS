import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Olvidocontrase from './Componentes/olvidocontrase';
import Registro from './Componentes/Registro';
import Login from './Componentes/login';
import Home from './Componentes/Home';
import Nuevamulta from './Componentes/Nuevamulta';
import Perfil from './Componentes/perfil';
import HomeAdm from './Componentes/home-adm';
import HomeUser from './Componentes/home-usuario';
import Historial from './Componentes/Historial';
import Eror404 from './Componentes/Error404';
import Nuevomsg from './Componentes/Nuevomensaje';
import Placeholder from './Componentes/Placeholder';
import { useAuth } from './context/provider';

function App() {
  const { user } = useAuth();
  if (user === null || user.user === null) {
    return (
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/olvidocontrasena" element={<Olvidocontrase />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Login />} />
        {user.user.role === 'AGENTE' && <Route path="/home-agente" element={<Home />} />}
        {user.user.role === 'ADMINISTRADOR' && <Route path="/home-adm" element={<HomeAdm />} />}
        {user.user.role === 'USUARIO' && <Route path="/home-user" element={<HomeUser />} />}
        {user.user.role === 'AGENTE' && <Route path="/nuevamulta" element={<Nuevamulta />} />}
        {(user.user.role === 'ADMINISTRADOR' || user.user.role === 'AGENTE' || user.user.role === 'USUARIO') && <Route path="/perfil" element={<Perfil />} />}
        {user.user.role === 'AGENTE' && <Route path="/historial" element={<Historial />} />}
        {user.user.role === 'ADMINISTRADOR' && <Route path="/notificaciones" element={<Nuevomsg />} />}
        <Route path="*" element={<Eror404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;