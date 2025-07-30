import api from "@/lib/api";

export const getSingleProduct = async (id) => {
    try {
        const response = await api.get(`/product/get-single-product/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};