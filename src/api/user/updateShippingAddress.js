import api from "@/lib/api";


export const updateShippingAddress = async (updateData) => {
    try {
        const response = await api.patch("/shipping/create-update-shipping", updateData);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};