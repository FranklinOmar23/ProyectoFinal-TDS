import React from 'react';
import {Routes} from "react-router";
import {BrowserRouter, Route} from "react-router-dom";
import Olvidocontrase from './Componentes/olvidocontrase';

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/Olvidocontra" element={<Olvidocontrase />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
