import { useQuery } from "react-query";
import { Usertype } from "../types/types";
import axiosRequest from "../requests/requests";

const getUsers = async (signal?: AbortSignal) => {
  const { data } = await axiosRequest.get<Usertype[]>(
    "/allusers",

    {
      signal,
    }
  );
  return data;
};

const UseQueryUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => getUsers(signal),
  });

export default UseQueryUsers;
