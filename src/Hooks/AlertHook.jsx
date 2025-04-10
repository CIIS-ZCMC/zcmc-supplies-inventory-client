import { create } from "zustand";

const useSnackbarHook = create((set) => ({
  open: false,
  message: "",
  color: "success", // or 'error', 'warning', etc.
  variant: "filled", // 'outlined', 'standard'
  anchor: { vertical: "top", horizontal: "right" },
  nobrandRegular:false,
  noBrandDonation:false,
  brandRegularQty:1,
  brandDonationQty:1,
  showSnackbar: (message, color = "success", variant = "filled") => {
    set({ open: true, message, color, variant });
    setTimeout(() => set({ open: false }), 5000); // Auto-hide after 3 seconds
  },
  setBrandRegular:(bool)=>{
    set({nobrandRegular:bool})
  },
  setBrandDonation:(bool)=>{
    set({noBrandDonation:bool})
  },
  closeSnackbar: () => set({ open: false }),
}));

export default useSnackbarHook;
