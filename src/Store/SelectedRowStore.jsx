import { create } from "zustand";

// Define the Zustand store
const useSelectedRow = create((set) => ({
    selectedRow: null, // Initialize the selected row as null
    setSelectedRow: (row) => set({ selectedRow: row }), // Function to set the selected row
    clearSelectedRow: () => set({ selectedRow: null }), // Function to clear the selected row
}));

export default useSelectedRow;
