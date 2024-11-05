import React, { Fragment, useEffect } from "react";
import PageTitle from "../Components/PageSetup/PageTitle";
import { Box, Stack, Typography, useTheme } from "@mui/joy";
import ButtonComponent from "../Components/ButtonComponent";
import ContainerComponent from "../Components/Container/ContainerComponent";
import InputComponent from "../Components/Form/InputComponent";
import { SearchIcon, ViewIcon } from "lucide-react";
import TableComponent from "../Components/Table/TableComponent";
import PaginatedTable from "../Components/Table/PaginatedTable";
import useInventoryHook from "../Hooks/InventoryHook";
import { items, user } from "../Data/index";
import Header from "../Layout/Header/Header";
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
  const { inventory, getInventory } = useInventoryHook();
  const theme = useTheme();
  const pageDetails = {
    title: "Inventory",
    description: "See the list of items in your inventory.",
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      getInventory();
      console.log(inventory);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [getInventory]);
  return (
    <Fragment>
      <Header pageDetails={pageDetails} data={user} />
      <Stack gap={2} mt={2}>
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
            rows={inventory}
            actions={<ViewIcon />}
            btnLabel={"Add new item name"}
          />
        </ContainerComponent>
      </Stack>
    </Fragment>
  );
};

export default Inventory;
