import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../Components/PageSetup/PageTitle";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/joy";
import ButtonComponent from "../../Components/ButtonComponent";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import InputComponent from "../../Components/Form/InputComponent";
import {
  ArrowDown,
  ArrowUp,
  FileSymlink,
  SearchIcon,
  ViewIcon,
  ExternalLink,
} from "lucide-react";
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
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import ViewTaggedPurchasedOrder from "./ViewTaggedPurchasedOrder";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { Scroll, ScrollText, Tag } from "lucide-react";
import { CAF } from "./CAF";

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
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
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
    searchkey,
    setSearchKey,
  } = useFilterHook();
  const { setSelectedPO } = useSelectedRow();

  const theme = useTheme();

  const pageDetails = {
    title: "Purchase Request/Orders Information Tagging",
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

  const purchaseORderData = searchkey
    ? data?.data.filter((x) => {
        return x.PO_number.toLowerCase().includes(searchkey.toLowerCase());
      })
    : data?.data;

  const handleViewDialogClose = (row) => {
    setIsViewDialogOpen(false);
  };
  console.log(purchaseORderData);

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
              placeholder="Search PO# "
              startIcon={<SearchIcon />}
              value={searchkey}
              setValue={setSearchKey}
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
            <>
              <Tabs aria-label="Basic tabs" defaultValue={0}>
                <TabList>
                  <Tab>
                    <Typography
                      level="body-xs"
                      sx={{ fontWeight: "bold" }}
                      startDecorator={<Scroll size={16} />}
                    >
                      Purchased Requests
                    </Typography>
                  </Tab>
                  <Tab>
                    <Typography
                      level="body-xs"
                      sx={{ fontWeight: "bold" }}
                      startDecorator={<ScrollText size={16} />}
                    >
                      Purchased Orders
                    </Typography>
                  </Tab>
                  {/* <Tab>
                    <Typography
                      level="body-xs"
                      sx={{ fontWeight: "bold" }}
                      startDecorator={<Tag size={16} />}
                    >
                      Tagged Records
                    </Typography>
                  </Tab> */}
                </TabList>
                <TabPanel value={0}>
                  <CAF />
                </TabPanel>
                <TabPanel value={1}>
                  <PaginatedTable
                    customAction={true}
                    handleCustomAction={(perRow) => {
                      return (
                        <>
                          <ButtonComponent
                            startDecorator={
                              <SquareArrowOutUpRight size={"1rem"} />
                            }
                            variant={"plain"}
                            size="sm"
                            onClick={() => {
                              setSelectedPO(perRow);
                              navigate(`${perRow.PO_number}`);
                            }}
                          />
                        </>
                      );
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
                        <ButtonComponent
                          variant={"soft"}
                          endDecorator={<ExternalLink size={17} />}
                          label=" PO Tagged Records"
                          onClick={() => {
                            setIsViewDialogOpen(true);
                          }}
                        />
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
                  />
                </TabPanel>
                <TabPanel value={2}></TabPanel>
              </Tabs>
            </>
          )}
        </ContainerComponent>
      </Stack>

      <ModalComponent
        isOpen={isViewDialogOpen}
        handleClose={handleViewDialogClose}
        content={<ViewTaggedPurchasedOrder />}
        actionBtns={false}
        title={"Tagged Purchased Order(s)"}
        description={"Complete information about tagged PO's."}
      />
    </Fragment>
  );
};

export default PurchaseReq;
