import api from "@/lib/api";

export const toggleFavourite = async (data) => {
    try {
        const response = await api.post("/favourite/add-or-remove-favourite", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};