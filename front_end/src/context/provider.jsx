import React, {useContext, useState } from 'react';
import Context from "./context";


export const Provider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };



   
    return (
        <Context.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </Context.Provider>
    )
}

export const useAuth = () => {
  return useContext(Context);
};
