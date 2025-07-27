import api from "@/lib/api";

export const setNewPassword = async (credential) => {
    try {
        const response = await api.post("/auth/forgot-pass-create-new-pass", credential);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};