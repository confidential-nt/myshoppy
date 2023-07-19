import { createContext, useContext } from "react";
import Auth from "../service/firebase/auth";

const AuthContext = createContext();

const auth = new Auth();

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
