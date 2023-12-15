import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../contexts/userContext";
import { Roles } from "../enum/enum";

type Props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const { role } = useUser();

  if (role !== Roles.Admin) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
