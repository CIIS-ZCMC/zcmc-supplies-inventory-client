import { create } from "zustand";
import axios from "axios";
import { BASE_URL, MigrateLibraries } from "../Services/Config";
import { queryClient } from "../Utils/queryClient";

export const useSyncSupplies = create((set) => ({
  isUpdating: false,
  error: null,

  updateDatabase: async () => {
    set({ isUpdating: true, error: null }); // Start loading
    try {
      await axios.get(`${BASE_URL.development}/${MigrateLibraries.UNIT}`); // API call
      queryClient
        .invalidateQueries(["supplies"])
        .then(() => console.log("aaaaaaaaaaaaaaaaaaaaaaaaa")); // Refetch data after update
      set({ isUpdating: false }); // Stop loading after success
    } catch (err) {
      set({ error: err.message, isUpdating: false });
    }
  },
}));
