import React, { Fragment, useEffect, useState } from "react";
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
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PurchaseOrderHeader } from "../../Data/TableHeader";
import { SquareArrowOutUpRight, Pencil } from "lucide-react";
import useSelectedRow from "../../Store/SelectedRowStore";
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
  { id: "id", label: "#", width: "5%" },
  { id: "supply_name", label: "Item Name", width: "30%" },
  { id: "category_name", label: "Category" },
  { id: "unit_name", label: "Unit" },
  { id: "quantity", label: "Quantity", width: "10%" },
  { id: "actions", label: "Actions", width: "5%" },
];

const PurchaseReq = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { inventory, getPurchaseOrders } = useInventoryHook();
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
  const {setSelectedPO} = useSelectedRow();

  const theme = useTheme();

  const pageDetails = {
    title: "Purchase Orders Information Tagging",
    description:
      "Enhance purchase request records by tagging critical financial information, including available funds and ORS/BURS numbers.",
    pagePath: "/purchase-order",
  };

  const navigateToItemSupplies = () => {
    navigate("/libraries");
  };

  const { data, isLoading, error } = useQuery({
    queryKey: "purchased_orders",
    queryFn: getPurchaseOrders,
  });

  const purchaseORderData = data?.data;

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
      
            <InputComponent
              label="Find a slip"
              placeholder="Find by item name, category, unit"
              startIcon={<SearchIcon />}
              value={searchTerm}
              setValue={setSearchTerm}
              width={300}
              // action={{
              //   label: "Search",
              //   onClick: () => console.log("searching..."),
              // }}
            />
            <Box display="flex" gap={1}>
              {/* <SelectComponent
                startIcon={"Sort by:"}
                placeholder={"category"}
                options={categoryFilter}
                value={selectedCategory}
                onChange={setCategory}
              /> */}
              <SelectComponent
                startIcon={"Sort by:"}
                placeholder={"highest"}
                options={sortFilter}
                value={sortOrder}
                onChange={setSortOrder}
              />
              <ButtonComponent
                size="sm"
                variant={"soft"}
                label={"Clear Filters"}
                onClick={clearFilters}
              />
            </Box>
          </Stack>
        </ContainerComponent>
        <ContainerComponent>
          {id ? (
            <Outlet />
          ) : (
            <PaginatedTable
              customAction={true}
              handleCustomAction={(perRow)=>{
                return <>
               <ButtonComponent
                 startDecorator={
                            <SquareArrowOutUpRight size={"1rem"} />                                             }
                          variant={"plain"}
                          size="sm"
                          onClick={()=>{
                           setSelectedPO(perRow)
                           navigate(`${perRow.id}`)
                          }}
                      />

                      
                </>
              }}
             // viewable={true}
              loading={isLoading}
              tableTitle={"List of purchased orders"}
              tableDesc={
                "Select items to add tagging of : ORS/BURS no., Amount etc.."
              }
              columns={PurchaseOrderHeader}
              rows={purchaseORderData}
              actions={<ViewIcon />}
              btnLabel={"Add new item name"}
              actionBtns={
                <Stack direction="row" spacing={1} mt={2}>
                  <ButtonComponent
                    
                    variant={"outlined"}
                    label="Generate report"
                    size="lg"
                  />
                  {/* <ButtonComponent
                    label="Add new item name"
                    onClick={navigateToItemSupplies}
                  /> */}
                </Stack>
              }
              icon={
                <MdOutlineLibraryAdd
                  style={{
                    verticalAlign: "middle",
                    color: theme.palette.custom.buttonBg,
                    fontSize: 30,
                    backgroundColor: "#EBF2F9",
                    padding: 10,
                    borderRadius: 5,
                  }}
                />
              }
              // label={"Fill-up your inventory by creating a New item"}
              // desc={`Your inventory is currently empty. To manage it, you’ll need to add items. You can use
              //     inventory items in filling-up IARs and RIS requests.`}
              // btn={<ButtonComponent label={"Create new item"} onClick={"/"} />}
            />
          )}
        </ContainerComponent>
      </Stack>
    </Fragment>
  );
};

export default PurchaseReq;
