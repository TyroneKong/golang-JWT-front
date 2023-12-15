import { useState } from "react";
import { Button, Spinner, VStack } from "@chakra-ui/react";
import UseQueryUsers from "../../hooks/users";
import Logout from "../logout";
import SearchInput from "./search-input/search-input";
import UserQueryCurrentUser from "../../hooks/current-user";
import UserTable from "./table/user-table";
import Welcome from "../welcome";
import { useNavigate } from "react-router-dom";
import useUser from "../../contexts/userContext";
import { Roles } from "../../enum/enum";

function Users() {
  const { data } = UseQueryUsers();
  const [filtering, setFiltering] = useState("");
  const { isLoading } = UserQueryCurrentUser();
  const { role, name } = useUser();
  const navigate = useNavigate();

  return (
    <div>
      {data && (
        <VStack>
          <Welcome as="h1">Welcome {name}</Welcome>
          <Logout />
          {role === Roles.Admin && (
            <Button
              size="lg"
              colorScheme="purple"
              onClick={() => navigate("/products")}
            >
              Products
            </Button>
          )}

          <Button
            size="lg"
            colorScheme="yellow"
            onClick={() => navigate("/orders")}
          >
            Orders
          </Button>
          <SearchInput filter={{ filtering, setFiltering }} />
          {isLoading ? (
            <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
          ) : (
            <UserTable data={data} filter={{ filtering, setFiltering }} />
          )}
        </VStack>
      )}
    </div>
  );
}

export default Users;
