import { create } from "zustand";

interface LogoutModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLogoutModal = create<LogoutModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLogoutModal;
