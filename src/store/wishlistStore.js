import { create } from 'zustand';
import { toggleFavourite } from '@/api/product/toggleFavourite';
import { toast } from 'sonner';

export const useWishlistStore = create(() => ({
    toggleFavouriteProduct: async (productId, queryClient) => {
        const previousFavouriteIdsData = queryClient.getQueryData(["favouriteIds"]);
        const previousWishlistData = queryClient.getQueryData(["wishlist"]);

        // Optimistically update the UI for favouriteIds
        queryClient.setQueryData(["favouriteIds"], (old) => {
            const currentIds = new Set(old?.data?.data || []);
            if (currentIds.has(productId)) {
                currentIds.delete(productId);
            } else {
                currentIds.add(productId);
            }
            return { data: { data: Array.from(currentIds) } };
        });

        // Optimistically update the UI for wishlist
        queryClient.setQueryData(["wishlist"], (old) => {
            if (!old || !old.data || !old.data.data) return old;

            const currentProducts = old.data.data;
            const isCurrentlyFavorite = currentProducts.some(p => p._id === productId);

            let newProducts;
            if (isCurrentlyFavorite) {
                newProducts = currentProducts.filter(p => p._id !== productId);
            } else {
                // If adding, we don't have the full product data here, so we'll rely on re-fetch
                // For now, we'll just keep the old list and let invalidateQueries handle it.
                // A more advanced optimistic update would require passing the full product object.
                newProducts = currentProducts;
            }
            return { ...old, data: { ...old.data, data: newProducts } };
        });

        try {
            const response = await toggleFavourite({ productId });

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
            // Rollback to the previous value for favouriteIds
            queryClient.setQueryData(["favouriteIds"], previousFavouriteIdsData);
            // Rollback to the previous value for wishlist
            queryClient.setQueryData(["wishlist"], previousWishlistData);
        } finally {
            queryClient.invalidateQueries({ queryKey: ["favouriteIds"] });
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        }
    },
}));