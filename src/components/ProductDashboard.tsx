import { useListings } from "../hooks/useListings";
import { Filters } from "./ProductFilters";
import { ProductCard } from "./ProductCard";

export const ProductDashboard = () => {
  const { products, loading, page, totalPages, setPage, facets, filters, setFilters, total } = useListings();

  const handleFilterChange = (newFilters: Record<string, string[]>) => {
    setFilters(newFilters);
    setPage(0);
  };

  const filteredProducts = products.filter((p) => {
    if (!filters || Object.keys(filters).length === 0) return true;

    const matchFacet = (facetId: string, values: string[]) => {
      if (!values || values.length === 0) return true;
      switch (facetId) {
        case "brands": {
          const brandName = p.brand?.name?.toLowerCase();
          return values.some((v) => v.toLowerCase() === brandName);
        }
        case "categories": {
          const categorySlug = p.defaultCategory?.slug?.toLowerCase();
          return values.some((v) => v.toLowerCase() === categorySlug);
        }
        case "isOnPromotion": {
          const promoStr = p.price?.isOnPromotion ? "true" : "false";
          return values.includes(promoStr);
        }
        case "prices": {
          const price = p.price?.priceIncTax ?? p.price?.priceExcTax ?? 0;
          return values.some((range: any) => {
       
            if (range && typeof range === "object") {
              const min = typeof range.gte === "number" ? range.gte : Number.NEGATIVE_INFINITY;
              const max = typeof range.lte === "number" ? range.lte : Number.POSITIVE_INFINITY;
              return price >= min && price <= max;
            }

            const str = String(range);
            const s = str.replace(/[^0-9\-]/g, "");
            const [minStr, maxStr] = s.split("-");
            const min = minStr ? parseFloat(minStr) : Number.NEGATIVE_INFINITY;
            const max = maxStr ? parseFloat(maxStr) : Number.POSITIVE_INFINITY;
            return price >= min && price <= max;
          });
        }
        default: {

          const bag = [
            p.productName?.toLowerCase?.() ?? "",
            p.brand?.name?.toLowerCase?.() ?? "",
            p.defaultCategory?.slug?.toLowerCase?.() ?? "",
          ];
          return values.some((v) => bag.includes(v.toLowerCase()));
        }
      }
    };

    return Object.entries(filters).every(([facetId, vals]) => matchFacet(facetId, vals));
  });

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>
      
      <div className="flex gap-6">
        <Filters
          facets={facets}
          selectedFilters={filters}
          onChange={handleFilterChange}
        />

        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-4">
            {filteredProducts.length} products on this page{total ? ` • ${total} total` : ""}
          </p>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading products…</p>
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">No products found</p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page + 1 >= totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
