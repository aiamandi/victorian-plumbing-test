import { useState, useEffect } from "react";
import type { Facet, Product } from "../types/types";
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
  filters: Record<string, string[]>;
  setFilters: (filters: Record<string, string[]>) => void;
}

export const useListings = (): UseListingsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [facets, setFacets] = useState<Facet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<Record<string, string[]>>({});


  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {

        const response = await fetchListings({
          query: "",
          pageNumber: page,
          size: 24,
          additionalPages: 9, 
          sort: 1,
          filters,
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
  }, [page, filters]);

  return {
    products,
    loading,
    error,
    page,
    totalPages: Math.ceil(total / 24),
    total,
    setPage,
    facets,
    filters,
    setFilters,
  };
};