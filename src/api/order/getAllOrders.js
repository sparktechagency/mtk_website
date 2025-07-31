import api from "@/lib/api";

export const getAllOrders = async () => {
    try {
        const response = await api.get("/order/get-user-orders");
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}