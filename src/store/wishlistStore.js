import { create } from 'zustand';
import { toggleFavourite } from '@/api/product/toggleFavourite';
import { toast } from 'sonner';

export const useWishlistStore = create((set) => ({
    isLoadingIds: new Set(),

    toggleFavouriteProduct: async (productId, queryClient) => {
        set((state) => ({
            isLoadingIds: new Set(state.isLoadingIds).add(productId)
        }));

        try {
            const response = await toggleFavourite({ productId });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            queryClient.invalidateQueries({ queryKey: ["favouriteIds"] });

            if (response?.message?.includes("Added")) {
                toast.success("Product added to wishlist successfully.");
            } else if (response?.message?.includes("Removed")) {
                toast.success("Product removed from wishlist successfully.");
            } else {
                toast.success("Wishlist updated successfully.");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update wishlist.");
            console.error("Error toggling favourite:", error);
        } finally {
            set((state) => {
                const newSet = new Set(state.isLoadingIds);
                newSet.delete(productId);
                return { isLoadingIds: newSet };
            });
        }
    },
}));