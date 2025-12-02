import { useListings } from "../hooks/useListings";
import { ProductCard } from "./ProductCard";

export const ProductDashboard = () => {

  const { products, loading } = useListings();


  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>
      <div className="p-8 grid grid-cols-3 gap-4">
        {loading && <p>Loading products…</p>}
        {!loading &&
          products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
