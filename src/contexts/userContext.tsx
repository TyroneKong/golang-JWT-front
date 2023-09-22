import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

// type Child = {
//   children: ReactNode;
// };

type User = {
  authorized: boolean;
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
};
const user = createContext({} as User);

export function UserContextProvider({ children }: PropsWithChildren) {
  const [authorized, setAuthorized] = useState(false);

  // test data
  const value = useMemo(
    () => ({
      authorized,
      setAuthorized,
    }),
    [authorized]
  );

  return <user.Provider value={value}>{children}</user.Provider>;
}

const useAuth = (): User => useContext(user);

export default useAuth;
