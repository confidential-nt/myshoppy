import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [uid, setUserId] = useState();
  const { auth } = useAuthContext();

  useEffect(() => {
    auth.onStateChange((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, [auth]);

  const logUserIn = (uid) => {
    setUserId(uid);
  };

  return (
    <UserContext.Provider
      value={{
        uid,
        logUserIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
