
import api from "@/lib/api";

export const getAllProducts = async (params) => {
    try {
        const response = await api.get(`/product/get-user-products?${params}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};