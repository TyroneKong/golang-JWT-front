import { useQuery } from "react-query";
import axiosRequest from "../requests/requests";

const getProducts = async (signal?: AbortSignal) => {
  const { data } = await axiosRequest.get("/allProducts", { signal });
  return data;
};

const useQueryProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts(signal),
  });

export default useQueryProducts;
