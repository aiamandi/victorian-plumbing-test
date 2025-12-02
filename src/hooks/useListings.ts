 import { useState, useEffect } from "react";
import type { Product } from "../types/types";
import { fetchListings } from "../services/listings";

export interface UseListingsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const useListings = (): UseListingsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchListings({
          query: "",
          pageNumber: page,
          size: 24,
          additionalPages: 0,
          sort: 1,
        });

        setProducts(response.products || []);
        const total = response.pagination?.total || response.products?.length || 0;
        setTotalPages(Math.ceil(total / 24));
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch products";
        setError(message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page]);

  return {
    products,
    loading,
    error,
    page,
    totalPages,
    setPage,
  };
};