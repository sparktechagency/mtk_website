import api from "@/lib/api";

export const checkout = async () => {
    try {
        const response = await api.post("/order/create-order");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}