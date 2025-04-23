import { Navigate } from "react-router-dom";
import { lazy } from "react";
import {
  ArrowUpFromLine,
  ArrowDownToLine,
  ClipboardList,
  ChartCandlestick,
  NotebookTextIcon,
} from "lucide-react";
import { BiCategory } from "react-icons/bi";
import { GrDocument } from "react-icons/gr";
import { FaFileInvoiceDollar } from "react-icons/fa";
import ViewItemDetails from "../Pages/Reports/ViewItemDetails";

// Lazy load only Reports and Libraries
const Reports = lazy(() => import("../Pages/Reports/Reports"));
const Libraries = lazy(() => import("../Pages/Libraries/Libraries"));

// Direct imports for other components
import Dashboard from "../Pages/Dashboard";
import ReleasingOverview from "../Pages/Releasing/ReleasingOveriew";
import ReleasingDetails from "../Pages/Releasing/ReleasingDetails";
import ReceivingOverview from "../Pages/Receiving/ReceivingOverview";
import ReceivingDetails from "../Pages/Receiving/ReceivingDetails";
import Inventory from "../Pages/Inventory/Inventory";
import ViewDetails from "../Pages/Inventory/ViewDetails";
import StockUpdate from "../Pages/Stock-Update/StockUpdate";
import AreasOverview from "../Pages/Libraries/Areas/AreasOverview";
import BrandsOverview from "../Pages/Libraries/Brands/BrandsOverview";
import SuppliersOverview from "../Pages/Libraries/Suppliers/SuppliersOverview";
import CategoriesOverview from "../Pages/Libraries/Categories/CategoriesOverview";
import SourceOverview from "../Pages/Libraries/Source/SourceOverview";
import SuppliesOverview from "../Pages/Libraries/Supplies/SuppliesOverview";
import UnitsOverview from "../Pages/Libraries/Units/UnitsOverview";
import ItemCount from "../Pages/Reports/ItemCount";
import StartingBalance from "../Pages/Reports/StartingBalance";
import NearExpiration from "../Pages/Reports/NearExpiration";
import ReorderedItems from "../Pages/Reports/ReorderedItems";
import ConsumedItems from "../Pages/Reports/ConsumedItems";
import DisposalItems from "../Pages/Reports/DisposalItems";
import ZeroStockItems from "../Pages/Reports/ZeroStockItems";
import UnconsumedItems from "../Pages/Reports/UnconsumedItems";
import WithoutRISItems from "../Pages/Reports/WithoutRISItems";
import AreaSupplies from "../Pages/Reports/AreaSupplies";
import RegularSupplies from "../Pages/Reports/RegularSupplies";
import { PiInvoiceDuotone } from "react-icons/pi";
import PurchaseReq from "../Pages/PurchaseRequest/PurchaseReq";
import NewItem from "../Pages/Inventory/NewItem";
import ViewStartingBalance from "../Pages/Reports/Views/ViewStartingBalance";
import ViewReleasedItem from "../Pages/Reports/Views/viewReleasedItem";
import ViewReceivedItem from "../Pages/Reports/Views/ViewReceivedItem";
import TaggingPurchasedOrder from "../Pages/PurchaseRequest/TaggingPurchasedOrder";
export const sidebarRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
    icon: <BiCategory />,
    permissions: ["view"],
  },
  {
    path: "/purchase-order",
    name: "Purchase Orders (Tagging)",
    element: <PurchaseReq />,
    icon: <NotebookTextIcon />,
    permissions: ["view"],
    //children: [{ path: ":id", element: <>this will displayxx</> }],
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
      { path: "item-count", element: <ItemCount /> },
      { path: "starting-balance", element: <StartingBalance /> },
      { path: "near-expiration", element: <NearExpiration /> },
      { path: "reordered-items", element: <ReorderedItems /> },
      { path: "consumed-items", element: <ConsumedItems /> },
      { path: "disposal-items", element: <DisposalItems /> },
      { path: "zero-stocks-items", element: <ZeroStockItems /> },
      { path: "unconsumed-items", element: <UnconsumedItems /> },
      { path: "without-ris-items", element: <WithoutRISItems /> },
      { path: "area-supplies", element: <AreaSupplies /> },
      { path: "regular-supplies", element: <RegularSupplies /> },
   
    ],
  },

];

export const childrenRoutes = [
  {
    path: "libraries",
    element: <Libraries />,
    permission: ["view"],
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
    element: <ReceivingDetails />,
    permissions: ["view"],
  },
  {
    path: "/releasing/:id",
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
    path: "/newItem",
    element: <NewItem />,
    icon: null,
    permissions: ["view"],
  },
  {
    path: "/reports/item-count/:id",
    element: <ViewItemDetails />,
    icon: null,
    permissions: ["view"],
  },
  {
    path: "/reports/starting-balance/:id",
    element: <ViewStartingBalance/>,
    icon: null,
    permissions: ["view"],
  },
  {
    path: "/reports/releasing/:id",
    element: <ViewReleasedItem/>,
    icon: null,
    permissions: ["view"],
  },
  {
    path: "/reports/receiving/:id",
    element: <ViewReceivedItem/>,
    icon: null,
    permissions: ["view"],
  },

  {
    path: "/purchase-order/:id",
    element: <TaggingPurchasedOrder/>,
    icon: null,
    permissions: ["view"],
  },
  
];
