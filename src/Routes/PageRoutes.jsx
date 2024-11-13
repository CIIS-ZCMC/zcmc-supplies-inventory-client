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

// Lazy load each page component
const Dashboard = lazy(() => import("../Pages/Dashboard"));
//Releasing/Stock Out
const ReleasingOverview = lazy(() => import("../Pages/Releasing/ReleasingOveriew"));
const ReleasingDetails = lazy(() => import("../Pages/Releasing/ReleasingDetails"));

//Receiving/Stock in
const ReceivingOverview = lazy(() => import('../Pages/Receiving/ReceivingOverview'));
const ReceivingDetails = lazy(() => import("../Pages/Receiving/ReceivingDetails"));

const Libraries = lazy(() => import("../Pages/Libraries/Libraries"));

const Inventory = lazy(() => import("../Pages/Libraries/Inventory"));

export const sidebarRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
    icon: <CircleGauge />,
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
    path: "/receiving",
    name: "Receiving (IAR)",
    element: <ReceivingOverview />,
    icon: <ArrowDownToLine />,
    permissions: ["view"],
  },

];

export const childrenRoutes = [

  {
    path: 'libraries',
    element: <Libraries />,
    permission: ["view"],
  },

  {
    path: "/receiving/:id",
    // name: "Releasing Details",
    element: <ReceivingDetails />,
    permissions: ["view"],
  },

  {
    path: "/releasing/:id",
    // name: "Releasing Details",
    element: <ReleasingDetails />,
    permissions: ["view"],
  },

  {
    path: "/inventory/:id",
    name: "Manage",
    element: <ViewDetails />,
    icon: null,
    permissions: ["view"],
  },
];
