import { create } from "zustand";

// Define the Zustand store
const useSelectedRow = create((set) => ({
  selectedRow: JSON.parse(localStorage.getItem("selectedRow")) || null,
  selectedItem:null,
  setSelectedRow: (row) => {
    set({ selectedRow: row });
    if (row) {
      localStorage.setItem("selectedRow", JSON.stringify(row)); // Store entire row in localStorage
    }
  },

  // Function to clear the selected row
  clearSelectedRow: () => {
    set({ selectedRow: null });
    localStorage.removeItem("selectedRow");
  },
  setSelectedItem: (id)=>{
    set({selectedItem : id})
  }
}));

export default useSelectedRow;
