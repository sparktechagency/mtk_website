import { create } from 'zustand';
import { toggleFavourite } from '@/api/product/toggleFavourite';
import { toast } from 'sonner';

export const useWishlistStore = create(() => ({
    toggleFavouriteProduct: async (productId, queryClient) => {
        try {
            const response = await toggleFavourite({ productId });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["wishlist"] }); // Invalidate wishlist query as well

            if (response?.message?.includes("Added")) {
                toast.success("Product added to wishlist successfully.");
            } else if (response?.message?.includes("Removed")) {
                toast.success("Product removed from wishlist successfully.");
            } else {
                toast.success("Wishlist updated successfully.");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update wishlist.");
        }
    },
}));
