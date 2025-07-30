import api from "@/lib/api";

export const updateCartItem = async ({ id, quantity }) => {
    try {
        const response = await api.patch(`/cart/update-cart/${id}`, { quantity });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};