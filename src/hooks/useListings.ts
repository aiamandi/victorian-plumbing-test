import { useState, useEffect } from "react";
import type { Facet, Product, AppliedFacets, SortOptionValue } from "../types/types";
import { SortOption } from "../types/types";
import { fetchListings } from "../services/listings";

export interface UseListingsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  total: number;
  setPage: (page: number) => void;
  facets: Facet[];
  appliedFacets: AppliedFacets;
  setAppliedFacets: (facets: AppliedFacets) => void;
  query: string;
  setQuery: (query: string) => void;
  sort: SortOptionValue;
  setSort: (sort: SortOptionValue) => void;
}

export const useListings = (): UseListingsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [facets, setFacets] = useState<Facet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [appliedFacets, setAppliedFacets] = useState<AppliedFacets>({});
  const [query, setQuery] = useState(""); 
  const [sort, setSort] = useState<SortOptionValue>(SortOption.Recommended);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchListings({
          query,
          pageNumber: page,
          size: 24,
          additionalPages: 0, 
          sort,
          facets: Object.keys(appliedFacets).length > 0 ? appliedFacets : undefined,
        });

        setProducts(response.products || []);
        setFacets(Array.isArray(response.facets) ? response.facets : []);
        const totalCount = response.pagination?.total || response.products?.length || 0;
        setTotal(totalCount);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch products";
        setError(message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, appliedFacets, query, sort]);

  return {
    products,
    loading,
    error,
    page,
    totalPages: Math.ceil(total / 24),
    total,
    setPage,
    facets,
    appliedFacets,
    setAppliedFacets,
    query,
    setQuery,
    sort,
    setSort,
  };
};