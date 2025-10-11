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


export const checkoutWithPayNow = async () => {
    try {
        const response = await api.post("/order/create-order-with-paynow");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const createGooglePaymentIntent = async () => {
    try {
        const response = await api.post("/payment/create-google-payment-intent");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}