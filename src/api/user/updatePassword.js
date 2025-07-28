import api from "@/lib/api";


export const updatePassword = async (password) => {
    try {
        const response = await api.patch("/auth/change-password", password);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};