'use client'
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/shop/details/StarRating";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Heart, Loader2, Check } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import useAuthStore from "@/store/auth";
import { toast } from "sonner";

const ProductInfo = ({ product, selectedSize, selectedColor, quantity, handleQuantityChange, handleAddToCart, setSelectedSize, setSelectedColor, isAddToCartLoading, setMainImage }) => {

    const token = useAuthStore.getState().token;
    const { data: favouriteIdsResponse } = useQuery({
        queryKey: ["favouriteIds"],
        queryFn: () => api.get("/favourite/get-favourite-ids"),
        enabled: !!token
    })
    const favouriteIds = favouriteIdsResponse?.data?.data || [];

    const { isLoadingIds, toggleFavouriteProduct } = useWishlistStore();
    const handleToggleFavourite = () => {
        if (!token) {
            toast.error("Please login to add product to wishlist.");
            return;
        }
        toggleFavouriteProduct(product?._id, queryClient);
    }
    const queryClient = useQueryClient();
    const isThisProductLoading = isLoadingIds.has(product?._id);
    return (
        <div className="space-y-4">
            {/* Price and Title */}
            <div className="flex flex-col gap-2">
                {product?.discount && (
                    <Badge variant="outline" className="rounded-full text-sm font-medium text-green-600 border-green-600 px-2 py-1">
                        {product.discount}
                    </Badge>
                )}
                <h1 className="text-2xl md:text-3xl font-bold text-title">{product?.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                    <span
                        className={`px-2 py-1 text-sm rounded
                             ${product?.stockStatus === "in_stock"
                                ? "text-green-600 bg-green-100"
                                : product?.stockStatus === "stock_out"
                                    ? "text-red-500 bg-red-50"
                                    : "text-yellow-600 bg-yellow-100"
                            }`}
                    >
                        {
                            product?.stockStatus === "in_stock"
                                ? "In Stock"
                                : product?.stockStatus === "stock_out"
                                    ? "Out of Stock"
                                    : "Upcoming"
                        }
                    </span>

                    <StarRating rating={product?.ratings} starClassName="size-4" />
                    <span className="text-sm text-subtitle">({product?.totalReview} Reviews)</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xl md:text-2xl font-bold text-title">${product?.currentPrice?.toFixed(2)}</span>
                    {product?.originalPrice > 0 && (
                        <span className="text-base text-subtitle line-through">${product?.originalPrice?.toFixed(2)}</span>
                    )}
                </div>
            </div>

            <Separator />

            {/* Short Description */}
            <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: product?.introduction || "" }}
            />

            <Separator />

            {product?.colors && product.colors.length > 0 && (
                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-subtitle">Choose a color</h3>
                    <div className="flex items-center gap-2">
                        {product.colors.map((color) => {
                            const isSelected = selectedColor === color.name;
                            return (
                                <div
                                    key={color.name}
                                    className={cn(
                                        "relative size-8 rounded-full border-2 cursor-pointer transition-all duration-200",
                                        isSelected ? "border-gray-400 scale-110" : "border-gray-200 hover:scale-105"
                                    )}
                                    style={{ backgroundColor: color.hexCode }}
                                    onClick={() => {
                                        setSelectedColor(color.name);
                                        const fullImage = product.images.find(image => image.includes(color.name.toLowerCase()));
                                        if (fullImage) {
                                            setMainImage(fullImage); 
                                        }
                                    }}
                                    title={color.name}
                                >
                                    {isSelected && (
                                        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-0.5 flex items-center justify-center bg-black/40 rounded-full">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Size Selection */}
            {product?.sizes && product.sizes.length > 0 && (
                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-subtitle">Size</h3>
                    <div className="flex items-center gap-2">
                        {product.sizes.map((size) => (
                            <Button
                                key={size.size}
                                variant={selectedSize === size.size ? "default" : "outline"}
                                size="sm"
                                className={cn(
                                    "rounded-md px-4 py-2 text-sm",
                                    selectedSize === size.size ? "bg-primary/20 hover:bg-primary/20 text-primary" : "text-subtitle hover:bg-gray-100"
                                )}
                                onClick={() => setSelectedSize(size.size)}
                            >
                                {size.size}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity Selector and Add to Cart */}
            <div className="flex items-center gap-4 mt-6"> 
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                    <Button variant="outline" className={cn("border-0 border-r rounded-none")} size="icon" onClick={() => handleQuantityChange("decrement")}>
                        <Minus className="size-4" />
                    </Button>
                    <span className="px-4 text-lg font-medium">{quantity}</span>
                    <Button variant="outline" className={cn("border-0 border-l rounded-none")} size="icon" onClick={() => handleQuantityChange("increment")}>
                        <Plus className="size-4" />
                    </Button>
                </div>
                <div className="text-lg font-semibold text-title">
                    ${(product?.currentPrice * quantity)?.toFixed(2)}
                </div>
                <Button onClick={() => handleAddToCart(product, quantity, selectedColor, selectedSize)} className="flex-1 font-medium rounded-md shadow-md">
                    {isAddToCartLoading ? (
                        <><Loader2 className="w-6 h-6 animate-spin" /> Adding</>
                    ) : (
                        <>
                            <ShoppingCart className="size-5 mr-2" />
                            Add To Cart
                        </>
                    )}

                </Button>
                <Button onClick={handleToggleFavourite} variant="outline" size="icon" className="rounded-md hover:bg-gray-100">
                    {isThisProductLoading ? (
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    ) : (
                        <Heart className={`w-6 h-6 text-primary ${favouriteIds.includes(product?._id) ? "fill-primary" : ""}`} />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default ProductInfo;