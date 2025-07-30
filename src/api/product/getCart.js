import api from "@/lib/api";

export const getCart = async () => {
    try {
        const response = await api.get("/cart/get-carts");
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};