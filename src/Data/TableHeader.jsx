import { Divider, Typography,Box } from "@mui/joy";
import StartingBalanceStepper from "../Pages/Reports/Views/StartingBalStepper";
export const receivingTableHeader = [
  // {
  //   id: "id",
  //   numeric: true,
  //   disablePadding: true,
  //   label: "#",
  // },
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
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category Name" },
  { id: "unit_name", label: "Unit" },
  { id: "average_monthly_consumption", label: "Average monthly consumption" },
  { id: "months_with_consumptions", label: "No. of months with consumption" },
  { id: "months_left_to_consume", label: "Months left to consume" },
  { id: "starting_balance", label: "Starting balance" },
  { id: "current_month_end_balance", label: "Current month end balance" },
  // { id: "actions", label: "Actions" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

export const startingBalHeader = [
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "regular_quantity", label: "Regular starting balance" },
  { id: "donation_quantity", label: "Donation starting balance" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

export const startingBalancesHeader = [
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "is_IAR", label: "Receiving (IAR)" },
  { id: "balance_date", label: "Year" },
  { id: "month", label: "Month" },
  { id: "source_name", label: "Source" },
  { id: "key", label: "History ( RIS )",render : (row,index)=>{
    return <>
    {row.inventoryTransactionLog.length ? 
    <StartingBalanceStepper row={row}/>
   : <Divider> <Typography level="body-xs" fontSize={9} textColor={"#94B4C1"}>
    NO RECORDS FOUND
    </Typography></Divider>}
    </>
  } },
  { id: "quantity", label: "Starting Balance" },
];

export const nearExpHeader = [
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "brand_name", label: "Brand" },
  { id: "unit_name", label: "Unit" },
  { id: "quantity", label: "Current balance" },
  { id: "months_left_to_consume", label: "Months left to consume" },
  { id: "expiration_date", label: "Expiration date" },
];

export const zeroStocksHeader = [
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

export const consumedHeader = [
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "average_monthly_consumption", label: "Average monthly consumption" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

export const sufficientHeader = [
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "months_left_to_consume", label: "Months left to consume" },
  { id: "current_balance", label: "Quantity" },
];

export const unconsumedHeader = [
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "quantity", label: "Quantity" },
];

export const reorderHeader = [
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "quantity", label: "Quantity" },
  { id: "average_monthly_consumption", label: "Monthly consumption" },
  { id: "months_left_to_consume", label: "Months left to consume" },
];

export const disposalHeader = [
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "quantity", label: "Quantity served to WMR" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

export const areaSuppliesHeader = [
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "total_quantity", label: "Quantity" },
  { id: "average_monthly_consumption", label: "Monthly Consumption" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

export const regularSuppliesHeader = [
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "regular_starting_balance", label: "Starting Balance" },
  { id: "total_stockin_quantity", label: "Total Stockin Quantity" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

export const itemBreakdown = [
  // {
  //   // id: "id",
  //   label: "#",
  //   width: "5%",
  // },
  { id: "month", label: "Month" },
  { id: "iar_purchased", label: "IAR purchased" },
  { id: "iar_donation", label: "IAR donation" },
  { id: "ris_purchased", label: "RIS from purchased" },
  { id: "ris_donation", label: "RIS from donation" },
  { id: "ending_balance", label: "Ending balance" },
];

export const releasingHeader = [
  // {
  //    id: "id",
  //   numeric: true,
  //   disablePadding: true,
  //   label: "#",
  // },
 
  {
    id: "category_name",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "area_name",
    numeric: false,
    disablePadding: false,
    label: "Allocation Area ",
  },
  {
    id: "requested_quantity",
    numeric: true,
    disablePadding: false,
    label: "Total Quantity Requested",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Total Quantity Served",
  },
  {
    id: "key", // or any field name
    label: "Information",
    render: (row, index) => {
      return <>
      <Typography level="body-xs">
       <span style={{fontSize:"10px"}}> RIS #</span> : {row.ris_no}
      </Typography>
      <Divider></Divider>
      <Typography level="body-xs">
      <span style={{fontSize:"10px"}}> RIS Date </span>: {row.ris_date}
      </Typography>
      <Divider></Divider>
      <Typography level="body-xs">
      <span style={{fontSize:"10px"}}>Supplier </span>: {row.supplier_name}
      </Typography>
      <Divider></Divider>
      <Typography level="body-xs">
      <span style={{fontSize:"10px"}}>Remarks </span> : {row.remarks}
      </Typography>
      </>
    },
  },

  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

export const updateStockHeader = [
  // {
  //   // id: "id",
  //   numeric: true,
  //   disablePadding: true,
  //   label: "#",
  // },

  {
    id: "source_name",
    numeric: false,
    disablePadding: false,
    label: "Source",
  },

  {
    id: "supply_name",
    numeric: false,
    disablePadding: false,
    label: "Supply Name",
  },

  {
    id: "category_name",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },

  {
    id: "unit_name",
    numeric: false,
    disablePadding: false,
    label: "Unit Name",
  },

  {
    id: "quantity",
    numeric: false,
    disablePadding: false,
    label: "Quantity",
  },
];

export const receivingHeader = [
  // {
  //   // id: 1,
  //   numeric: true,
  //   disablePadding: true,
  //   label: "#",
  // },

  {
    id: "source_name",
    numeric: false,
    disablePadding: false,
    label: "Source",
  },

  {
    id: "purchase_order_no",
    numeric: false,
    disablePadding: false,
    label: "PO Number",
  },

  {
    id: "iar_no",
    numeric: false,
    disablePadding: false,
    label: "IAR Number",
  },

  {
    id: "supply_name",
    numeric: false,
    disablePadding: false,
    label: "Item Name",
  },

  {
    id: "category_name",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },

  {
    id: "unit_name",
    numeric: false,
    disablePadding: false,
    label: "Unit",
  },

  {
    id: "quantity",
    numeric: false,
    disablePadding: false,
    label: "Quantity",
  },

  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

export const areaHeader = [
  // {
  //   id: "id",
  //   numeric: true,
  //   disablePadding: true,
  //   label: "#",
  // },

  {
    id: "area_name",
    numeric: false,
    disablePadding: false,
    label: "Name of area",
  },

  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },

  // {
  //   id: "created_at",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Created at",
  // },
];

export const brandHeader = [
  // {
  //   id: "id",
  //   numeric: true,
  //   disablePadding: true,
  //   label: "#",
  // },

  {
    id: "brand_name",
    numeric: false,
    disablePadding: false,
    label: "Name of area",
  },

  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },

  // {
  //   id: "created_at",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Created at",
  // },
];

export const supplierHeader = [
  {
    id: "supplier_name",
    numeric: false,
    disablePadding: false,
    label: "Supplier Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "prcontactperson",
    numeric: false,
    disablePadding: false,
    label: "Contact Person",
  },
  {
    id: "prtelno",
    numeric: false,
    disablePadding: false,
    label: "Telephone No.",
  },
  {
    id: "prfaxno",
    numeric: false,
    disablePadding: false,
    label: "Fax No.",
  },
  {
    id: "premail",
    numeric: false,
    disablePadding: false,
    label: "PR Email",
  },
  {
    id: "prstreetbldg1",
    numeric: false,
    disablePadding: false,
    label: "Street/Building",
  },
  {
    id: "praddress",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "prcountry",
    numeric: false,
    disablePadding: false,
    label: "Country",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

export const categoriesHeader = [
  // {
  //   id: "id",
  //   numeric: true,
  //   disablePadding: true,
  //   label: "#",
  // },

  {
    id: "category_name",
    numeric: false,
    disablePadding: false,
    label: "Supplier Name",
  },

  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },

  // {
  //   id: "created_at",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Created at",
  // },
];

export const sourceHeader = [
  // {
  //   id: "id",
  //   numeric: true,
  //   disablePadding: true,
  //   label: "#",
  // },

  {
    id: "source_name",
    numeric: false,
    disablePadding: false,
    label: "Supplier Name",
  },

  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },

  // {
  //   id: "created_at",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Created at",
  // },
];

export const supplyHeader = [
  // {
  //   id: "id",
  //   numeric: true,
  //   disablePadding: true,
  //   label: "#",
  // },

  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Item name",
  },

  {
    id: "unit_name",
    numeric: false,
    disablePadding: false,
    label: "Type of Unit",
  },

  {
    id: "category_name",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },

  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },

  // {
  //   id: "created_at",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Created at",
  // },
];

export const unitHeader = [
  // {
  //   id: "id",
  //   numeric: true,
  //   disablePadding: true,
  //   label: "#",
  // },

  {
    id: "unit_name",
    numeric: false,
    disablePadding: false,
    label: "Supplier Name",
  },

  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },

  // {
  //   id: "created_at",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Created at",
  // },
];

