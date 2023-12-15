import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axiosRequest from "../requests/requests";

function Logout() {
  const navigate = useNavigate();

  const logout = async () => {
    await axiosRequest.get("/logout");

    return navigate("/", { replace: true });
  };

  const handleLogout = () => logout();

  return (
    <Button size="lg" variant="solid" colorScheme="blue" onClick={handleLogout}>
      Log out
    </Button>
  );
}

export default Logout;
