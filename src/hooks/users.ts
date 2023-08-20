import axios from "axios";
import { useQuery } from "react-query";
import { Response, Usertype } from "../types/types";

const getUsers = async (signal?: AbortSignal) => {
  const { data } = await axios.get<Response<Usertype>>(
    "http://localhost:8080/allusers",
    {
      signal,
    }
  );
  return data.data;
};

const UseQueryUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => getUsers(signal),
  });
};

export default UseQueryUsers;
