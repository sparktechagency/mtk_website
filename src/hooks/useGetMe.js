"use client";
import { getMe } from "@/api/user/getMe";
import useAuthStore from "@/store/auth";
import { useQuery } from "@tanstack/react-query";


export const useGetMe = () => {
    const token = useAuthStore((state) => state.token);

    const { data: user, isPending: isUserPending, isLoading: isUserLoading, isError: isUserError, isFetching: isUserFetching } = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        enabled: !!token,
    });

    return { user, isUserPending, isUserLoading, isUserError, isUserFetching };
}