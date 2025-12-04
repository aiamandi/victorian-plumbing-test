import axios from "axios";
import type { Product, Facet, AppliedFacets, SortOptionValue } from "../types/types";

const API_BASE_URL =
  import.meta.env.API_BASE_URL || "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings";
const API_KEY = import.meta.env.API_KEY || "yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI";

export interface ListingsRequest {
  query: string;
  pageNumber: number;
  size: number;
  additionalPages: number;
  sort: SortOptionValue;
  facets?: AppliedFacets;
}

export interface ListingsResponse {
  products: Product[];
  pagination?: {
    page: number;
    size: number;
    total: number;
  };
  facets?: Facet[];
}

export async function fetchListings(
  request: ListingsRequest,
  signal?: AbortSignal
): Promise<ListingsResponse> {
  const requestBody: Record<string, unknown> = {
    query: request.query,
    pageNumber: request.pageNumber,
    size: request.size,
    additionalPages: request.additionalPages,
    sort: request.sort,
  };

  if (request.facets && Object.keys(request.facets).length > 0) {
    requestBody.facets = request.facets;
  }

  const response = await axios.post<ListingsResponse>(
    `${API_BASE_URL}?apikey=${API_KEY}`,
    requestBody,
    {
      signal,
    }
  );

  return response.data;
}
