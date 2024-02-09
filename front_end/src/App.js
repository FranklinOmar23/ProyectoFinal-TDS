import React from 'react';
import {Routes} from "react-router";
import {BrowserRouter, Route} from "react-router-dom";
import Olvidocontrase from './Componentes/olvidocontrase';
import Registro from './Componentes/Registro';
import Home from './Componentes/Home';


function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/Olvidocontra" element={<Olvidocontrase />}/>
            <Route path="/Registro" element={<Registro />}/>
            <Route path="/Home" element={<Home />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
