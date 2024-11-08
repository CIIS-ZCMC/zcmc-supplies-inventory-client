export const receivingTableHeader = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "#",
  },
  {
    id: "item_name",
    numeric: false,
    disablePadding: false,
    label: "Item Name",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "quantity_requested",
    numeric: true,
    disablePadding: false,
    label: "Total Quantity Requested",
  },
  {
    id: "quantity_served",
    numeric: true,
    disablePadding: false,
    label: "Total Quantity Served",
  },
  {
    id: "unit",
    numeric: false,
    disablePadding: false,
    label: "Unit",
  },
];

export const itemHeader = [
  { id: "supplies_masterlist_id", label: "#", width: "5%" },
  { id: "supply_name", label: "Item Name" },
  { id: "unit_name", label: "Unit" },
  { id: "months_with_consumptions", label: "No. of months with consumption" },
  { id: "current_month_end_balance", label: "Current month end balance" },
  { id: "average_monthly_consumption", label: "Average monthly consumption" },
  { id: "months_left_to_consume", label: "Months left to consume" },
  { id: "starting_balance", label: "2024 starting balance" },
  { id: "actions", label: "Actions" },
];

export const startingBalHeader = [
  { id: "supplies_masterlist_id", label: "#", width: "5%" },
  { id: "supply_name", label: "Item Name" },
  { id: "category", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "regular_quantity", label: "Regualr staring balance" },
  { id: "donation_quantity", label: "Donation starting balance" },
];

export const nearExpHeader = [
  { id: "id", label: "#", width: "5%" },
  { id: "supply_name", label: "Item Name" },
  { id: "category", label: "Category" },
  { id: "brand_name", label: "Brand" },
  { id: "unit_name", label: "Unit" },
  { id: "quantity", label: "Current balance" },
  { id: "months_left_to_consume", label: "Months left to consume" },
  { id: "expiration_date", label: "Expiration date" },
];

export const zeroStocksHeader = [
  { id: "id", label: "#", width: "5%" },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
];

export const consumedHeader = [
  { id: "supplies_masterlist_id", label: "#", width: "5%" },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "average_monthly_consumption", label: "Average monthly consumption" },
];

export const sufficientHeader = [
  { id: "supplies_masterlist_id", label: "#", width: "5%" },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "months_left_to_consume", label: "Months left to consume" },
  { id: "current_balance", label: "Quantity" },
];

export const unconsumedHeader = [
  { id: "supplies_masterlist_id", label: "#", width: "5%" },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "current_balance", label: "Quantity" },
];

export const reorderHeader = [
  { id: "supplies_masterlist_id", label: "#", width: "5%" },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "current_balance", label: "Quantity" },
  { id: "average_monthly_consumption", label: "Monthly consumption" },
  { id: "months_left_to_consume", label: "Monthly left to consume" },
];

export const disposalHeader = [
  { id: "id", label: "#", width: "5%" },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "quantity", label: "Quantity served to WMR" },
];
