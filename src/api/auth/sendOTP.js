import api from "@/lib/api";

export const sendOTP = async (email) => {
    try {
        const response = await api.post(`/auth/forgot-pass-send-otp`, { email });
        localStorage.setItem("tempEmailForOTPVerification", email);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};