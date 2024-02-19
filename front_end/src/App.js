import React from 'react';
import {Routes} from "react-router";
import {BrowserRouter, Route} from "react-router-dom";
import Olvidocontrase from './Componentes/olvidocontrase';
import Registro from './Componentes/Registro';
import Login from './Componentes/login';
import Home from './Componentes/Home';
import Nuevamulta from './Componentes/Nuevamulta';


function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/olvidocontrasena" element={<Olvidocontrase />}/>
            <Route path="/registro" element={<Registro />}/>
            <Route path="/" element={<Login />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/nuevamulta" element={<Nuevamulta />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
