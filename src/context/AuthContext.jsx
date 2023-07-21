import { createContext, useContext } from "react";
import Auth from "../service/firebase/auth";
import UserRepository from "../service/firebase/user-repository";

const AuthContext = createContext();

const auth = new Auth(new UserRepository());

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
