import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/api/product/getCart';

import useAuthStore from '@/store/auth';

const useInitializeCart = () => {
  const token = useAuthStore((state) => state.token);

  const { data: cartData, isLoading, isError, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: !!token,
  });

  return { cartData, isLoading, isError, refetchCart: refetch };
};

export default useInitializeCart;

