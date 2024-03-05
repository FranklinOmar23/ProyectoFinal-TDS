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

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const cargarMultas = (multasData) => {
    // Utiliza setMulta para actualizar el estado de multa
    setMulta(multasData);
    localStorage.setItem('multa', JSON.stringify(multasData));
  };

  return (
    <Context.Provider value={{ user, loginUser, logoutUser, multa, cargarMultas }}>
      {children}
    </Context.Provider>
  );
}

export const useAuth = () => {
  return useContext(Context);
};
