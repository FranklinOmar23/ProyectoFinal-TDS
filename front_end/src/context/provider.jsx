import React, { useContext, useState } from 'react';
import Context from "./context";
import axios from 'axios';

export const Provider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [multa, setMulta] = useState(() => {
    const storedMulta = localStorage.getItem('multa');
    return storedMulta ? JSON.parse(storedMulta) : null;
  });
  const [requerimiento, setRequerimiento] = useState(() => {
    const storedRequerimiento = localStorage.getItem('requerimiento');
    return storedRequerimiento ? JSON.parse(storedRequerimiento) : null;
  });
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  const cargarRequerimientos = (requerimientoData) => {
    setRequerimiento(requerimientoData);
    localStorage.setItem('requerimiento', JSON.stringify(requerimientoData));
  };

  const cargarMultas = (multasData) => {
    setMulta(multasData); 
    localStorage.setItem('multa', JSON.stringify(multasData)); 
  };
  
  const actualizarMulta = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser.user.id);
      if (parsedUser.user.id) {
        const multaResponse = await axios.post('http://localhost:4000/multaAgente', { id_agente: parsedUser.user.id });
        const multaAgente = multaResponse.data;
        cargarMultas(multaAgente); 
        localStorage.setItem('multa', JSON.stringify(multaAgente));
      } else {
        console.error('ID de usuario no encontrado en la respuesta');
      }
    } catch (error) {
      console.error('Error al actualizar el contexto:', error);
    }
  };
  const ActualizarRequerimientos = async ()=>{
    try {
      const requerimientoResponse = await axios.get('http://localhost:4000/requerimiento');
      const requerimientoData = requerimientoResponse.data;
      setRequerimiento(requerimientoData);
      localStorage.setItem('requerimiento', JSON.stringify(requerimientoData));
      
    } catch (error) {
      console.log("Error al actualizar el Requerimiento")
    }
  }

  return (
    <Context.Provider value={{ user, loginUser, logoutUser, multa, cargarMultas, requerimiento, cargarRequerimientos, actualizarMulta, ActualizarRequerimientos}}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  return useContext(Context);
};
