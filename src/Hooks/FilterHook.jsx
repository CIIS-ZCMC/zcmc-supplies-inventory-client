import { create } from "zustand";
import { useMemo } from "react";
import axios from "axios";
import { API, BASE_URL } from "../Services/Config";

const useFilterHook = create((set) => ({
  selectedCategory: "",
  sortOrder: "",

  // Update selected category filter
  setCategory: (category) => set({ selectedCategory: category }),

  // Update sort order
  setSortOrder: (order) => set({ sortOrder: order }),

  // Clear filters
  clearFilters: () => set({ selectedCategory: "", sortOrder: "" }),

  // Computed property for filtered and sorted inventory
  filteredInventory: (inventory) => {
    const { selectedCategory, sortOrder } = useFilterHook.getState();

    // Filter by selected category
    let filtered = inventory.filter(
      (item) => !selectedCategory || item.category_name === selectedCategory
    );

    console.log(sortOrder);
    // Sort by quantity
    if (sortOrder === "highest") {
      filtered = filtered.sort((a, b) => b.quantity - a.quantity);
    } else if (sortOrder === "lowest") {
      filtered = filtered.sort((a, b) => a.quantity - b.quantity);
    }

    return filtered;
  },
}));

export default useFilterHook;
