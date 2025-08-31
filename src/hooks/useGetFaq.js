
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export const useGetFaq = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["faq"],
        queryFn: () => api.get("/faq/get-user-faqs"),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
    });

    const FAQs = data?.data?.data || [];
    return { FAQs, isLoading, isError };
}