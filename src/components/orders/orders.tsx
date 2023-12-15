import { useState } from "react";
import useGetOrderById from "../../hooks/orders";
import SearchInput from "../users/search-input/search-input";
import OrdersTable from "./orders-table";
import UserQueryCurrentUser from "../../hooks/current-user";

const Orders = () => {
  const [filtering, setFiltering] = useState("");
  const { data: user } = UserQueryCurrentUser();

  const { data } = useGetOrderById(user?.id);

  console.log("length of orders", data?.length);

  return (
    <>
      <SearchInput filter={{ filtering, setFiltering }} />
      <OrdersTable data={data} filter={{ filtering, setFiltering }} />
    </>
  );
};

export default Orders;
