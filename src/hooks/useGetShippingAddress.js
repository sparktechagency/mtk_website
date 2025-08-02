'use client'
import { useQuery } from "@tanstack/react-query";
import { getShippingAddress } from "@/api/user/getShippingAddress";

export const useGetShippingAddress = () => {
    const { data, isPending: isAddressPending, isError } = useQuery({
        queryKey: ["shipping-address"],
        queryFn: getShippingAddress,
    });

    return { addressData: data, isAddressPending, isError }; 
};