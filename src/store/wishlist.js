import { create } from 'zustand';

const useWishlistStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (itemId) => set((state) => ({ items: state.items.filter((item) => item.id !== itemId) })),
  clearWishlist: () => set({ items: [] }),
}));

export default useWishlistStore;
