import api from "@/lib/api";


export const updateProfile = async (profileData) => {
    try {
        const response = await api.patch("/user/edit-my-profile", profileData);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};