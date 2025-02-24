import { Fragment, useEffect, useState } from "react";

import Header from "../../Layout/Header/Header";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import { Box, Divider, Stack, Typography, useTheme, Button } from "@mui/joy";
import ButtonComponent from "../../Components/ButtonComponent";

import ButtonGroupComponent from "../../Components/ButtonGroupComponent";
import InputComponent from "../../Components/Form/InputComponent";

import { SearchIcon } from 'lucide-react';

import { user, sortFilter, filterByYear } from "../../Data/index";

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
  areaSuppliesHeader,
  regularSuppliesHeader,
} from "../../Data/TableHeader";

import useReportsHook from "../../Hooks/ReportsHook";
import useModalHook from "../../Hooks/ModalHook";
import useFilterHook from "../../Hooks/FilterHook";

import ModalComponent from "../../Components/Dialogs/ModalComponent";
import SelectComponent from "../../Components/Form/SelectComponent";

import ItemCount from "../Reports/ItemCount";
import StartingBalance from "./StartingBalance";
import NearExpiration from "./NearExpiration";
import ReorderedItems from "../Reports/ReorderedItems";
import ConsumedItems from "../Reports/ConsumedItems";
import DisposalItems from "../Reports/DisposalItems";
import ZeroStockItems from "../Reports/ZeroStockItems";
import UnconsumedItems from "../Reports/UnconsumedItems";
import WithoutRISItems from "../Reports/WithoutRISItems";
import AreaSupplies from "./AreaSupplies";
import RegularSupplies from "./RegularSupplies";

import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
import DatePickerComponent from "../../Components/Form/DatePickerComponent";
import YearSelect from "../../Components/Form/SelectYearComponent";
import * as XLSX from "xlsx";
import SnackbarComponent from "../../Components/SnackbarComponent";
import useSnackbarHook from "../../Hooks/AlertHook";
import moment from "moment";
import { InfoIcon } from "lucide-react";
import { BsInfoCircle } from "react-icons/bs";
import { MdOfflineBolt, MdOutlineOfflineBolt } from "react-icons/md";



// pages
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

const getCurrentMonthYear = () => {
  return new Date().toISOString().slice(0, 7);
};

