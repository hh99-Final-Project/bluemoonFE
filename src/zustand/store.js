import create from "zustand";

const useStore = create((set) => ({
    currentHeader: "홈",
    setCurrentHeader: (header) => set({ currentHeader: header }),
}));

export default useStore;