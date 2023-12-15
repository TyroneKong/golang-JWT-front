import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import UserQueryCurrentUser from "../hooks/current-user";
import { Usertype } from "../types/types";

// type Child = {
//   children: ReactNode;
// };

const userContext = createContext({} as Usertype);

export function UserContextProvider({ children }: PropsWithChildren) {
  const { data: user } = UserQueryCurrentUser();

  // test data

  const value = useMemo(
    () => ({
      ...user!,
    }),
    [user]
  );

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

const useUser = (): Usertype => {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("user context needs to wrapped in a provider");
  }
  return context;
};

export default useUser;
