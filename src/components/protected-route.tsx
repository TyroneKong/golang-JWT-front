import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../contexts/userContext";

type Props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const { authorized } = useUser();
  console.log("authorized", authorized);

  if (!authorized) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
