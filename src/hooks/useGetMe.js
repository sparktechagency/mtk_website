"use client";
import { getMe } from "@/api/user/getMe";
import useAuthStore from "@/store/auth";
import { useQuery } from "@tanstack/react-query";


export const useGetMe = () => {
    const token = useAuthStore((state) => state.token);

    const { data: user, isPending, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        enabled: !!token,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    });

    return { user, isPending, isLoading, isError };
}