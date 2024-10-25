import { create } from "zustand";

const useSidebarHook = create((set) => ({
  miniSidebar: false,
  activeNotifTab: "1",
  activeTab: "1",
  showNotif: false,
  setMiniSidebar: (data) => set(() => ({ miniSidebar: data })),
  setActiveNotifTab: (value) => {
    set(() => ({
      activeNotifTab: value,
    }));
  },
  setActiveTab: (value) => {
    // console.log("setActiveTab");
    set(() => ({
      activeTab: value,
    }));
  },
  openNotif: () => {
    set((prev) => ({ showNotif: !prev.showNotif }));
  },
  closeNotif: () => {
    set(() => ({ showNotif: false }));
  },
}));

export default useSidebarHook;
