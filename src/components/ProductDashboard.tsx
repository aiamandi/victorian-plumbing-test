import { useListings } from "../hooks/useListings";
import { Filters } from "./ProductFilters";
import { ProductCard } from "./ProductCard";
import type { AppliedFacets, SortOptionValue } from "../types/types";
import { SortOption } from "../types/types";

export const ProductDashboard = () => {
  const { 
    products, 
    loading, 
    page, 
    totalPages, 
    setPage, 
    facets, 
    appliedFacets, 
    setAppliedFacets, 
    total,
    query,
    setQuery,
    sort,
    setSort
  } = useListings();

  const handleFilterChange = (newFilters: AppliedFacets) => {
    setAppliedFacets(newFilters);
    setPage(0); 
  };

  const handleSortChange = (newSort: number) => {
    setSort(newSort as SortOptionValue);
    setPage(0); 
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Shop our latest range of products</h1>
      <div className="mb-6 flex gap-4 items-center">
        <div className="flex-1">
          <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our product range"
            className="w-full px-3 py-2 border rounded-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700"
          />
        </div>
        <div className="w-64">
          <select
            id="sort"
            value={sort}
            onChange={(e) => handleSortChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-green-700 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700"
          >
            <option value={SortOption.Recommended}>Recommended</option>
            <option value={SortOption.PriceLowToHigh}>Price: Low to High</option>
            <option value={SortOption.PriceHighToLow}>Price: High to Low</option>
            <option value={SortOption.LargestDiscount}>Largest Discount</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        <Filters
          facets={facets}
          selectedFilters={appliedFacets}
          onChange={handleFilterChange}
        />

        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-4">
            {products.length} products on this page{total ? ` • ${total} total` : ""}
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
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mt-8 flex-col md:flex-row">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                  className="px-4 py-2 bg-green-700 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page + 1 >= totalPages}
                  className="px-4 py-2 bg-green-700 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
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
