"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useWishlistStore } from "@/store/wishlistStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import useAuthStore from "@/store/auth";
import SimilarProductCard from "./SimilarProductCard";
import api from "@/lib/api";
import useAuthStore from "@/store/auth";

const SimilarProducts = ({ relatedProducts }) => {
  const token = useAuthStore.getState().token;
  const queryClient = useQueryClient();
  const { toggleFavouriteProduct, isLoadingIds } = useWishlistStore();
  // const token = useAuthStore((state) => state.token);

  const { data: favouriteIdsResponse } = useQuery({
    queryKey: ["favouriteIds"],
    queryFn: () => api.get("/favourite/get-favourite-ids"),
    enabled: !!token
  })
  const favouriteIds = favouriteIdsResponse?.data?.data || [];

  const handleWishlistClick = (productId) => {
    toggleFavouriteProduct(productId, queryClient);
  };

  return (
    <div className="mt-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-4xl font-medium text-title tracking-tight">
          Similar Products
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {relatedProducts?.map((product) => (
            <CarouselItem key={product?._id} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
              <SimilarProductCard
                product={product}
                favouriteIds={favouriteIds}
                isLoading={isLoadingIds?.has(product?._id)}
                handleWishlistClick={handleWishlistClick}
                token={token}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        { relatedProducts?.length > 4 && <div>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </div>}
      </Carousel>
    </div>
  );
};

export default SimilarProducts;

