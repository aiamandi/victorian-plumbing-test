export interface Coverage {
  Type: string;
  Unit: string;
  Value: number;
}

export interface Attributes {
  isFreeWaste?: boolean;
  isBestSeller?: boolean;
  isShortProjection?: boolean;
  isEco?: boolean;
  hasMoreOptions?: boolean;
  shouldPreSelect?: boolean;
  variationListingLabel?: string;
  productDisplayNameLineOne?: string;
  productDisplayNameLineTwo?: string;
  quantityPerPack?: number;
  coveragePerPack?: Coverage;
  isPremium?: boolean;
  isFreeTap?: boolean;

}
export interface Brand {
  brandImage?: Image;
  externalId: string;
  name: string;
  slug: string;
}

export interface Ancestor {
 depth: number;
 externalId: string;
 name: string;
 slug: string;
}

export interface Category {
  ancestors: Ancestor[];
  externalId: string;
  isDefault: boolean;
  name: string;
  slug: string;
}

export interface Image {
  attributes?: {
    imageAltText?: string;
  };
  externalId: string;
  isDefault: boolean;
  priority: number;
  url: string;
}

export interface Price {
    currencyCode: string;
    isOnPromotion: boolean;
    priceExcTax: number;
    priceIncTax: number;
    wasPriceIncTax?: number;
    wasPriceExcTax?: number;
    discountPercentage?: number;
    monthlyFinanceEstimate?: number;
}

export interface Stock {
  status: "G" | "V" | "O" | "L" | string; 
}

export interface Product {
  attributes: Attributes;
  averageRating: number;
  brand: Brand;
  defaultCategory: Category;
  id: string;
  legacyId?: string;
  legacyVariantId?: string;
  cultureCode: string;
  isDefaultVariant: boolean;
  price: Price;
  productName: string;
  reviewsCount: number;
  questionsCount: number;
  score: number;
  sku: string;
  slug: string;
  stockStatus: Stock;
  image: Image;
}

export interface FacetOption {
  displayValue: string;
  identifier: string
  priority: number;
  productCount: number;
  value: string
}

export interface Facet {
  displayName: string;
  facetType: number;
  identifier: string;
  priority: number;
  options: FacetOption[];
}

export interface PriceRangeValue {
  gte?: number;
  lte?: number;
}

export interface FacetFilter {
  identifier: string;
  value: string | PriceRangeValue;
}

export type AppliedFacets = Record<string, FacetFilter[]>;

export const SortOption = {
  Recommended: 1,
  PriceLowToHigh: 2,
  PriceHighToLow: 3,
  LargestDiscount: 4,
} as const;

export type SortOptionValue = typeof SortOption[keyof typeof SortOption];