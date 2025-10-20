import api from "@/lib/api";

export const checkoutWithStripe = async () => {
    try {
        const response = await api.post("/order/create-order-with-stripe");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
