// modalStore.js
import { create } from "zustand";

const useModalHook = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalHook;
