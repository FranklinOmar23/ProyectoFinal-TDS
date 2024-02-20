import React, {useContext, useState } from 'react';
import Context from "./context";


export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
  };
  const logoutUser = () => {
    setUser(null);
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
