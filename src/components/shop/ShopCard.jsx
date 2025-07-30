import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Loader2 } from "lucide-react";
import useAuthStore from "@/store/auth";
import { useWishlistStore } from "@/store/wishlistStore";

const ShopCard = ({ product, favouriteIds, handleWishlistClick }) => {

    const { isLoadingIds } = useWishlistStore();
    const isThisProductLoading = isLoadingIds.has(product?._id);

    const token = useAuthStore.getState().token;
    return (
        <div key={product._id} className="p-1">
            <div className="overflow-hidden relative">
                {/* Product Image */}
                <Link href={`/shop/${product?._id}`}>
                    <div className="relative w-full aspect-[5/6] flex items-center justify-center overflow-hidden">
                        <Image
                            src={product?.images[0]}
                            alt={"product image"}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            className="rounded-xl object-cover"
                        />
                    </div>
                </Link>
                {
                    token && (
                        <div className="absolute top-2 right-2 cursor-pointer" onClick={() => handleWishlistClick(product?._id)}>
                            {isThisProductLoading ? (
                                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                            ) : (
                                <Heart className={`w-6 h-6 text-primary ${favouriteIds.includes(product?._id) ? "fill-primary" : ""}`} />
                            )}
                        </div>
                    )
                }

                <div className="mt-4 px-2">
                    <h3 className="text-sm font-medium text-title line-clamp-1 mb-1">{product?.name}</h3>
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

export default ShopCard;
