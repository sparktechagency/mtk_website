import { create } from 'zustand';
import api from '@/lib/api';

const useWebsiteInfoStore = create((set) => ({
  info: null,
  loading: false,
  error: null,
  fetchInfo: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/information/get-information');
      set({ info: response.data.data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useWebsiteInfoStore;