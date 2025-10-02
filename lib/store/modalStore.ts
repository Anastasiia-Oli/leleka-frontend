import { create } from "zustand";

interface ModalState {
  isLogoutModalOpen: boolean;
  onConfirmCallback: (() => void) | null;
  openLogoutModal: (onConfirm: () => void) => void;
  closeLogoutModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isLogoutModalOpen: false,
  onConfirmCallback: null,
  openLogoutModal: (onConfirm) =>
    set({ isLogoutModalOpen: true, onConfirmCallback: onConfirm }),
  closeLogoutModal: () =>
    set({ isLogoutModalOpen: false, onConfirmCallback: null }),
}));
