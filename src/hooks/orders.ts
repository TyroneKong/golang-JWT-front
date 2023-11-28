import { useQuery } from "@tanstack/react-query";
import axiosRequest from "../requests/requests";

const getOrderById = async (id: number, signal?: AbortSignal) => {
  const response = await axiosRequest.get(`/orders/user/${id}`, { signal });

  return response.data;
};

const useGetOrderById = (id: number | undefined) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: ({ signal }) => getOrderById(id as number, signal),
  });
};

export default useGetOrderById;
