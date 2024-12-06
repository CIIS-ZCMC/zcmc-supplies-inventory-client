import { useEffect, useState } from "react";

import { Grid, Box, Typography, Stack } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from 'xlsx'

import { ViewIcon, SearchIcon } from "lucide-react";

//hooks
import useReceivingHook from "../../Hooks/ReceivingHook";
import useSnackbarHook from "../../Hooks/AlertHook";
import useFilterHook from "../../Hooks/FilterHook";

//layouts
import Header from "../../Layout/Header/Header";
import SearchFilter from "../../Layout/SearchFilter/SearchFilter";
import Table from "../../Layout/Table/Table";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import ButtonComponent from "../../Components/ButtonComponent";
import ContainerComponent from "../../Components/Container/ContainerComponent";

//custom components
import DatePickerComponent from "../../Components/Form/DatePickerComponent";
import SelectComponent from "../../Components/Form/SelectComponent";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import FormDialog from "../../Layout/Receiving/FormDialog";
import SnackbarComponent from "../../Components/SnackbarComponent";
import InputComponent from "../../Components/Form/InputComponent";

//datas
import { user } from '../../Data/index';
import { receivingHeader } from '../../Data/TableHeader';
import ReceivingDetails from "./ReceivingDetails";
import { categoryFilter } from "../../Data/index";

const ReceivingOverview = () => {
    const { getStockIn } = useReceivingHook();
    const { open, message, color, variant, anchor, showSnackbar, closeSnackbar, } = useSnackbarHook();
    const { selectedCategory, setCategory, filteredInventory, clearFilters, setSearchTerm, searchTerm } = useFilterHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['stockin'],
        queryFn: getStockIn,
    })

    const stockinData = data?.data

    const [snackbar, setSnackbar] = useState({ open: false, color: '', message: '' })
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);

    const pageDetails = {
        title: "Receiving (IAR Management)",
        description: "all your IARs are shown here, you may open each ont to see more information"
    }

    const handleSnackbarClose = () => {
        setSnackbar({ open: false })
    }

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false)
    }

    const handleViewDialogOpen = (row) => {
        setSelectedRow(row.id)
        setIsViewDialogOpen(true);
    };

    const handleViewDialogClose = (row) => {
        setIsViewDialogOpen(false)
    }

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

            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(
                workbook,
                worksheet
            )

            XLSX.writeFile(
                workbook,
                `stockin_repost.xlsx`
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
                            placeholder="Find by PO, number, IAR number or date"
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
                        tableTitle={"List of stock-in transactions"}
                        tableDesc={"All your IARs are shown here. You may open each one to see more information."}
                        columns={receivingHeader}
                        rows={filteredInventory(stockinData)}
                        actions={<ViewIcon />}
                        actionBtns={
                            <Stack direction="row" spacing={1}>
                                <ButtonComponent
                                    variant={"outlined"}
                                    label="Generate report"
                                    size="lg"
                                    onClick={generateReport}
                                />
                                <ButtonComponent label="New RIS" onClick={handleDialogOpen} />
                            </Stack>
                        }
                        viewModal={true}
                        viewModalContent={handleViewDialogOpen}
                    />
                </ContainerComponent>
            </Stack>

            {/* stock in form */}
            <ModalComponent
                isOpen={isDialogOpen}
                handleClose={handleDialogClose}
                // open, message, color, variant, anchor, showSnackbar, closeSnackbar
                content={<FormDialog open={open} message={message} color={color} showSnackbar={showSnackbar} handleDialogClose={handleDialogClose} />}
                actionBtns={false}
                title="Record a new Requisition and Issue slip"
                description={"Describe how would you like to release items from your inventory. All fields are required."}
            />

            {/* modal overview */}
            <ModalComponent
                isOpen={isViewDialogOpen}
                handleClose={handleViewDialogClose}
                content={<ReceivingDetails urlId={selectedRow} />}
                actionBtns={false}
                title={'Transaction Overview'}
                description={"Complete information about an IAR. This record cannot be edited."}
            />

            <SnackbarComponent
                open={open}
                onClose={closeSnackbar}
                anchor={anchor}
                color={color}
                variant={variant}
                message={message}
            />
        </>
    )
}

export default ReceivingOverview