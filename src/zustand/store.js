import create from "zustand";

const useStore = create((set) => ({
    currentHeader: "홈",
    diaryContent: "",
    setCurrentHeader: (header) => set({ currentHeader: header }),
    setDiaryContent: (text) => set({diaryContent: text})
}));

export default useStore;