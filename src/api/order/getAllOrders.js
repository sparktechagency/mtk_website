import api from "@/lib/api";

export const getAllOrders = async (page = 1) => {
    try {
        const response = await api.get(`/order/get-user-orders?page=${page}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}