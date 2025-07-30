import api from "@/lib/api";

export const deleteCartItem = async (id) => {
    try {
        const response = await api.delete(`/cart/delete-cart/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};