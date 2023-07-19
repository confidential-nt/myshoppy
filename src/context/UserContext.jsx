import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  const { auth } = useAuthContext();

  useEffect(() => {
    auth.onStateChange(setUser);
  }, [auth]);

  const logUserIn = (uid) => {
    setUser(uid);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        logUserIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
