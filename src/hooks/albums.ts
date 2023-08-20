import { useQuery } from "react-query";
import { Albums } from "../types/types";
import axiosRequest from "../requests/requests";
import useToken from "./token";

const getAlbums = async (token: string, signal?: AbortSignal) => {
  const { data } = await axiosRequest.get<Albums[]>("/albums", {
    headers: { Authorization: `Bearer ${token}` },
    signal,
  });
  return data;
};

const UseQueryAlbums = () => {
  const { token } = useToken();
  return useQuery({
    queryKey: ["albums"],
    queryFn: ({ signal }) => getAlbums(token as string, signal),
  });
};

export default UseQueryAlbums;
