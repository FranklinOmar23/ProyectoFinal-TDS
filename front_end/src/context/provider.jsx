import React, {useContext, useState } from 'react';
import Context from "./context";


export const Provider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [multa, setMulta] = useState(() => {
    const storedMulta = localStorage.getItem('multa');
    return storedMulta ? JSON.parse(storedMulta) : null;
  });
  const [requerimiento,setRequerimiento]= useState(()=>{
    const storedRequerimiento = localStorage.getItem('requerimiento');
    return storedRequerimiento ? JSON.parse(storedRequerimiento): null;

  })

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  const cargarRequerimientos = (requerimientoData)=>{
    setRequerimiento(requerimientoData);
    localStorage.setItem('requerimiento',JSON.stringify(requerimientoData))
  }

  const cargarMultas = (multasData) => {
    // Utiliza setMulta para actualizar el estado de multa
    setMulta(multasData);
    localStorage.setItem('multa', JSON.stringify(multasData));
  };
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('messages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const addMessage = (message) => {
    const newMessages = [...messages, message];
    setMessages(newMessages);
    localStorage.setItem('messages', JSON.stringify(newMessages));
  };


  return (
    <Context.Provider value={{ user, loginUser, logoutUser, multa, cargarMultas, requerimiento, cargarRequerimientos}}>
      {children}
    </Context.Provider>
  );
}

export const useAuth = () => {
  return useContext(Context);
};