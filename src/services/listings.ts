import axios from "axios";
import type { Product } from "../types/types";

const API_BASE_URL =
  "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings";
const API_KEY = "yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI";

export interface ListingsRequest {
  query: string;
  pageNumber: number;
  size: number;
  additionalPages: number;
  sort: number;
  filters?: Record<string, string | number | boolean | Array<string | number>>;
}

export interface ListingsResponse {
  products: Product[];
  pagination?: {
    page: number;
    size: number;
    total: number;
  };
  facets?: Record<string, unknown>;
}

export async function fetchListings(
  request: ListingsRequest,
  signal?: AbortSignal
): Promise<ListingsResponse> {
  const response = await axios.post<ListingsResponse>(
    `${API_BASE_URL}?apikey=${API_KEY}`,
    {
      query: request.query,
      pageNumber: request.pageNumber,
      size: request.size,
      additionalPages: request.additionalPages,
      sort: request.sort,
      ...(request.filters && { filters: request.filters }),
    },
    {
      signal,
    }
  );

  return response.data;
}