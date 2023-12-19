import { create } from "zustand";

interface VerifyModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useVerifyModal = create<VerifyModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useVerifyModal;