import api from "@/lib/api";

export const submitReview = async (reviewData) => {
    try {
        const response = await api.post("/review/create-review", reviewData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};