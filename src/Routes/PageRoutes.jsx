import { Navigate } from "react-router-dom";

import { lazy } from "react";
import {
  CircleGauge,
  ArrowUpFromLine,
  ArrowDownToLine,
  BaggageClaim,
  Tag,
  ClipboardList,
  LayoutGrid,
  ChartCandlestick,
} from "lucide-react";

import { BiCategory } from "react-icons/bi";
import { GrDocument } from "react-icons/gr";
import ViewItemDetails from "../Pages/Reports/ViewItemDetails";

// Lazy load each page component
const Dashboard = lazy(() => import("../Pages/Dashboard"));
//Releasing/Stock Out
const ReleasingOverview = lazy(() =>
  import("../Pages/Releasing/ReleasingOveriew")
);
const ReleasingDetails = lazy(() =>
  import("../Pages/Releasing/ReleasingDetails")
);

//Receiving/Stock in
const ReceivingOverview = lazy(() =>
  import("../Pages/Receiving/ReceivingOverview")
);
const ReceivingDetails = lazy(() =>
  import("../Pages/Receiving/ReceivingDetails")
);

// const ItemReview = lazy(() => import("../Pages/ItemReview"));
const Libraries = lazy(() => import("../Pages/Libraries/Libraries"));
const Inventory = lazy(() => import("../Pages/Inventory/Inventory"));
const ViewDetails = lazy(() => import("../Pages/Inventory/ViewDetails"));

const Reports = lazy(() => import("../Pages/Reports/Reports"));
const StockUpdate = lazy(() => import("../Pages/Stock-Update/StockUpdate"));

import AreasOverview from "../Pages/Libraries/Areas/AreasOverview";
import BrandsOverview from "../Pages/Libraries/Brands/BrandsOverview";
import SuppliersOverview from "../Pages/Libraries/Suppliers/SuppliersOverview";
import CategoriesOverview from "../Pages/Libraries/Categories/CategoriesOverview";
import SourceOverview from "../Pages/Libraries/Source/SourceOverview";
import SuppliesOverview from "../Pages/Libraries/Supplies/SuppliesOverview";
import UnitsOverview from "../Pages/Libraries/Units/UnitsOverview";

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
    path: "/receiving",
    name: "Receiving (IAR)",
    element: <ReceivingOverview />,
    icon: <ArrowDownToLine />,
    permissions: ["view"],
  },
  {
    path: "/stock-update",
    name: "Stock-Update",
    element: <StockUpdate />,
    icon: <ChartCandlestick />,
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
    path: "libraries",
    element: <Libraries />,
    permission: ["view"],
    // children: [
    //   { path: "brands", element: <BrandsOverview /> },
    // ]
    children: [
      { path: "", element: <Navigate to="areas" replace /> },
      { path: "areas", element: <AreasOverview /> },
      { path: "brands", element: <BrandsOverview /> },
      { path: "suppliers", element: <SuppliersOverview /> },
      { path: "categories", element: <CategoriesOverview /> },
      { path: "units", element: <UnitsOverview /> },
      { path: "source", element: <SourceOverview /> },
      { path: "supplies", element: <SuppliesOverview /> },
    ],
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
    element: <ViewDetails />,
    icon: null,
    permissions: ["view"],
  },

  {
    path: "/reports/:id",
    element: <ViewItemDetails />,
    icon: null,
    permissions: ["view"],
  },
];
