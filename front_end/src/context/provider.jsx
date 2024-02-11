import React from "react";
import Context from "./context";


const provider = ({ children }) => {
    //aqui hay q llamarlos datos de los repositorios
    const data = {

    };
    return (
        <provider.Provider value={data}>
            {children}
        </provider.Provider>
    )
}
export default provider;

//aqui voy a dejar un ejemplode como consumirlo

/*
imagina que esta es otra vista xd

import React, { useContext } from 'react';
import Context from './context';

const MiComponenteConsumidor = () => {
  const datosCompartidos = useContext(Context);

  return (
    <div>
  /*    {/* Utiliza los datos compartidos }*/
     // </div>
    //  );
   // };
  // export default MiComponenteConsumidor;