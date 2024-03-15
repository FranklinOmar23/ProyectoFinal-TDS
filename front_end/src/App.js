import React from 'react';
import {Routes} from "react-router";
import {BrowserRouter, Route} from "react-router-dom";
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
import Placeholder from './Componentes/Placeholder';

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/olvidocontrasena" element={<Olvidocontrase />}/>
            <Route path="/registro" element={<Registro />}/>
            <Route path="/" element={<Login />}/>
            <Route path="/home-agente" element={<Home />}/>
            <Route path="/nuevamulta" element={<Nuevamulta />}/>
            <Route path="/perfil" element={<Perfil />}/>
            <Route path="/home-adm" element={<HomeAdm />}/>
            <Route path="/home-user" element={<HomeUser />}/>
            <Route path="/historial" element={<Historial />}/>
            <Route path="*" element={<Eror404 />}/>
            <Route path="/ph" element={<Placeholder />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
