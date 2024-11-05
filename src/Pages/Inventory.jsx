import React, { Fragment } from "react";
import PageTitle from "../Components/PageSetup/PageTitle";
import { Box, Stack, Typography, useTheme } from "@mui/joy";
import ButtonComponent from "../Components/ButtonComponent";
import ContainerComponent from "../Components/Container/ContainerComponent";
import InputComponent from "../Components/Form/InputComponent";
import { SearchIcon, ViewIcon } from "lucide-react";
import TableComponent from "../Components/Table/TableComponent";
import PaginatedTable from "../Components/Table/PaginatedTable";
const data = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  itemName: "Zonrox Color Bleach",
  category: "Category name",
  unit: "1L bottle (x8 pieces per box)",
  quantity: "1,000",
}));

const columns = [
  { id: "#", label: "#" },
  { id: "itemName", label: "Item Name" },
  { id: "category", label: "Category" },
  { id: "unit", label: "Unit" },
  { id: "quantity", label: "Quantity" },
  { id: "actions", label: "Actions" },
];

const Inventory = () => {
  const theme = useTheme();
  return (
    <Fragment>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        mb={2}
      >
        <PageTitle
          title="Inventory"
          description={"See the list of items in your inventory."}
        />
        <ButtonComponent label="Generate Report" />
      </Stack>
      <Stack gap={2}>
        <ContainerComponent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <InputComponent label="Find a slip" startIcon={<SearchIcon />} />
          </Stack>
        </ContainerComponent>
        <ContainerComponent>
          <PaginatedTable
            tableTitle={"List of items"}
            tableDesc={
              "Inventory items with stocks are shown here real-time. You can also add a new item name if necessary."
            }
            columns={columns}
            rows={data}
            actions={<ViewIcon />}
          />
        </ContainerComponent>
      </Stack>
    </Fragment>
  );
};

export default Inventory;