function Reports(props) {

  const {
    filteredInventory,
    selectedCategory,
    month,
    year,
    setYear,
    sortOrder,
    setSortOrder,
    searchTerm,
    setSearchTerm,
  } = useFilterHook();

  const {
    dates,
    getUnconsumed,
  } = useReportsHook();


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

  const routes = [
    { id: 1, label: 'Item count', path: 'reports/item-count' },
    { id: 2, label: 'Starting balance', path: 'reports/starting-balance' },
    { id: 3, label: 'Near expiration', path: 'reports/near-expiration' },
    { id: 4, label: 'Zero stocks', path: 'reports/zero-stocks-items' },
    { id: 5, label: 'Most consumed items', path: 'reports/consumed-items' },
    { id: 6, label: 'Unconsumed without RIS', path: 'reports/unconsumed-items' },
    { id: 7, label: 'Reorder Items', path: 'reports/reordered-items' },
    { id: 8, label: 'For Disposal', path: 'reports/disposal-items' },
    { id: 9, label: 'Area Supplies', path: 'reports/area-supplies' },
    { id: 10, label: 'Regular Supplies', path: 'reports/regular-supplies' },
  ]

  // const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const extractedPath = currentPath.split("/").pop();
  const defaultOption = "reordered-items";

  const currentDate = new Date();
  const fullyear = currentDate.getFullYear(); // 2024
  const currentMonth = currentDate.getMonth() + 1; // 11 (November)
  const currentMonthYear = `${fullyear}-${currentMonth < 10 ? "0" + currentMonth : currentMonth}`// "2024-11"

  useEffect(() => {
    // Redirect to the default route if no child route is selected
    if (location.pathname === "/reports") {
      navigate(`/reports/${defaultOption}`);
    }
  }, [location.pathname, navigate, defaultOption]);

  const theme = useTheme();

  const { isOpen, openModal, closeModal } = useModalHook();
  const { open, message, color, variant, anchor, showSnackbar, closeSnackbar } = useSnackbarHook();

  const pageDetails = {
    title: "Reports",
    description:
      "Generate different types of reports here on-demand to fit your data-intensive requirements.",
    pagePath: `${currentPath}`,
  };

  const [selectedOption, setSelectedOption] = useState(routes[0].path);

  const InfoDescription = () => (
    <>
      <InfoIcon size="18px" style={{ color: "#1D70BC" }} />
      <Typography
        sx={{ color: theme.palette.custom.fontLight }}
        fontSize={13}
      >
        Items listed on this tab shows
      </Typography>
    </>
  )

  const handleOnButtonGroupClick = (path) => {
    setSelectedOption(path)
    navigate(`/${path}`)
  };

  useEffect(() => {
    if (year === null) {
      setYear(fullyear)
    }
    console.log(year)
  }, [year])


  // const generateExcel = () => {
  //   try {
  //     const data = tabsData[selectedTabIndex].rows; // Get the current tab's rows
  //     const worksheet = XLSX.utils.json_to_sheet(data); // Convert rows to worksheet

  //     // Define the same width for all columns (in pixels)
  //     const columnWidth = { wpx: 150 }; // Set desired column width in pixels

  //     // Set the same column width for all columns
  //     worksheet["!cols"] = new Array(
  //       data[0] ? Object.keys(data[0]).length : 0
  //     ).fill(columnWidth);

  //     // Enable text wrap for all header cells
  //     const header = worksheet["!cols"] ? worksheet["!cols"] : [];
  //     header.forEach((col, index) => {
  //       if (!col) header[index] = { alignment: { wrapText: true } }; // Apply wrapText to each header
  //     });

  //     // Enable text wrap for all data cells
  //     for (const cellAddress in worksheet) {
  //       const cell = worksheet[cellAddress];
  //       if (cell && cell.v) {
  //         if (!cell.s) {
  //           cell.s = {};
  //         }
  //         cell.s.alignment = { wrapText: true }; // Set text wrap style for the cell
  //       }
  //     }

  //     const workbook = XLSX.utils.book_new(); // Create a new workbook
  //     XLSX.utils.book_append_sheet(
  //       workbook,
  //       worksheet,
  //       tabsData[selectedTabIndex].label
  //     ); // Append sheet to workbook

  //     // Generate the Excel file and trigger download
  //     XLSX.writeFile(
  //       workbook,
  //       `${tabsData[selectedTabIndex].label} _report.xlsx`
  //     );

  //     // Show success snackbar
  //     showSnackbar("Report generated successfully!", "success", "filled");
  //   } catch (error) {
  //     // Show error snackbar if something goes wrong
  //     showSnackbar(
  //       "Failed to generate the report. Please try again.",
  //       "error",
  //       "filled"
  //     );
  //   }
  // };

  // const ButtonOptions = () => routes.map(({ id, label, value }) => (
  //   <Button key={id} value={value} onChange={handleOnButtonGroupClick(value)}>
  //     {label}
  //   </Button>
  // ))

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
            <ButtonComponent label={"Generate report"} onClick={openModal} />
          </Stack>
        }
      >

        <Stack direction="row" justifyContent={"space-between"} alignItems="center" spacing={2} my={1}>
          {/* Search */}
          <InputComponent
            placeholder="Find by names, brands, categories, etc."
            startIcon={<SearchIcon />}
            width={500}
            value={searchTerm}
            setValue={setSearchTerm}
          />

          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={2}
          >

            {!['/reports/near-expiration', '/reports/zero-stocks-items', '/reports/reordered-items', '/reports/disposal-items'].includes(currentPath) && (
              <SelectComponent
                startIcon={"filter by year:"}
                placeholder={"category"}
                options={filterByYear}
                value={year}
                onChange={setYear}
              />
            )}

            <SelectComponent
              startIcon={"Sort by:"}
              placeholder={"category"}
              options={sortFilter}
              value={sortOrder}
              onChange={setSortOrder}
            />
          </Stack>

        </Stack>

        <Stack my={2}>
          <Box>
            <ButtonGroupComponent
              buttonOptions={routes}
              selectedOption={selectedOption}
              onChange={handleOnButtonGroupClick}
            />
          </Box>
        </Stack>

        <Divider></Divider>

        {extractedPath === 'item-count' &&
          <ItemCount
            currentYear={year}
            InfoDescription={InfoDescription}
            filter={filteredInventory}
            header={itemHeader}
          />
        }

        {extractedPath === 'starting-balance' &&
          <StartingBalance
            InfoDescription={InfoDescription}
            filter={filteredInventory}
            header={startingBalHeader}
            currentYear={year}
          />
        }

        {extractedPath === 'near-expiration' &&
          <NearExpiration
            InfoDescription={InfoDescription}
            expire_legends={expire_legends}
            filter={filteredInventory}
            header={nearExpHeader}
          />
        }

        {extractedPath === 'reordered-items' &&
          <ReorderedItems
            InfoDescription={InfoDescription}
            filter={filteredInventory}
            currentMonthYear={currentMonthYear}
            header={reorderHeader}
            stock_legends={stock_legends}
          />}

        {extractedPath === 'consumed-items'
          &&
          <ConsumedItems
            InfoDescription={InfoDescription}
            filter={filteredInventory}
            header={consumedHeader}
            currentYear={year}
          />
        }

        {extractedPath === 'unconsumed-items' &&
          <UnconsumedItems
            InfoDescription={InfoDescription}
            filter={filteredInventory}
            header={unconsumedHeader}
            fullyear={year}
          />
        }

        {extractedPath === 'disposal-items'
          &&
          <DisposalItems
            InfoDescription={InfoDescription}
            filter={filteredInventory}
            header={disposalHeader}
            currentMonthYear={currentMonthYear}
          />
        }
        {extractedPath === 'zero-stocks-items' &&
          <ZeroStockItems
            InfoDescription={InfoDescription}
            filter={filteredInventory}
            header={zeroStocksHeader}
          />
        }


        {extractedPath === 'without-ris-items' &&
          <WithoutRISItems
            filter={filteredInventory}
            header={unconsumedHeader}
            currentYear={fullyear}
          />
        }

        {extractedPath === 'area-supplies' &&
          <AreaSupplies
            InfoDescription={InfoDescription}
            filter={filteredInventory}
            header={areaSuppliesHeader}
            currentYear={fullyear}
          />
        }

        {extractedPath === 'regular-supplies' &&
          <RegularSupplies
            InfoDescription={InfoDescription}
            filter={filteredInventory}
            header={regularSuppliesHeader}
            currentYear={fullyear}
          />
        }
      </ContainerComponent>

      <ModalComponent
        isOpen={isOpen}
        handleClose={closeModal}
        actionBtns={true}
        leftButtonLabel={"Close"}
        leftButtonAction={closeModal}
        // rightButtonAction={generateExcel}
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
                  border: `1px solid ${theme.palette.custom.buttonBg} `,
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
                    {/* {tabsData[selectedTabIndex].rows.length} items */}
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
                    label={`Fetch and filter items from Category: ${selectedCategory} `}
                  />
                )}
                {year ? (
                  <FilterInfo label={`For the year of ${year} `} />
                ) : month ? (
                  <FilterInfo label={`For the month of ${month} `} />
                ) : (
                  <FilterInfo
                    label={`For the entire period from ${moment(
                      dates.start_date
                    ).format("LL")
                      } - ${moment(dates.current_date).format(
                        "LL"
                      )
                      } `}
                  />
                )}
              </Stack>
              <Typography
                display="flex"
                justifyContent="center"
                alignItems="center"
                level="body-sm"
              >
                <BsInfoCircle style={{ marginRight: 1 }} />
                Presented numbers are based on applied filters.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center", // Center horizontally
                  alignItems: "center", // Center vertically
                  height: "100%", // Ensure Box takes full height of its container
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{
                    color: "#225524",
                    bgcolor: "#EFF6EF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 0.5,
                    borderRadius: 5,
                    border: "1px solid #E6E6E6",
                  }}
                >
                  <MdOutlineOfflineBolt /> Reports are generated as (.xlxs)
                </Typography>
              </Box>
            </Stack>
          </>
        }
      />

      <SnackbarComponent
        open={open}
        onClose={closeSnackbar}
        anchor={anchor}
        color={color}
        variant={variant}
        message={message}
      />
    </Fragment>
  );
}

export default Reports;
