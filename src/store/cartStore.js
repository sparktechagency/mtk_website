import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: null,
  isLoading: true, // Set initial loading state to true
  isError: false,
  setCart: (cart) => set({ cart, isLoading: false, isError: false }),
  setLoading: () => set({ isLoading: true, isError: false }),
  setError: () => set({ isLoading: false, isError: true }),
  clearCart: () => set({ cart: null }),
}));

export default useCartStore; 