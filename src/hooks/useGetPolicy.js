'use client'
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useGetPolicy = (policyType) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["policy", policyType],
        queryFn: () => api.get(`/policy/get-policy-by-type/${policyType}`),
        enabled: !!policyType,
    });

    return { policy: data?.data?.data, isLoading, isError }; 
};