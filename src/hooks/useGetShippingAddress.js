'use client'
import { useQuery } from "@tanstack/react-query";
import { getShippingAddress } from "@/api/user/getShippingAddress";

export const useGetShippingAddress = () => {
    const { data, isPending: isAddressPending, isError } = useQuery({
        queryKey: ["shipping-address"],
        queryFn: getShippingAddress,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
    });

    return { addressData: data, isAddressPending, isError }; 
};