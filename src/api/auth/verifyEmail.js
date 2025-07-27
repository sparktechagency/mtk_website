import api from "@/lib/api";

export const verifyEmail = async (token) => {
  const response = await api.get(`/auth/verify-email?token=${token}`);
  return response?.data?.data;
}; 