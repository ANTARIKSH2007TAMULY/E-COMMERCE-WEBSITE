import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => (
  <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
    {products.map((product) => (
      <ProductCard key={product.sourceKey || product.id} product={product} />
    ))}
  </section>
);

export default ProductGrid;
