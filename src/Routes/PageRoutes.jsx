import { lazy } from "react";
import {
  CircleGauge,
  ArrowUpFromLine,
  ArrowDownToLine,
  BaggageClaim,
  Tag,
  ClipboardList,
  LayoutGrid,
} from "lucide-react";
import ViewDetails from "../Pages/ViewDetails";
import Reports from "../Pages/Reports";
import { BiCategory } from "react-icons/bi";
import { GrDocument } from "react-icons/gr";

// Lazy load each page component
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Receiving = lazy(() => import("../Pages/Receiving"));

const ReleasingOverview = lazy(() =>
  import("../Pages/Releasing/ReleasingOveriew")
);
const ReleasingDetails = lazy(() =>
  import("../Pages/Releasing/ReleasingDetails")
);

// const ItemReview = lazy(() => import("../Pages/ItemReview"));
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
    icon: <BiCategory />,
    permissions: ["view"],
  },
  {
    path: "/inventory",
    name: "Inventory",
    element: <Inventory />,
    icon: <ClipboardList />,
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
    permissions: ["view"],
  },
  {
    path: "/reports",
    name: "Reports",
    element: <Reports />,
    icon: <GrDocument />,
    permissions: ["view"],
  },
];

export const childrenRoutes = [
  {
    path: "/inventory/viewing",
    name: "Manage",
    element: <ViewDetails />,
    icon: null,
    permissions: ["view"],
  },
];
