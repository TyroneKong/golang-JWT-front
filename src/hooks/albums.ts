import { useQuery } from "react-query";
import { Albums } from "../types/types";
import { axiosRequest } from "../requests/requests";
import useToken from "./token";

const getAlbums = async (token, signal?: AbortSignal) => {
  const response = await axiosRequest.get<Albums[]>("/albums", {
    headers: { Authorization: `Bearer ${token}` },
    signal,
  });
  return response.data;
};

const UseQueryAlbums = () => {
  const { token } = useToken();
  return useQuery({
    queryKey: ["albums"],
    queryFn: ({ signal }) => getAlbums(token, signal),
  });
};

export default UseQueryAlbums;
