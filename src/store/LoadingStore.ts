import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useIsLoadingStore = create<LoadingState>((set, get) => {
  return {
    isLoading: false,
    setIsLoading: (isLoading) => {
      set({ isLoading: isLoading });
    },
  };
});
export default useIsLoadingStore;
