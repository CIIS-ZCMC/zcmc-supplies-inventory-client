import React, { Fragment, useEffect } from "react";
import PageTitle from "../../Components/PageSetup/PageTitle";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/joy";
import ButtonComponent from "../../Components/ButtonComponent";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import InputComponent from "../../Components/Form/InputComponent";
import { ArrowDown, ArrowUp, SearchIcon, ViewIcon } from "lucide-react";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import useInventoryHook from "../../Hooks/InventoryHook";
import { user } from "../../Data/index";
import Header from "../../Layout/Header/Header";
import SelectComponent from "../../Components/Form/SelectComponent";
import useFilterHook from "../../Hooks/FilterHook";

const categoryFilter = [
  { name: "Janitorial", value: "Janitorial" },
  { name: "Medical", value: "Medical" },
  { name: "Office", value: "Office" },
];

const sortFilter = [
  { icon: <ArrowUp />, name: "Highest first (descending)", value: "highest" },
  { icon: <ArrowDown />, name: "Lowest first (ascending)", value: "lowest" },
];

const data = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  itemName: "Zonrox Color Bleach",
  category: "Category name",
  unit: "1L bottle (x8 pieces per box)",
  quantity: "1,000",
}));

const columns = [
  { id: "id", label: "#" },
  { id: "supply_name", label: "Item Name" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "quantity", label: "Quantity" },
  { id: "actions", label: "Actions" },
];

const Inventory = () => {
  const { inventory, getInventory } = useInventoryHook();
  const {
    filteredInventory,
    selectedCategory,
    sortOrder,
    searchTerm,
    setCategory,
    setSortOrder,
    setSearchTerm,
    clearFilters,
  } = useFilterHook();
  const theme = useTheme();
  const pageDetails = {
    title: "Inventory",
    description: "See the list of items in your inventory.",
    pagePath: "/inventory",
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      getInventory();
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
            {/* search*/}
            <InputComponent
              label="Find a slip"
              placeholder="Find by item name, category, unit"
              startIcon={<SearchIcon />}
              value={searchTerm}
              setValue={setSearchTerm}
              width={300}
            />
            <Box display="flex" gap={1}>
              <SelectComponent
                startIcon={"Sort by:"}
                placeholder={"category"}
                options={categoryFilter}
                value={selectedCategory}
                onChange={setCategory}
              />
              <SelectComponent
                startIcon={"Sort by:"}
                placeholder={"highest"}
                options={sortFilter}
                value={sortOrder}
                onChange={setSortOrder}
              />
              <ButtonComponent
                size="sm"
                variant={"outlined"}
                label={"Clear Filters"}
                onClick={clearFilters}
              />
            </Box>
          </Stack>
        </ContainerComponent>
        <ContainerComponent>
          <PaginatedTable
            tableTitle={"List of items"}
            tableDesc={
              "Inventory items with stocks are shown here real-time. You can also add a new item name if necessary."
            }
            columns={columns}
            rows={filteredInventory(inventory)}
            actions={<ViewIcon />}
            btnLabel={"Add new item name"}
            actionBtns={
              <Stack direction="row" spacing={1}>
                <ButtonComponent
                  variant={"outlined"}
                  label="Generate report"
                  size="lg"
                />
                <ButtonComponent label="Add new item name" />
              </Stack>
            }
          />
        </ContainerComponent>
      </Stack>
    </Fragment>
  );
};

export default Inventory;