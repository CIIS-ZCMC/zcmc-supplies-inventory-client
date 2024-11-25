import { create } from "zustand";
import { useMemo } from "react";
import axios from "axios";
import { API, BASE_URL } from "../Services/Config";

const useFilterHook = create((set) => ({
  selectedCategory: "",
  sortOrder: "",
  searchTerm: "",
  month: "",
  year: "",
  fromDate: "", // New state for full date filtering
  toDate: "",

  // Update selected category filter
  setCategory: (category) => set({ selectedCategory: category }),
  // Update sort order
  setSortOrder: (order) => set({ sortOrder: order }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  setMonth: (month) => set({ month: month }),
  // setToMonth: (month) => set({ toMonth: month }),

  setYear: (year) => set({ year: year }),

  setFromDate: (date) => set({ fromDate: date }),
  setToDate: (date) => set({ toDate: date }),

  // Clear filters
  clearFilters: () =>
    set({
      selectedCategory: "",
      sortOrder: "",
      searchTerm: "",
      fromMonth: "",
      toMonth: "",
      fromYear: "",
      toYear: "",
    }),

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
        item.supply_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.unit_name.toLowerCase().includes(searchTerm.toLowerCase()); // Assuming your data has a `date` field

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
