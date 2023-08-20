import { useQuery } from "react-query";
import axiosRequest from "../requests/requests";

const getCurrentUser = async (signal?: AbortSignal) => {
  const response = await axiosRequest.get("/currentuser", {
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
