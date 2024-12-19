import { create } from "zustand";

const usePaginatedTableHook = create((set) => ({
    isUpdate: false,
    id: null,

    setId: (value) => set({ id: value }),
    setIsUpdate: (value) => set({ isUpdate: value }),
    setEditMode: (id) => set({ isUpdate: true, id }),
    resetState: () => set({ isUpdate: false, id: null }),
}));

export default usePaginatedTableHook;