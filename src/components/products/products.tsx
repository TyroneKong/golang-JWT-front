import useQueryProducts from "../../hooks/products";
import SearchInput from "../users/search-input/search-input";
import ProductsTable from "./table/products-table";
import { useState } from "react";
import ProductDrawer from "./product-drawer";
import { Center, Spinner } from "@chakra-ui/react";

function Products() {
  const { data, isLoading } = useQueryProducts();
  const [filtering, setFiltering] = useState("");

  return (
    <>
      <SearchInput filter={{ filtering, setFiltering }} />
      {isLoading ? (
     <Center h="300px">
     <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
   </Center>      ) : (
        <>
          <ProductsTable data={data} filter={{ filtering, setFiltering }} />
          <ProductDrawer />
        </>
      )}
    </>
  );
}

export default Products;
