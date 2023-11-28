import { useQuery } from "@tanstack/react-query";

import axiosRequest from "../requests/requests";
import { Usertype } from "../types/types";

const getCurrentUser = async (signal?: AbortSignal) => {
  const response = await axiosRequest.get<Usertype>("/currentuser", {
    signal,
  });
  return response.data;
};

const UserQueryCurrentUser = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: ({ signal }) => getCurrentUser(signal),
  });

export default UserQueryCurrentUser;
