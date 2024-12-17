import { create } from "zustand";

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
      // console.log("Current item:", item); // Log each item being processed

      const matchesCategory =
        !selectedCategory || item.category_name === selectedCategory;
      const matchesSearch =
        !searchTerm ||
        item.supply_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.unit_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.area_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.unit_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source_name?.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch;
    });


    // Sort by quantity
    if (sortOrder === "highest") {
      filtered = filtered.sort((a, b) => b.quantity - a.quantity);
    } else if (sortOrder === "lowest") {
      filtered = filtered.sort((a, b) => a.quantity - b.quantity);
    } else if (sortOrder === "asc") {
      // Sort alphabetically (A-Z)
      filtered = filtered.sort((a, b) =>
        a.area_name?.localeCompare(b.area_name) ||
        a.brand_name?.localeCompare(b.brand_name) ||
        a.supplier_name?.localeCompare(b.supplier_name) ||
        a.category_name?.localeCompare(b.category_name) ||
        a.unit_name?.localeCompare(b.unit_name) ||
        a.source_name?.localeCompare(b.source_name) ||
        a.supply_name?.localeCompare(b.supply_name)
      );
    } else if (sortOrder === "desc") {
      // Sort alphabetically (Z-A)
      filtered = filtered.sort((a, b) =>
        b.area_name?.localeCompare(a.area_name) ||
        b.brand_name?.localeCompare(a.brand_name) ||
        b.supplier_name?.localeCompare(a.supplier_name) ||
        b.category_name?.localeCompare(a.category_name) ||
        b.unit_name?.localeCompare(a.unit_name) ||
        b.source_name?.localeCompare(a.source_name) ||
        b.supply_name?.localeCompare(a.supply_name)
      );
    }

    return filtered;
  },
}));

export default useFilterHook;
