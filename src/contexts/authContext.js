"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ isLoggedIn: false });

export const useAuth = () => useContext(AuthContext);

/**
 * Reads the `token` cookie on the client to determine auth state.
 * No server dependency — works with static export (output: 'export').
 */
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}