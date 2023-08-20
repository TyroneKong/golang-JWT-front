import { Input } from "@chakra-ui/react";
import { useState } from "react";
import UseQueryUsers from "../../hooks/users";
import Logout from "../logout";
import UserQueryCurrentUser from "../../hooks/current-user";
import UserTable from "./table/user-table";

function Users() {
  const { data } = UseQueryUsers();
  const [filtering, setFiltering] = useState("");

  UserQueryCurrentUser();

  return (
    <div>
      {data && (
        <>
          <Logout />
          <Input
            size="lg"
            value={filtering}
            placeholder="search by name"
            onChange={e => setFiltering(e.target.value)}
          />
          <UserTable data={data} filter={{ filtering, setFiltering }} />
        </>
      )}
    </div>
  );
}

export default Users;
