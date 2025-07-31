"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const TrendingProductCard = ({ product, favouriteIds, isLoading, token }) => {
    const queryClient = useQueryClient();
    const { toggleFavouriteProduct } = useWishlistStore();

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        if (!token) {
            toast.error("Please login to add product to wishlist.");
            return;
        }
        toggleFavouriteProduct(product._id, queryClient);
    };

    return (
        <div className="p-1">
            <div className="overflow-hidden relative">
                {/* Product Image */}
                <Link href={`/shop/${product._id}`}>
                    <div className="relative w-full aspect-[5/6] flex items-center justify-center overflow-hidden">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            className="rounded-xl object-cover"
                        />
                    </div>
                </Link>
                <div
                    className="absolute top-2 right-2 z-10 bg-primary/10 backdrop-blur-xs rounded-full p-2 cursor-pointer"
                    onClick={handleWishlistClick}
                >
                    <Heart className={`w-6 h-6 text-primary ${favouriteIds.includes(product._id) ? "fill-primary" : ""} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} />
                </div>

                <div className="mt-4 px-2">
                    <Link href={`/shop/${product._id}`}>
                        <h3 className="text-sm font-medium text-title line-clamp-1 mb-1 hover:underline">{product.name}</h3>
                    </Link>
                    <div className="flex justify-between items-center">
                        <div className="flex items-baseline space-x-2 mb-2">
                            <span className="text-lg font-semibold text-title">${product?.currentPrice}</span>
                            {product.originalPrice > 0 && (
                                <span className="text-sm text-subtitle line-through">
                                    ${product?.originalPrice}
                                </span>
                            )}
                        </div>
                        <p className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 text-primary" />
                            {product?.ratings}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingProductCard;