"use client";

import SimpleHero from "@/components/common/SimpleHero";
import PageLayout from "@/components/layout/PageLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useWishlistStore } from "@/store/wishlistStore";
import { Skeleton } from "@/components/ui/skeleton";
import Lottie from "lottie-react";
import emptyAnimation from "../../../../../public/lottie/empty.json";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";

const Wishlist = () => {
    const { toggleFavouriteProduct } = useWishlistStore();
    const queryClient = useQueryClient();

    const { data: wishlistResponse, isLoading: wishlistLoading } = useQuery({
        queryKey: ["wishlist"],
        queryFn: () => api.get("/favourite/get-favourite-list"),
    });

    const favoriteProducts = wishlistResponse?.data?.data || [];
    const totalProducts = wishlistResponse?.data?.meta?.total || 0;

    const heroLinks = [
        { name: "Home", href: "/" },
        { name: "Favorite", isCurrent: true }
    ];
    const handleWishlistClick = (productId) => {
        toggleFavouriteProduct(productId, queryClient);
    };

    return (
        <div className="min-h-minus-header">
            <SimpleHero title="Favorite" links={heroLinks} />

            <PageLayout>
                {
                    favoriteProducts.length > 0 && (
                        <div className="text-subtitle mb-4">
                            Showing {totalProducts} results
                        </div>
                    )
                }
                {wishlistLoading ? (
                    <>
                        <div className="text-subtitle mb-4">
                            <Skeleton className="h-4 w-1/9" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="border rounded-md p-4">
                                    <Skeleton className="h-60 w-full mb-4" />
                                    <Skeleton className="h-4 w-3/4 mb-2" />
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-4 w-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    favoriteProducts.length === 0 ? (
                        <div className="flex flex-col gap-2 items-center justify-center h-[70%] text-subtitle text-lg col-span-full">
                            <Lottie animationData={emptyAnimation} loop={true} style={{ width: 400, height: 400, }} />
                            <p>No favorite products found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {favoriteProducts.map((product) => (
                                <div key={product?._id} className="p-1">
                                    <div className="overflow-hidden relative">
                                        {/* Product Image */}
                                        <Link href={`/shop/${product?._id}`}>
                                            <div className="relative w-full aspect-[5/6] flex items-center justify-center overflow-hidden">
                                                <Image
                                                    src={product?.images[0]}
                                                    alt={product?.name}
                                                    fill
                                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                                    className="rounded-xl object-cover"
                                                />
                                            </div>
                                        </Link>
                                        <div
                                            className="absolute top-2 right-2 z-10 bg-primary/10 backdrop-blur-xs rounded-full p-2 cursor-pointer"
                                            onClick={() => handleWishlistClick(product?._id)}
                                        >
                                            <Heart className={`w-6 h-6 text-primary ${product?.isFavourite ? "fill-primary" : ""}`} />
                                        </div>

                                        <div className="mt-4 px-2">
                                            <h3 className="text-sm font-medium text-title line-clamp-1 mb-1">{product?.name}</h3>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-baseline space-x-2 mb-2">
                                                    <span className="text-lg font-semibold text-title">${product?.currentPrice}</span>
                                                    {product?.originalPrice > 0 && (
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
                            ))}
                        </div>
                    )
                )}
            </PageLayout>
        </div>
    );
};

export default Wishlist;