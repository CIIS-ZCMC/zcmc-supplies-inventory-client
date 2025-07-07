import { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import {
  ViewIcon,
  SearchIcon,
  Grid2x2Check,
  ChartBar,
  NotepadText,
  ListChecks,
} from "lucide-react";
//hooks
import useReceivingHook from "../../Hooks/ReceivingHook";
import useSnackbarHook from "../../Hooks/AlertHook";
import useFilterHook from "../../Hooks/FilterHook";
//layouts
import Header from "../../Layout/Header/Header";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import ButtonComponent from "../../Components/ButtonComponent";
import ContainerComponent from "../../Components/Container/ContainerComponent";
//custom components
import SelectComponent from "../../Components/Form/SelectComponent";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import FormDialog from "../../Layout/Receiving/FormDialog";
import SnackbarComponent from "../../Components/SnackbarComponent";
import InputComponent from "../../Components/Form/InputComponent";
//datas
import { user, categoryFilter } from "../../Data/index";
import { receivingHeader } from "../../Data/TableHeader";
import ReceivingDetails from "./ReceivingDetails";
import useReportsHook from "../../Hooks/ReportsHook";
import { CiShare1 } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import Checkbox from "@mui/joy/Checkbox";
import usePrintHooks from "../../Hooks/PrintHooks";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { SearchPOForIAR } from "./SearchPOForIAR";
import { IARTransmittal } from "./IARTransmittal";
const ReceivingOverview = () => {
  const { getStockIn, setInitialValues } = useReceivingHook();
  const { open, message, color, variant, anchor, showSnackbar, closeSnackbar } =
    useSnackbarHook();
  const { selectedCategory, setCategory, filteredInventory, clearFilters } =
    useFilterHook();
  const [transmittal, setTransmittal] = useState(false);
  const { PrintIARTransmittal, OpenSmallWindow } = usePrintHooks();

  const { data, isLoading, error } = useQuery({
    queryKey: ["stockin"],
    queryFn: getStockIn,
  });

  const stockinData = data?.data;

  const [filteredData, setFilteredData] = useState(stockinData);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Update filtered data whenever stockinData changes
    setFilteredData(stockinData);
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [generateIARBool, setGenerateIARBool] = useState(false);
  const [selectedIARs, setSelectedIARs] = useState([]);
  const [printIARModal, setPrintIARModal] = useState(false);

  const pageDetails = {
    title: "Receiving (IAR Management)",
    description:
      "all your IARs are shown here, you may open each ont to see more information",
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleViewDialogOpen = (row) => {
    setSelectedRow(row.id);
    setIsViewDialogOpen(true);
  };

  const handleViewDialogClose = (row) => {
    setIsViewDialogOpen(false);
  };

  const generateReport = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(stockinData); //convert jsonData to worksheet

      const columnWidth = { wpx: 150 }; // Set desired column width in pixels

      //Set the same column width for all columns
      worksheet["!cols"] = new Array(
        data[0] ? Object.keys(data[0]).length : 0
      ).fill(columnWidth);

      // Enable text wrap for all header cells
      const header = worksheet["!cols"] ? worksheet["!cols"] : [];
      header.forEach((col, index) => {
        if (!col) header[index] = { alignment: { wrapText: true } }; // Apply wrapText to each header
      });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet);

      XLSX.writeFile(workbook, `stockin_repost.xlsx`);

      showSnackbar("Report generated successfully!", "success", "filled");
    } catch (error) {
      showSnackbar(
        "Failed to generate the report. Please try again.",
        "danger",
        "filled"
      );
    }
  };

  function handleEditRow(data) {
    setInitialValues(data);
  }

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (!term) {
      setFilteredData(stockinData);
    } else {
      const lowercasedTerm = term.toLowerCase();

      const filtered = stockinData.filter((row) =>
        Object.values(row).some(
          (value) =>
            value && value.toString().toLowerCase().includes(lowercasedTerm)
        )
      );

      // const filtered = stockinData.filter((row) =>
      //     (row.ris_no && row.ris_no.toLowerCase().includes(lowercasedTerm)) ||
      //     (row.iar_no && row.iar_no.toLowerCase().includes(lowercasedTerm))
      // );

      setFilteredData(filtered);
    }
  };

  const reportButtonstyle = {
    cursor: "pointer",
    transition: "all ease-in 0.1s",

    "&:hover": {
      fontWeight: "bold",
      color: "#447D9B",
    },
  };

  return (
    <>
      <Header pageDetails={pageDetails} data={user} />

      <Stack gap={2} mt={2}>
        {/* search and filter */}
        <ContainerComponent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            {/* search*/}
            <InputComponent
              label="Find a slip"
              placeholder="Find by PO, number, IAR number or date"
              startIcon={<SearchIcon />}
              value={searchTerm}
              setValue={(value) => handleSearch(value)} // Trigger handleSearch on change
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

              {/* <SelectComponent
                                startIcon={"Sort by:"}
                                placeholder={"highest"}
                                options={sortFilter}
                                value={sortOrder}
                                onChange={setSortOrder}
                            /> */}

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
          <Typography
            level="h4"
            color="primary"
            startDecorator={<Grid2x2Check />}
          >
            GENERATE REPORTS
          </Typography>
          <Typography
            id="decorated-list-demo"
            level="body-xs"
            sx={{ textTransform: "uppercase", fontWeight: "lg", mb: 1 }}
          >
            IAR Reports
          </Typography>
          <List aria-labelledby="decorated-list-demo">
            <ListItem
              sx={reportButtonstyle}
              onClick={() => {
                setPrintIARModal(true);
              }}
            >
              <ListItemDecorator>
                <NotepadText />
              </ListItemDecorator>{" "}
              Inspection and Acceptance Report ( IAR )
            </ListItem>

            <ListItem
              sx={reportButtonstyle}
              onClick={() => setTransmittal(true)}
            >
              <ListItemDecorator>
                <ListChecks />
              </ListItemDecorator>{" "}
              IAR Transmittal
            </ListItem>
          </List>
          {/* <PaginatedTable
            loading={isLoading}
            tableTitle={"List of stock-in transactions"}
            tableDesc={
              "All your IARs are shown here. You may open each one to see more information."
            }
            columns={receivingHeader}
            rows={filteredData}
            actions={<ViewIcon />}
            customAction={generateIARBool ? true : false}
            handleCustomAction={(perRow) => {
              return (
                <>
                  {" "}
                  <Checkbox
                    label="Select"
                    sx={{
                      color: "red",
                      fontSize: "11px",
                      textTransform: "uppercase",
                    }}
                    color="danger"
                    checked={selectedIARs.includes(perRow.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        // Add
                        setSelectedIARs((prev) => [...prev, perRow.id]);
                      } else {
                        // Delete
                        setSelectedIARs((prev) =>
                          prev.filter((id) => id !== perRow.id)
                        );
                      }
                    }}
                  />
                </>
              );
            }}
            actionBtns={
              <>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Stack direction="row" spacing={1} mb={1} mt={2}>
                    <Dropdown>
                      <MenuButton
                        variant="soft"
                        color="primary"
                        sx={{
                          padding: "11px 20px ",
                          fontWeight: "500",
                          fontSize: "13px",
                        }}
                        endDecorator={<IoMdArrowDropdownCircle fontSize={18} />}
                      >
                        Generate Report
                      </MenuButton>
                      <Menu sx={{ fontSize: "14px" }}>
                        <MenuItem onClick={generateReport}>
                          Export to Excel
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setPrintIARModal(true);
                          }}
                        >
                          IAR
                        </MenuItem>
                      </Menu>
                    </Dropdown>

                    <ButtonComponent
                      label="New IAR"
                      onClick={handleDialogOpen}
                    />
                    <ButtonComponent
                      variant={generateIARBool ? "solid" : "plain"}
                      color={generateIARBool ? "danger" : "warning"}
                      label={
                        generateIARBool ? "Cancel" : "Generate IAR Transmittal"
                      }
                      onClick={() => {
                        setTransmittal(true);
                      }}
                      endDecorator={
                        <Box sx={{ padding: "5px 0 0 0" }}>
                          {generateIARBool ? (
                            <MdOutlineCancel fontSize={18} />
                          ) : (
                            <CiShare1 fontSize={18} />
                          )}
                        </Box>
                      }
                    />
                  </Stack>
                  {generateIARBool && (
                    <Box display={"flex"} justifyContent={"flex-end"}>
                      <ButtonComponent
                        color={"success"}
                        disabled={selectedIARs.length >= 1 ? false : true}
                        label={
                          <Stack direction={"column"}>
                            Generate IAR Transmittal{" "}
                            {selectedIARs.length >= 1 && (
                              <span
                                style={{ fontSize: "11px", marginLeft: "10px" }}
                              >
                                ( {selectedIARs.length} Item/s selected )
                              </span>
                            )}
                          </Stack>
                        }
                        onClick={() => {
                          OpenSmallWindow(
                            PrintIARTransmittal(JSON.stringify(selectedIARs))
                          );
                        }}
                      />
                    </Box>
                  )}
                </Stack>
              </>
            }
            viewModal={true}
            viewModalContent={handleViewDialogOpen}
            editable={generateIARBool ? false : true} // Turn this false
            viewable={generateIARBool ? false : true} // Turn this false
            editRow={handleEditRow}
          /> */}
        </ContainerComponent>
      </Stack>

      <ModalComponent
        layout="fullscreen"
        maxWidth={"100wh"}
        isOpen={transmittal}
        handleClose={() => setTransmittal(false)}
        content={<IARTransmittal />}
        actionBtns={false}
        title={"GENERATE - IAR-TRANSMITTAL"}
        description={"Set Params.."}
      />

      {/* stock in form */}
      <ModalComponent
        isOpen={isDialogOpen}
        handleClose={handleDialogClose}
        content={
          <FormDialog
            open={open}
            opening={isDialogOpen}
            message={message}
            color={color}
            showSnackbar={showSnackbar}
            handleDialogClose={handleDialogClose}
          />
        }
        actionBtns={false}
        title="Record a new IAR"
        description={
          "Describe how would you like to release items from your inventory. All fields are required."
        }
      />

      {/* modal overview */}
      <ModalComponent
        isOpen={isViewDialogOpen}
        handleClose={handleViewDialogClose}
        content={<ReceivingDetails urlId={selectedRow} />}
        actionBtns={false}
        title={"Transaction Overview"}
        description={
          "Complete information about an IAR. This record cannot be edited."
        }
      />

      <ModalComponent
        isOpen={printIARModal}
        handleClose={() => setPrintIARModal(false)}
        content={<SearchPOForIAR />}
        actionBtns={false}
        title={"GENERATE - INSPECTION AND ACCEPTANCE REPORT"}
        description={"Search for PO to print.."}
      />
      {/* asdasdasd */}

      <SnackbarComponent
        open={open}
        onClose={closeSnackbar}
        anchor={anchor}
        color={color}
        variant={variant}
        message={message}
      />
    </>
  );
};

export default ReceivingOverview;
