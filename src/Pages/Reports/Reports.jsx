import { Fragment, useEffect, useState } from "react";
import { user } from "../../Data/index";
import Header from "../../Layout/Header/Header";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/joy";
import ButtonComponent from "../../Components/ButtonComponent";
import TabComponent from "../../Components/TabComponent";
import TableComponent from "../../Components/Table/TableComponent";
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
} from "../../Data/TableHeader";
import useReportsHook from "../../Hooks/ReportsHook";
import useModalHook from "../../Hooks/ModalHook";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import SelectComponent from "../../Components/Form/SelectComponent";
import useFilterHook from "../../Hooks/FilterHook";
import { useLocation } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
import DatePickerComponent from "../../Components/Form/DatePickerComponent";
import YearSelect from "../../Components/Form/SelectYearComponent";
import * as XLSX from "xlsx";

export const FilterInfo = ({ label }) => {
  return (
    <Box display="flex" alignItems="center">
      <BiCheckCircle style={{ color: "green" }} />
      <Typography level="body-sm" ml={1}>
        {label}
      </Typography>
    </Box>
  );
};

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
    dates,
    getItemCount,
    getStartingBal,
    getNearExp,
    getZeroStocks,
    getConsumed,
    getSufficient,
    getUnconsumed,
    getReorder,
    getDisposal,
    getDate,
  } = useReportsHook();

  const { isOpen, openModal, closeModal } = useModalHook();

  const {
    filteredInventory,
    selectedCategory,
    month,
    year,
    setCategory,
    setMonth,
    setYear,
    clearFilters,
  } = useFilterHook();

  const location = useLocation();

  const currentPath = location.pathname;

  const pageDetails = {
    title: "Reports",
    description:
      "Generate different types of reports here on-demand to fit your data-intensive requirements.",
    pagePath: `${currentPath}`,
  };

  const [loading, setLoading] = useState(true);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const categoryFilter = [
    { name: "Janitorial", value: "Janitorial" },
    { name: "Medical", value: "Medical" },
    { name: "Office", value: "Office" },
  ];

  const tabsData = [
    {
      label: "Item count",
      columns: itemHeader,
      rows: filteredInventory(item_count),
      filterBtns: (
        <SelectComponent
          startIcon={"Sort by:"}
          placeholder={"category"}
          options={categoryFilter}
          value={selectedCategory}
          onChange={setCategory}
        />
      ),
      desc: "the number of balances and consumption.",
    },
    {
      label: "Starting balance",
      columns: startingBalHeader,
      rows: filteredInventory(starting_bal),
      filterBtns: (
        <SelectComponent
          startIcon={"Sort by:"}
          placeholder={"category"}
          options={categoryFilter}
          value={selectedCategory}
          onChange={setCategory}
        />
      ),
      desc: "starting balance of 0 upon start of the year.",
    },
    {
      label: "Near expiration date",
      columns: nearExpHeader,
      rows: filteredInventory(near_exp),
      filterBtns: (
        <SelectComponent
          startIcon={"Sort by:"}
          placeholder={"category"}
          options={categoryFilter}
          value={selectedCategory}
          onChange={setCategory}
        />
      ),
      desc: "less than 4 months remaining prior date of expiry.",
    },
    {
      label: "Zero stocks",
      columns: zeroStocksHeader,
      rows: filteredInventory(zero_stocks),
      filterBtns: (
        <SelectComponent
          startIcon={"Sort by:"}
          placeholder={"category"}
          options={categoryFilter}
          value={selectedCategory}
          onChange={setCategory}
        />
      ),
      desc: "zero starting balance, no IAR up to this moment and with zero current balance.",
    },
    {
      label: "Most consumed items",
      columns: consumedHeader,
      rows: filteredInventory(consumed),
      filterBtns: (
        <>
          <YearSelect
            value={year}
            onChange={setYear}
            actions={(year) => getConsumed(year)}
          />{" "}
          {/* Default to 2024 */}
          <SelectComponent
            startIcon={"Sort by:"}
            placeholder={"category"}
            options={categoryFilter}
            value={selectedCategory}
            onChange={setCategory}
          />
        </>
      ),
      desc: "its number of average monthly consumption",
    },
    {
      label: "Items with sufficient stocks",
      columns: sufficientHeader,
      rows: filteredInventory(sufficient_sup),
      filterBtns: (
        <SelectComponent
          startIcon={"Sort by:"}
          placeholder={"category"}
          options={categoryFilter}
          value={selectedCategory}
          onChange={setCategory}
        />
      ),
      desc: "those with sufficient stocks having months left to consume of greater than 5 months",
    },
    {
      label: "Unconsumed without RIS",
      columns: unconsumedHeader,
      rows: filteredInventory(unconsumed),
      filterBtns: (
        <>
          <YearSelect
            value={year}
            onChange={setYear}
            actions={(year) => getUnconsumed(year)}
          />
          <SelectComponent
            startIcon={"Sort by:"}
            placeholder={"category"}
            options={categoryFilter}
            value={selectedCategory}
            onChange={setCategory}
          />
        </>
      ),
      desc: "those with sufficient stocks having months left to consume of greater than 5 months but with no RIS requests",
    },
    {
      label: "Reorder items",
      columns: reorderHeader,
      rows: filteredInventory(reorder),
      filterBtns: (
        <>
          <DatePickerComponent
            type="month"
            startDecorator={"Month:"}
            value={month}
            onChange={setMonth}
          />
          <SelectComponent
            startIcon={"Sort by:"}
            placeholder={"category"}
            options={categoryFilter}
            value={selectedCategory}
            onChange={setCategory}
          />
        </>
      ),
      desc: "those below the 7-month threshold (number of months left to consume)",
    },
    {
      label: "For disposal",
      columns: disposalHeader,
      rows: filteredInventory(disposal),
      filterBtns: (
        <>
          <DatePickerComponent
            type="month"
            startDecorator={"Month:"}
            value={month}
            onChange={setMonth}
          />
          <SelectComponent
            startIcon={"Sort by:"}
            placeholder={"category"}
            options={categoryFilter}
            value={selectedCategory}
            onChange={setCategory}
          />
        </>
      ),
      desc: "those marked on RIS requests with assigned office to WMR.",
    },
  ];

  const expire_legends = [
    { label: "1 month", color: "red" },
    { label: "2 months", color: "yellow" },
    { label: "3 months", color: "green" },
  ];

  const stock_legends = [
    { label: "Out of stock", color: "red" },
    { label: "Low stock", color: "orange" },
    { label: "Moderate", color: "yellow" },
    { label: "Sufficient", color: "green" },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setYear(2024);
      if (selectedTabIndex === 4) {
        getConsumed(2024);
      }
      if (selectedTabIndex === 6) {
        getUnconsumed(2024);
      }
      // Fetch data for 2024

      getItemCount();
      getStartingBal();
      getNearExp();
      getZeroStocks();
      getSufficient();
      getReorder();
      getDisposal();
      getDate();
      setLoading(false);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const generateExcel = () => {
    const data = tabsData[selectedTabIndex].rows; // Get the current tab's rows
    const worksheet = XLSX.utils.json_to_sheet(data); // Convert rows to worksheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      tabsData[selectedTabIndex].label
    ); // Append sheet to workbook

    // Generate the Excel file and trigger download
    XLSX.writeFile(workbook, `${tabsData[selectedTabIndex].label}_report.xlsx`);
  };
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
          onTabChange={(index) => {
            setSelectedTabIndex(index);
          }}
          selectedTabIndex={selectedTabIndex}
          loading={loading}
          clearFilters={clearFilters}
          otherDetails={
            selectedTabIndex === 2 ? (
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography level="body-sm">
                  Legend (by number of months left prior expiry):
                </Typography>
                {expire_legends.map((e, i) => (
                  <>
                    <Box
                      bgcolor="white"
                      padding={0.5}
                      borderRadius={100}
                      style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                    >
                      <Box
                        borderRadius={100}
                        bgcolor={e.color}
                        width={15}
                        height={15}
                      ></Box>
                    </Box>

                    <Typography key={i} level="body-sm">
                      {e.label}
                    </Typography>
                  </>
                ))}
              </Stack>
            ) : selectedTabIndex === 0 || selectedTabIndex === 7 ? (
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography level="body-sm">Legend:</Typography>
                {stock_legends.map((e, i) => (
                  <>
                    <Box
                      bgcolor="white"
                      padding={0.5}
                      borderRadius={100}
                      style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                    >
                      <Box
                        borderRadius={100}
                        bgcolor={e.color}
                        width={15}
                        height={15}
                      ></Box>
                    </Box>

                    <Typography key={i} level="body-sm">
                      {e.label}
                    </Typography>
                  </>
                ))}
              </Stack>
            ) : (
              ""
            )
          }
          withTabDesc
          isTable
        />
      </ContainerComponent>

      <ModalComponent
        isOpen={isOpen}
        handleClose={closeModal}
        leftButtonLabel={"Cancel"}
        leftButtonAction={closeModal}
        rightButtonAction={generateExcel}
        rightButtonLabel={"Generate"}
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
              <Stack
                sx={{ border: `1px solid #F0F0F0`, p: 1, borderRadius: 10 }}
              >
                <Typography level="body-md">Applied filters:</Typography>
                {selectedCategory === "" || selectedCategory === null ? (
                  <FilterInfo
                    label={`Fetch and filter items from all categories.`}
                  />
                ) : (
                  <FilterInfo
                    label={`Fetch and filter items from Category: ${selectedCategory}`}
                  />
                )}
                {year ? (
                  <FilterInfo label={`For the year of ${year}`} />
                ) : (
                  <FilterInfo
                    label={`For the entire period from ${dates.start_date} - ${dates.current_date}`}
                  />
                )}
              </Stack>
            </Stack>
          </>
        }
      />
    </Fragment>
  );
}

export default Reports;
