"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { verifyAuth } from "../services/auth.api";

const AuthContext = createContext({ isLoggedIn: false });

export const useAuth = () => useContext(AuthContext);

/**
 * Verifies auth session through backend API.
 */
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyAuth();
        setIsLoggedIn(!!response?.success);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}