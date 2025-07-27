import api from "@/lib/api";

export const getMe = async () => {
  const response = await api.get("/user/get-me");
  return response.data.data;
}; 