import create from "zustand";

const useStore = create((set) => ({
    currentHeader: null,
    setCurrentHeader: (header) => set({ currentHeader: header }),
}));

export default useStore;