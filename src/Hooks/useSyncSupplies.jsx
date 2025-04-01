import { create } from "zustand";
import { BASE_URL, MigrateLibraries } from "../Services/Config";
import { queryClient } from "../Utils/queryClient";
import inventory_api from "../Services/ApiName";

export const useSyncSupplies = create((set) => ({
  isUpdating: false,
  error: null,

  updateDatabase: async () => {
    set({ isUpdating: true, error: null }); // Start loading
    try {
      await inventory_api.get(`/${MigrateLibraries.UNIT}`); // API call
      queryClient
        .invalidateQueries(["supplies"])
        .then(() => console.log("aaaaaaaaaaaaaaaaaaaaaaaaa")); // Refetch data after update
      set({ isUpdating: false }); // Stop loading after success
    } catch (err) {
      set({ error: err.message, isUpdating: false });
    }
  },
}));
