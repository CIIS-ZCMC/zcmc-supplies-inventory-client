import { lazy } from 'react';
import { CircleGauge, ArrowUpFromLine, ArrowDownToLine, BaggageClaim, Tag, ClipboardList, LayoutGrid } from "lucide-react";

// Lazy load each page component
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Receiving = lazy(() => import("../Pages/Receiving"));

const ReleasingOverview = lazy(() => import("../Pages/Releasing/ReleasingOveriew"));
const ReleasingDetails = lazy(() => import("../Pages/Releasing/ReleasingDetails"));

const ItemReview = lazy(() => import("../Pages/ItemReview"));
const Categories = lazy(() => import("../Pages/Categories"));
const Suppliers = lazy(() => import("../Pages/Suppliers"));
const Brands = lazy(() => import("../Pages/Brands"));
const ManageRequest = lazy(() => import("../Pages/ManageRequest"));
const Inventory = lazy(() => import("../Pages/Inventory"));
const MainPage = lazy(() => import("../Pages/End-User/MainPage"));

export const sidebarRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
    icon: <CircleGauge />,
    permissions: ["view"],
  },
  {
    path: "/releasing",
    name: "Releasing (RIS)",
    element: <ReleasingOverview />,
    icon: <ArrowUpFromLine />,
    permissions: ["view"],
  },
  {
    path: "/releasing/:id",
    name: "Releasing Details",
    element: <ReleasingDetails />,
    icon: <ArrowUpFromLine />,
    permissions: ["view"],
  },
  {
    path: "/receiving",
    name: "Receiving (IAR)",
    element: <Receiving />,
    icon: <ArrowDownToLine />,
    path: "/inventory", // DASHBOARD
    permissions: ["view"],
  },
  {
    name: "Inventory",
    element: <Inventory />,
    icon: <ClipboardList />,
    // code: "PRM-REQ",
    permissions: ["view"],
  },

  {
    path: "/releasing", // DASHBOARD
    name: "Releasing (RIS)",
    element: <Releasing />,
    icon: <ArrowUpFromLine />,
    // code: "PRM-REQ",
    permissions: ["view"],
  },

  {
    path: "/receiving", // DASHBOARD
    name: "Receiving (IAR)",
    element: <Receiving />,
    icon: <ArrowDownToLine />,
    // code: "PRM-REQ",
    permissions: ["view"],
  },
  {
    path: "/categories",
    name: "Categories",
    element: <Categories />,
    icon: <LayoutGrid />,
    permissions: ["view"],
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    element: <Suppliers />,
    icon: <BaggageClaim />,
    permissions: ["view"],
  },
  {
    path: "/brands",
    name: "Brands",
    element: <Brands />,
    icon: <Tag />,
    permissions: ["view"],
  },
];

export const childrenRoutes = [
  {
    path: "/transactions/manage-pr",
    name: "Manage",
    element: <ManageRequest />,
    icon: null,
    code: "PRM-REQ",
    permissions: ["view"],
  },
];
