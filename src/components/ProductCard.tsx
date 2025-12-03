import type { Product } from "../types/types";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="border max-w-[300px] rounded-xl shadow-md max-h-max hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col relative z-0">
        <img
          src={product.image.url}
          alt={product.image.attributes?.imageAltText || product.productName}
          className="w-full h-80 rounded-t-xl mb-4 relative z-0"
        />
        <div className="absolute z-100s flex flex-row justify-between items-center top-2 left-2 w-full">
          <Heart
            size={24}
            onClick={() => setWishlisted(!wishlisted)}
            fill={wishlisted ? "red" : "none"}
          />
          <p className="text-xs mr-4 bg-gray-900 text-white px-2 py-1 rounded-xl">
            {product.averageRating} / 5 score based on {product.reviewsCount}{" "}
            reviews
          </p>
        </div>
      </div>

      <div className="px-2 py-4">
        <h3 className="font-semibold text-sm">{product.productName}</h3>
        <p>{product.brand.name}</p>
        <img src={product.brand.brandImage?.url} alt={product.productName} />

        <div className="flex justify-end items-center">
          <p className="text-base font-semibold">£{product.price.priceIncTax.toFixed(2)}</p>
          <button className=" flex flex-row justify-between items-center mt-2 ml-2 p-3 bg-green-600 text-white text-xs rounded-3xl hover:bg-gray-900">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
