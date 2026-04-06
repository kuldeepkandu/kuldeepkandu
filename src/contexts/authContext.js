"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext({ isLoggedIn: false });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children, isLoggedIn }) {
  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}