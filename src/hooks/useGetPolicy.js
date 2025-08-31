'use client'
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useGetPolicy = (policyType) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["policy", policyType],
        queryFn: () => api.get(`/policy/get-policy-by-type/${policyType}`),
        enabled: !!policyType,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
    });

    return { policy: data?.data?.data, isLoading, isError };
};