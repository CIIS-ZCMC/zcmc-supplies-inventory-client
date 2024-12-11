import { create } from "zustand";

// Define the Zustand store
const useSelectedRow = create((set) => ({
  selectedRow: null, // Initialize the selected row as null
  setSelectedRow: (row) => {
    set({ selectedRow: row });
    if (row?.supply_name) {
      localStorage.setItem("supply_name", row.supply_name); // Store supply_name in localStorage
    }
  }, // Function to set the selected row
  clearSelectedRow: () => {
    set({ selectedRow: null });
    localStorage.removeItem("supply_name");
  }, // Function to clear the selected row
}));

export default useSelectedRow;
