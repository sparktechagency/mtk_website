import api from "@/lib/api";

export const sendMessage = async (data) => {
    try {
        const response = await api.post("/contact/create-contact", data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};