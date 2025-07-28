import api from "@/lib/api";


export const updateShippingAddress = async (addressData) => {
    try {
        const response = await api.patch("/shipping/create-update-shipping", addressData);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};