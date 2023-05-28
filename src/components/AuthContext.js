import React, { createContext, useState, useEffect } from "react";
import http from "../http-common";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user" || null))
  );

  const login = async (data) => {
    const res = await http.post("/login", data);
    setCurrentUser(res.data.user);
  };

  const signUp = async (data) => {
    await http.post("/signUp", data);
  };

  const logout = async () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
