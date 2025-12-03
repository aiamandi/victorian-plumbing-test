import type { Product } from "../types/types";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  // I have seen that there are 4 stock statuses and based on experience, I assumed that O either means out of stock or 0 stock so I based my logic based on that
  const isOutOfStock = product.stockStatus?.status === "O";

  return (
    <div
      className={`border max-w-[300px] rounded-xl shadow-md max-h-max hover:shadow-xl transition-shadow duration-300 ${
        isOutOfStock ? "opacity-50 grayscale" : ""
      }`}
    >
      <div className="flex flex-col relative z-0 ">
        <img
          src={product.image.url}
          alt={product.image.attributes?.imageAltText || product.productName}
          className="w-full h-80 rounded-t-xl mb-4 relative z-0"
        />
        <div className="absolute z-100s flex h-full flex-row justify-between items-center w-full">
          <div className="h-full flex-col justify-between w-full">
            <div className="flex flex-row justify-between items-center mb-2 w-full mt-2 ml-2">
              <Heart
                size={24}
                onClick={() => setWishlisted(!wishlisted)}
                fill={wishlisted ? "red" : "none"}
              />
              {product.reviewsCount > 0 ? (
                <p className="text-xs mr-4 bg-gray-900 text-white px-2 py-1 rounded-xl">
                  {product.averageRating} / 5 score based on{" "}
                  {product.reviewsCount} reviews
                </p>
              ) : (
                <p className="text-xs mr-4 bg-gray-900 text-white px-2 py-1 rounded-xl">
                  No reviews yet
                </p>
              )}
            </div>

            <img
              className="mt-60 h-8"
              src={product.brand.brandImage?.url}
              alt={product.productName}
            />
          </div>
        </div>
        {isOutOfStock && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold z-10">
            The product is currently out of stock
          </div>
        )}
      </div>

      <div className="px-2 py-4">
        <h3 className="font-semibold text-sm">{product.productName}</h3>
        <p>{product.brand.name}</p>

        <div className="flex justify-end items-center">
          <p className="text-base font-semibold">
            £{product.price.priceIncTax.toFixed(2)}
          </p>
          <button
            className={`flex flex-row justify-between items-center mt-2 ml-2 p-3 ${
              !isOutOfStock
                ? "bg-green-600 hover:bg-gray-900"
                : "bg-gray-400 cursor-not-allowed"
            } text-white text-xs rounded-3xl`}
            disabled={isOutOfStock}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
