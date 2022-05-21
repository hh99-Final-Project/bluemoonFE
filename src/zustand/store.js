import create from "zustand";

const useStore = create((set) => ({
    currentHeader: "홈",
    isHeaderMenuOpen: false,
    setCurrentHeader: (header) => set({ currentHeader: header }),
    setMobileHeader: () => set((state) => ({isHeaderMenuOpen: !state.isHeaderMenuOpen}))
}));

export default useStore;