export const dashboardHeader = [
  // {
  //   id: "id",
  //   numeric: true,
  //   disablePadding: true,
  //   label: "#",
  // },

  {
    id: "supply_name",
    numeric: true,
    disablePadding: true,
    label: "Items",
  },

  {
    id: "months_left_to_consume",
    numeric: true,
    disablePadding: true,
    label: "Month(s) left to consume",
  },

  {
    id: "monthly_consumption",
    numeric: true,
    disablePadding: true,
    label: "Monthly consumption",
  },

  {
    id: "quantity",
    numeric: true,
    disablePadding: true,
    label: "Current balance",
  },

  {
    id: "starting_balance",
    numeric: true,
    disablePadding: true,
    label: "This year's starting balance",
  },

  
];

export const PurchaseOrderHeader = [

  {
    id: "PO_number",
    numeric: true,
    disablePadding: true,
    label: "PO#",
  },
  {
    id: "Category",
    numeric: true,
    disablePadding: true,
    label: "Category",
  },
  {
    id: "itemdesc",
    numeric: true,
    disablePadding: true,
    label: "Description",
  },
 
  {
    id: "purcprice",
    numeric: true,
    disablePadding: true,
    label: "Price",
    render:(row,index)=>{
      return <>
   ₱ {Number(row.purcprice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
// Example output: "1,234.57"
}
      
      </>
    }
  },

  {
    id: "totqty",
    numeric: true,
    disablePadding: true,
    label: "Quantity",
    render:(row,index)=>{
      return <>
    {Number(row.totqty).toLocaleString()}

      
      </>
    }
  },
  {
    id: "key",
    numeric: true,
    disablePadding: true,
    label: "Other Information",
    render:(row,index)=>{
      return <>
       <Typography level="body-xs">
       <span style={{fontSize:"10px"}}> Old PO#</span> : {row.pr_old_po_number}
      </Typography>
      <Divider></Divider>
      <Typography level="body-xs">
       <span style={{fontSize:"10px"}}>PO Doc_Date</span> : <br /> {row.PO_docdate}
      </Typography>
      <Divider></Divider>
      <Typography level="body-xs">
       <span style={{fontSize:"10px"}}>PO Status</span> :  {row.postatus}
      </Typography>
      <Divider></Divider>
      <Typography level="body-xs">
       <span style={{fontSize:"10px"}}>PO Item Unit</span> :  {row.PO_ITEM_UNIT}
      </Typography>
      <Divider></Divider>
      <Typography level="body-xs">
       <span style={{fontSize:"10px"}}>Barcode ID</span> :  {row.barcodeid}
      </Typography>
      <Divider></Divider>
      
      </>
    }
  },

  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
]
