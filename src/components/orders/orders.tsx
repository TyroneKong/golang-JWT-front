import { useState } from "react";
import useGetOrderById from "../../hooks/orders";
import SearchInput from "../users/search-input/search-input";
import OrdersTable from "./orders-table";
import UserQueryCurrentUser from "../../hooks/current-user";
import { Spinner, Center } from "@chakra-ui/react";

const Orders = () => {
  const [filtering, setFiltering] = useState("");
  const { data: user } = UserQueryCurrentUser();

  const { data, isLoading } = useGetOrderById(user?.id);

  return (
    <>
      <SearchInput filter={{ filtering, setFiltering }} />
      {isLoading ? (
        <Center h="300px">
          <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
        </Center>
      ) : (
        <OrdersTable data={data} filter={{ filtering, setFiltering }} />
      )}
    </>
  );
};

export default Orders;
