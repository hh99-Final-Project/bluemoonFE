import create from "zustand";

const useStore = create((set) => ({
    currentHeader: null,
    audioFile: null,
    setCurrentHeader: (header) => set({ currentHeader: header }),
    setAudioFile: (audio) => set({ audioFile: audio })
}));

export default useStore;