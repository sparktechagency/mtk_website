import api from "@/lib/api";

export const verifyOTP = async (credential) => {
    try {
        const response = await api.post("/auth/forgot-pass-verify-otp", credential);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};