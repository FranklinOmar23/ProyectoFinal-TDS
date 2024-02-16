import React from 'react';
import {Routes} from "react-router";
import {BrowserRouter, Route} from "react-router-dom";
import Olvidocontrase from './Componentes/olvidocontrase';
import Registro from './Componentes/Registro';
<<<<<<< HEAD
import Login from './Componentes/login';
=======
import Home from './Componentes/Home';

>>>>>>> ysa

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/Olvidocontra" element={<Olvidocontrase />}/>
            <Route path="/Registro" element={<Registro />}/>
<<<<<<< HEAD
            <Route path="/Login" element={<Login />}/>
=======
            <Route path="/Home" element={<Home />}/>
>>>>>>> ysa
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
