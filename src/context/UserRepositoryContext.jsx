import { createContext, useContext } from "react";
import UserRepository from "../service/firebase/user-repository";

export const UserRepositoryContext = createContext();
const userRepository = new UserRepository();

export function UserRepositoryProvider({ children }) {
  return (
    <UserRepositoryContext.Provider value={{ userRepository }}>
      {children}
    </UserRepositoryContext.Provider>
  );
}

export const useUserRepositoryContext = () => useContext(UserRepositoryContext);
