import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/api/product/getCart';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/auth';

const useInitializeCart = () => {
  const token = useAuthStore((state) => state.token);
  const { setLoading, setCart, setError } = useCartStore();

  const { refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      setLoading();
      try {
        const cartData = await getCart();
        setCart(cartData);
        return cartData;
      } catch (error) {
        setError();
        throw error;
      }
    },
    enabled: !!token,
  });

  return { refetchCart: refetch };
};

export default useInitializeCart;

