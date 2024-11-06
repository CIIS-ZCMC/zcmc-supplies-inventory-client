import { useEffect, useState } from "react";

import { Grid, Box, Typography, Stack } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";

//layouts
import Header from "../../Layout/Header/Header";
import SearchFilter from "../../Layout/SearchFilter/SearchFilter";
import Table from "../../Layout/Table/Table";

//custom components
import DatePickerComponent from "../../Components/Form/DatePickerComponent";
import SelectComponent from "../../Components/Form/SelectComponent";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import FormDialog from "../../Layout/Receiving/FormDialog";
import SnackbarComponent from "../../Components/SnackbarComponent";

//datas
import { items, user } from '../../Data/index'
import { receivingTableHeader } from '../../Data/TableHeader'

import useReleasingHook from "../../Hooks/ReleasingHook";

const categoryFilter = [
    { name: 'Option 1', value: 'option 1' },
    { name: 'Option 2', value: 'option 2' },
    { name: 'Option 3', value: 'option 3' }
]

const sortFilter = [
    { name: 'sort option 1', value: 'sort option 1' },
    { name: 'sort option 2', value: 'sort option 2' },
    { name: 'sort option 3', value: 'sort option 3' }
]

const pageDetails = {
    title: "Requisition and issue slip",
    description: "this is a sample description"
}

const ReleasingOverview = () => {

    const { getStockOut } = useReleasingHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['stocks'],
        queryFn: getStockOut // Pass the function reference without parentheses
    });

    const supplies = data?.data

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "success" });

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true)
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false)
    }

    const FilterOptions = () => (
        <>
            <Box mr={2}>
                <DatePickerComponent />
            </Box>
            <Box mr={2}>
                <DatePickerComponent />
            </Box>
            <Box mr={2}>
                <SelectComponent placeholder="Select Category" options={categoryFilter} />
            </Box>
            <Box>
                <SelectComponent placeholder="Sort By" options={sortFilter} />
            </Box>
        </>
    );

    return (
        <>
            <Grid
                container
                spacing={2}
                sx={{
                    flexGrow: 1,
                    justifyContent: 'space-between'
                }}
            >
                {/* Page Header */}
                <Grid item md={12}>
                    <Header
                        pageDetails={pageDetails}
                        data={user}
                    />
                </Grid>

                {/* search and filter */}
                <Grid item md={12}>
                    <SearchFilter>
                        <FilterOptions categoryOptions={categoryFilter} sortOptions={sortFilter} />
                    </SearchFilter>
                </Grid>

                <Grid item md={12}>
                    {/* table */}
                    <Table
                        tableHeader={receivingTableHeader}
                        tableData={supplies}
                        tableTitle="RIS Records"
                        tableSubtitle='This is a subheading. It should add more context to the interaction.'
                        btnLabel='New RIS'
                        onClick={handleDialogOpen}
                    />
                </Grid>
            </Grid>

            <ModalComponent
                isOpen={isDialogOpen}
                handleClose={handleDialogClose}
                content={<FormDialog handleDialogClose={handleDialogClose} showSnackbar={showSnackbar} />}
                title="Record a new Requisition and Issue slip"
                description={"Describe how would you like to release items from your inventory. All fields are required."}
            />

            <SnackbarComponent
                open={snackbar.open}
                onClose={handleSnackbarClose}
                color={snackbar.color}
                message={snackbar.message}
                variant={'solid'}
                anchor={{ vertical: 'top', horizontal: 'center' }}
            />
        </>
    )
}

export default ReleasingOverview