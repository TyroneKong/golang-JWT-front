import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Button size="lg" variant="solid" colorScheme="blue" onClick={handleLogout}>
      Log out
    </Button>
  );
}

export default Logout;
