import api from "@/lib/api";

export const register = async (credentials) => {
  const response = await api.post("/auth/register", credentials);
  return response.data;
};
