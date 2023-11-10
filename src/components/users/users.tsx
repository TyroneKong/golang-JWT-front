import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import UseQueryUsers from "../../hooks/users";
import Logout from "../logout";
import SearchInput from "./search-input/search-input";
import UserQueryCurrentUser from "../../hooks/current-user";
import UserTable from "./table/user-table";
import Welcome from "../welcome";

function Users() {
  const { data } = UseQueryUsers();
  const [filtering, setFiltering] = useState("");

  const { data: user, isLoading } = UserQueryCurrentUser();
  return (
    <div>
      {data && (
        <>
          <Welcome as="h1">Welcome {user.name}</Welcome>
          <Logout />
          <SearchInput filter={{ filtering, setFiltering }} />
          {isLoading ? (
            <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
          ) : (
            <UserTable data={data} filter={{ filtering, setFiltering }} />
          )}
        </>
      )}
    </div>
  );
}

export default Users;
