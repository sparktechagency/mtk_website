import api from "@/lib/api";

export const getShippingAddress = async () => {
    try {
        const response = await api.get("/shipping/get-shipping-address");
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};