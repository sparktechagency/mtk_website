import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/api/product/getCart';
import useCartStore from '@/store/cartStore';
import { useEffect } from 'react';
import useAuthStore from '@/store/auth';

const useCart = () => {
  const token = useAuthStore.getState().token;
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: !!token
  });

  const { setCart } = useCartStore(); 

  useEffect(() => {
    if (data) {
      setCart(data);
    }
  }, [data, setCart]);

  return { cart: data, isLoading, isError, refetch };
};

export default useCart;
