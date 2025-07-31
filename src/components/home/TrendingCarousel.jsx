"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import TrendingProductCard from "./TrendingProductCard";
import useAuthStore from "@/store/auth";
import PageLayout from "../layout/PageLayout";

const TrendingCarousel = () => {
  const token = useAuthStore.getState().token;

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/product/get-user-products"),
  });
  const products = data?.data?.data || [];

  const { data: favouriteIdsResponse, isLoading: isLoadingFavouriteIds } = useQuery({
    queryKey: ["favouriteIds"],
    queryFn: () => api.get("/favourite/get-favourite-ids"),
    enabled: !!token,
  });
  const favouriteIds = favouriteIdsResponse?.data?.data || [];

  return (
    <div>
      <PageLayout>
        {/* Section Header */}
        <div className="mb-8 md:pt-10">
          <h2 className="text-2xl sm:text-4xl font-medium text-title tracking-tight">
            Trending Products
          </h2>
        </div>

        {isLoading ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 7 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <div className="overflow-hidden relative">
                      <Skeleton className="relative w-full aspect-[5/6] rounded-xl" />
                      <div className="mt-4 px-2">
                        <Skeleton className="h-4 w-3/4 mb-1" />
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-6 w-1/3" />
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {products?.slice(0, 7).map((product) => (
                <CarouselItem key={product?._id} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <TrendingProductCard
                    product={product}
                    favouriteIds={favouriteIds}
                    isLoading={isLoadingFavouriteIds}
                    token={token}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        )}
      </PageLayout>
    </div>
  );
};

export default TrendingCarousel;