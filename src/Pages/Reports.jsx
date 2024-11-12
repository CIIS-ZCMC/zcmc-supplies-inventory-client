import { Fragment, useEffect, useState } from "react";
import { user } from "../Data/index";
import Header from "../Layout/Header/Header";
import ContainerComponent from "../Components/Container/ContainerComponent";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/joy";
import ButtonComponent from "../Components/ButtonComponent";
import TabComponent from "../Components/TabComponent";
import TableComponent from "../Components/Table/TableComponent";
import {
  consumedHeader,
  disposalHeader,
  itemHeader,
  nearExpHeader,
  reorderHeader,
  startingBalHeader,
  sufficientHeader,
  unconsumedHeader,
  zeroStocksHeader,
} from "../Data/TableHeader";
import useReportsHook from "../Hooks/ReportsHook";
import useModalHook from "../Hooks/ModalHook";
import ModalComponent from "../Components/Dialogs/ModalComponent";
import SelectComponent from "../Components/Form/SelectComponent";
import useFilterHook from "../Hooks/FilterHook";

const categoryFilter = [
  { name: "Janitorial", value: "Janitorial" },
  { name: "Medical", value: "Medical" },
  { name: "Office", value: "Office" },
];

function Reports(props) {
  const theme = useTheme();
  const {
    item_count,
    starting_bal,
    near_exp,
    zero_stocks,
    consumed,
    sufficient_sup,
    unconsumed,
    reorder,
    disposal,
    getItemCount,
    getStartingBal,
    getNearExp,
    getZeroStocks,
    getConsumed,
    getSufficient,
    getUnconsumed,
    getReorder,
    getDisposal,
  } = useReportsHook();
  const { isOpen, openModal, closeModal } = useModalHook();
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
  const pageDetails = {
    title: "Reports",
    description:
      "Generate different types of reports here on-demand to fit your data-intensive requirements.",
    pagePath: "/reports",
  };
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const tabsData = [
    {
      label: "Item count",
      content: (
        <TableComponent
          columns={itemHeader}
          title={"Item count"}
          filterBtns={
            <SelectComponent
              startIcon={"Sort by:"}
              placeholder={"category"}
              options={categoryFilter}
              value={selectedCategory}
              onChange={setCategory}
            />
          }
          rows={filteredInventory(item_count)}
        />
      ),
      rows: filteredInventory(item_count),
      desc: "the number of balances and consumption.",
    },
    {
      label: "Starting balance",
      content: (
        <TableComponent
          columns={startingBalHeader}
          rows={starting_bal}
          title={"Starting balance"}
        />
      ),
      rows: starting_bal,
      desc: "starting balance of 0 upon start of the year.",
    },
    {
      label: "Near expiration date",
      content: (
        <TableComponent
          columns={nearExpHeader}
          rows={near_exp}
          title={"Near expiration date"}
        />
      ),
      rows: near_exp,
      desc: "less than 4 months remaining prior date of expiry.",
    },
    {
      label: "Zero stocks",
      content: (
        <TableComponent
          columns={zeroStocksHeader}
          rows={zero_stocks}
          title={"Zero stocks"}
        />
      ),
      rows: zero_stocks,
      desc: "zero starting balance, no IAR up to this moment and with zero current balance.",
    },
    {
      label: "Most consumed items",
      content: (
        <TableComponent
          columns={consumedHeader}
          rows={consumed}
          title={"Most consumed items"}
        />
      ),
      rows: consumed,
      desc: "its number of average monthly consumption",
    },
    {
      label: "Items with sufficient stocks",
      content: (
        <TableComponent
          columns={sufficientHeader}
          rows={sufficient_sup}
          title={"Items with sufficient stocks"}
        />
      ),
      rows: sufficient_sup,
      desc: "those with sufficient stocks having months left to consume of greater than 5 months",
    },
    {
      label: "Unconsumed without RIS",
      content: (
        <TableComponent
          columns={unconsumedHeader}
          rows={unconsumed}
          title={"Unconsumed without RIS"}
        />
      ),
      rows: unconsumed,
      desc: "those with sufficient stocks having months left to consume of greater than 5 months but with no RIS requests",
    },
    {
      label: "Reorder items",
      content: (
        <TableComponent
          columns={reorderHeader}
          rows={reorder}
          title={"Reorder items"}
        />
      ),
      rows: reorder,
      desc: "those below the 7-month threshold (number of months left to consume)",
    },
    {
      label: "For disposal",
      content: (
        <TableComponent
          columns={disposalHeader}
          rows={disposal}
          title={"or disposal"}
        />
      ),
      rows: disposal,
      desc: "those marked on RIS requests with assigned office to WMR.",
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      getItemCount();
      getStartingBal();
      getNearExp();
      getZeroStocks();
      getConsumed();
      getSufficient();
      getUnconsumed();
      getReorder();
      getDisposal();
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [
    getItemCount,
    getStartingBal,
    getNearExp,
    getZeroStocks,
    getConsumed,
    getSufficient,
    getUnconsumed,
    getReorder,
    getDisposal,
  ]);
  return (
    <Fragment>
      <Header pageDetails={pageDetails} data={user} />
      <ContainerComponent
        marginTop={30}
        title={"System-generated reports"}
        description={`See how resource supplies were accumulated, consumed and moved in
              your organization’s inventory.`}
        actions={
          <Stack direction="row" spacing={1}>
            <ButtonComponent
              variant={"outlined"}
              label={"View report sumamry"}
            />
            <ButtonComponent label={"Generate report"} onClick={openModal} />
          </Stack>
        }
      >
        <TabComponent
          tabs={tabsData}
          onTabChange={(index) => setSelectedTabIndex(index)}
          withTabDesc
        />
      </ContainerComponent>

      <ModalComponent
        isOpen={isOpen}
        handleClose={closeModal}
        title="Inventory report summary"
        description={
          "Describe how would you like to release items from your inventory. All fields are required."
        }
        content={
          <>
            <Stack spacing={1}>
              <Typography level="title-sm">
                Your Spreadsheet report includes:
              </Typography>
              <Stack
                sx={{
                  border: `1px solid ${theme.palette.custom.buttonBg}`,
                  p: 2,
                  borderRadius: 10,
                }}
              >
                <Typography level="title-md" fontWeight={600}>
                  Inventory item count
                </Typography>
                <Typography level="body-md">
                  See the list of items with its{" "}
                  <b style={{ color: "#225524" }}>current balance.</b>
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography level="body-sm">
                    Total number of included items:
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{ color: "#225524" }}
                    textAlign="right"
                  >
                    {tabsData[selectedTabIndex].rows.length} items
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </>
        }
      />
    </Fragment>
  );
}

export default Reports;
