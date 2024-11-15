import { create } from "zustand";

const useSnackbarHook = create((set) => ({
  open: false,
  message: "",
  color: "success", // or 'error', 'warning', etc.
  variant: "filled", // 'outlined', 'standard'
  anchor: { vertical: "top", horizontal: "right" },

  showSnackbar: (message, color = "success", variant = "filled") => {
    set({ open: true, message, color, variant });
    setTimeout(() => set({ open: false }), 3000); // Auto-hide after 3 seconds
  },

  closeSnackbar: () => set({ open: false }),
}));

export default useSnackbarHook;
