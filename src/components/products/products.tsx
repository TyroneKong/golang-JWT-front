import useQueryProducts from "../../hooks/products";
import SearchInput from "../users/search-input/search-input";
import ProductsTable from "./table/products-table";
import { useState } from "react";
import ProductDrawer from "./product-drawer";

function Products() {
  const { data } = useQueryProducts();
  const [filtering, setFiltering] = useState("");

  return (
    <>
      <SearchInput filter={{ filtering, setFiltering }} />
      <ProductsTable data={data} filter={{ filtering, setFiltering }} />
      <ProductDrawer />
    </>
  );
}

export default Products;
