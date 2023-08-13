import { ReactNode, createContext, useContext } from "react";
import { useState } from "react";

type Child = {
  children: ReactNode;
};

type User = {
  authorized: boolean;
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
};
const user = createContext({} as User);

export const UserContextProvider = ({ children }: Child) => {
  const [authorized, setAuthorized] = useState(false);

  // test data
  const value = {
    authorized,
    setAuthorized,
  };

  return <user.Provider value={value}>{children}</user.Provider>;
};

const useUser = (): User => useContext(user);

export default useUser;
