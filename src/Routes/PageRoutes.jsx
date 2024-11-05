import Dashboard from "../Pages/Dashboard";
import Receiving from "../Pages/Receiving";
import Releasing from "../Pages/Releasing";
import ItemReview from "../Pages/ItemReview";
import Categories from "../Pages/Categories";
import Suppliers from "../pages/Suppliers";
import Brands from "../Pages/Brands";

import ManageRequest from "../Pages/ManageRequest";
import MainPage from "../Pages/End-User/MainPage";

import {
  CircleGauge,
  ArrowUpFromLine,
  ArrowDownToLine,
  BaggageClaim,
  Tag,
  ClipboardList,
  LayoutGrid,
} from "lucide-react";

export const sidebarRoutes = [
  {
    path: "/dashboard", // DASHBOARD
    name: "Dashboard",
    element: <Dashboard />,
    icon: <CircleGauge />,
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
    path: "/releasing", // DASHBOARD
    name: "Releasing (RIS)",
    element: <Releasing />,
    icon: <ArrowUpFromLine />,
    // code: "PRM-REQ",
    permissions: ["view"],
  },

  {
    path: "/item-review", // DASHBOARD
    name: "Item Review",
    element: <ItemReview />,
    icon: <ClipboardList />,
    // code: "PRM-REQ",
    permissions: ["view"],
  },

  {
    path: "/categories", // DASHBOARD
    name: "Categories",
    element: <Categories />,
    icon: <LayoutGrid />,
    // code: "PRM-REQ",
    permissions: ["view"],
  },

  {
    path: "/suppliers", // DASHBOARD
    name: "Suppliers",
    element: <Suppliers />,
    icon: <BaggageClaim />,
    // code: "PRM-REQ",
    permissions: ["view"],
  },

  {
    path: "/brands", // DASHBOARD
    name: "Brands",
    element: <Brands />,
    icon: <Tag />,
    // code: "PRM-REQ",
    permissions: ["view"],
  },
];

export const childrenRoutes = [
  {
    path: "/transactions/manage-pr", // DASHBOARD
    name: "Manage",
    element: <ManageRequest />,
    icon: null,
    code: "PRM-REQ",
    permissions: ["view"],
  },
];
