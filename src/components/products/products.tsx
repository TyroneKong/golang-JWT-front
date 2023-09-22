import useQueryProducts from "../../hooks/products";

function Products() {
  const { data } = useQueryProducts();

  return <div>products</div>;
}

export default Products;
