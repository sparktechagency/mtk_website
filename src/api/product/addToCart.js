import api from "@/lib/api";

export const addToCart = async (data) => {
    try {
        const response = await api.post("/cart/create-cart", data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};