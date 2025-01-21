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

//Inventory Pages
const Inventory = lazy(() => import("../Pages/Inventory/Inventory"));
const ViewDetails = lazy(() => import("../Pages/Inventory/ViewDetails"));

const StockUpdate = lazy(() => import("../Pages/Stock-Update/StockUpdate"));

// Libraries Pages
const Libraries = lazy(() => import("../Pages/Libraries/Libraries"));
const AreasOverview = lazy(() => import("../Pages/Libraries/Areas/AreasOverview"));
const BrandsOverview = lazy(() => import("../Pages/Libraries/Brands/BrandsOverview"));
const SuppliersOverview = lazy(() => import("../Pages/Libraries/Suppliers/SuppliersOverview"));
const CategoriesOverview = lazy(() => import("../Pages/Libraries/Categories/CategoriesOverview"));
const SourceOverview = lazy(() => import("../Pages/Libraries/Source/SourceOverview"));
const SuppliesOverview = lazy(() => import("../Pages/Libraries/Supplies/SuppliesOverview"));
const UnitsOverview = lazy(() => import("../Pages/Libraries/Units/UnitsOverview"));

// Reports Pages
const Reports = lazy(() => import("../Pages/Reports/Reports"));

const ReorderedItems = lazy(() => import("../Pages/Reports/ReorderedItems"));
const ConsumedItems = lazy(() => import("../Pages/Reports/ConsumedItems"));
const DisposalItems = lazy(() => import("../Pages/Reports/DisposalItems"));
const ZeroStockItems = lazy(() => import("../Pages/Reports/ZeroStockItems"));
const UnconsumedItems = lazy(() => import("../Pages/Reports/UnconsumedItems"));
const WithoutRISItems = lazy(() => import("../Pages/Reports/WithoutRISItems"));

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
    path: "reports",
    name: "Reports",
    element: <Reports />,
    icon: <GrDocument />,
    permissions: ["view"],
    children: [
      { path: "", element: <Navigate to="reordered-items" replace /> },
      { path: "reordered-items", element: <ReorderedItems /> },
      { path: "consumed-items", element: <ConsumedItems /> },
      { path: "disposal-items", element: <DisposalItems /> },
      { path: "zero-stock-items", element: <ZeroStockItems /> },
      { path: "unconsumed-items", element: <UnconsumedItems /> },
      { path: "without-RIS-items", element: <WithoutRISItems /> },
    ],
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
      { path: "supplies", element: <SuppliesOverview /> }
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




