import { useEffect, useState } from "react";

import { Grid, Box, Typography, Stack } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from 'xlsx'
import { ViewIcon, SearchIcon } from "lucide-react";

//hooks
import useSuppliesHook from "../../Hooks/SuppliesHook";
import useReleasingHook from "../../Hooks/ReleasingHook";
import useSnackbarHook from "../../Hooks/AlertHook";
import useFilterHook from "../../Hooks/FilterHook";

//layouts
import Header from "../../Layout/Header/Header";
import SearchFilter from "../../Layout/SearchFilter/SearchFilter";
import Table from "../../Layout/Table/Table";

//custom components
import DatePickerComponent from "../../Components/Form/DatePickerComponent";
import SelectComponent from "../../Components/Form/SelectComponent";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import FormDialog from "../../Layout/Releasing/FormDialog";
import SnackbarComponent from "../../Components/SnackbarComponent";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import ButtonComponent from "../../Components/ButtonComponent";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import InputComponent from "../../Components/Form/InputComponent";

//datas
import { items, user } from "../../Data/index";
import { releasingHeader } from "../../Data/TableHeader";
import { categoryFilter } from "../../Data/index";

const Releasing = () => {
  // local States
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Step 1", "Step 2", "Step 3"];
  const [snackbar, setSnackbar] = useState({
    open: false,
    color: "",
    message: "",
  });

  const { getStockOut } = useReleasingHook();
  const { open, message, color, variant, anchor, showSnackbar, closeSnackbar } = useSnackbarHook();
  const { selectedCategory, setCategory, filteredInventory, clearFilters, searchTerm, setSearchTerm } = useFilterHook();

  const { data, isLoading, error,status } = useQuery({
    queryKey: ["stockouts"],
    queryFn: getStockOut,
  });

  const stockoutData = data?.data ?? [];

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const pageDetails = {
    title: "Requisition and issue slip",
    description: "Releasing item's ( RIS )",
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false });
  };
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

    const handleSaveRIS = () => {
        alert('RIS TO BE SAVED')
        setIsDialogOpen(false)
        //add snackbar indication item was saved
    }

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setActiveStep(0);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const generateReport = () => {

    try {
      const worksheet = XLSX.utils.json_to_sheet(stockoutData); //convert jsonData to worksheet
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

      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet
      )

      XLSX.writeFile(
        workbook,
        `stockout_repost.xlsx`
      )
      showSnackbar("Report generated successfully!", "success", "filled");
    } catch (error) {
      showSnackbar(
        "Failed to generate the report. Please try again.",
        "danger",
        "filled"
      );
    }
  }

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
              placeholder="Find by RIS number, office or date"
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
          <PaginatedTable
            tableTitle={"List of stock-out transactions"}
            tableDesc={""}
            columns={releasingHeader}
            rows={filteredInventory(stockoutData)}
            loading={isLoading}
            actions={<ViewIcon />}
            actionBtns={
              <Stack direction="row" spacing={1} mt={2}>
                <ButtonComponent
                  variant={"outlined"}
                  label="Generate report"
                  size="lg"
                  onClick={generateReport}
                />
                <ButtonComponent label="New RIS" onClick={handleDialogOpen} />
              </Stack>
            }
            viewable={true}
          />
        </ContainerComponent>

        <ModalComponent
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          content={
            <FormDialog
              open={open}
              message={message}
              color={color}
              showSnackbar={showSnackbar}
              handleNext={handleNext}
              handleBack={handleBack}
              steps={steps}
              activeStep={activeStep}
              handleDialogClose={handleDialogClose}
            />
          }
          title={`Record a new Requisition and Issue slip`}
          description={
            "Describe how would you like to release items from your inventory. All fields are required."
          }
        />

        {/* <SnackbarComponent
          open={snackbar.open}
          onClose={handleSnackbarClose}
          color={snackbar.color}
          message={snackbar.message}
          variant="solid"
          anchor={{ vertical: "top", horizontal: "right" }}
        /> */}

        <SnackbarComponent
          open={open}
          onClose={closeSnackbar}
          anchor={anchor}
          color={color}
          variant={variant}
          message={message}
        />

      </Stack>
    </>
  );
};

export default Releasing;
