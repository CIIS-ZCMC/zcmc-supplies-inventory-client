import { create } from "zustand";
import { useMemo } from "react";
import axios from "axios";
import { API, BASE_URL } from "../Services/Config";

const useFilterHook = create((set) => ({
  selectedCategory: "",
  sortOrder: "",
  searchTerm: "",

  // Update selected category filter
  setCategory: (category) => set({ selectedCategory: category }),

  // Update sort order
  setSortOrder: (order) => set({ sortOrder: order }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  // Clear filters
  clearFilters: () => set({ selectedCategory: "", sortOrder: "" }),

  // Computed property for filtered and sorted inventory
  filteredInventory: (data) => {
    // Ensure data is an array
    if (!Array.isArray(data)) {
      console.error("Expected an array but got:", data);
      return [];
    }
    const { selectedCategory, sortOrder, searchTerm } =
      useFilterHook.getState();
    // Filter by selected category
    let filtered = data?.filter((item) => {
      const matchesCategory =
        !selectedCategory || item.category_name === selectedCategory;
      const matchesSearch =
        !searchTerm ||
        item.supply_name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

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
