import { useEffect, useState } from "react";

import { Grid, Box, Typography, Stack } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";

import { ViewIcon, SearchIcon } from "lucide-react";

//hooks
import useReceivingHook from "../../Hooks/ReceivingHook";

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
import { items, user } from '../../Data/index';
import { receivingHeader } from '../../Data/TableHeader';

const categoryFilter = [
    { name: "Option 1", value: "option 1" },
    { name: "Option 2", value: "option 2" },
    { name: "Option 3", value: "option 3" },
];

const sortFilter = [
    { name: 'sort option 1', value: 'sort option 1' },
    { name: 'sort option 2', value: 'sort option 2' },
    { name: 'sort option 3', value: 'sort option 3' }
]

const ReceivingOverview = () => {
    const { getStockIn } = useReceivingHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['stockin'],
        queryFn: getStockIn,
    })

    const stockinData = data?.data

    const [snackbar, setSnackbar] = useState({ open: false, color: '', message: '' })
    const [isDialogOpen, setIsDialogOpen] = useState(false)

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

    const handleSaveRIS = () => {
        alert('RIS TO BE SAVED')
        setIsDialogOpen(false)
        //add snackbar indication item was saved
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
                <SelectComponent
                    placeholder="Select Category"
                    options={categoryFilter}
                />
            </Box>
            <Box>
                <SelectComponent placeholder="Sort By" options={sortFilter} />
            </Box>
        </>
    );

    return (
        <>
            <Header pageDetails={pageDetails} data={user} />
            <Stack gap={2} mt={2}>

                {/* search and filter */}
                <ContainerComponent>
                    {/* <SearchFilter>
                        <FilterOptions
                        categoryOptions={categoryFilter}
                        sortOptions={sortFilter}
                        />
                    </SearchFilter> */}

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
                            // value={searchTerm}
                            // setValue={setSearchTerm}
                            width={300}
                        />
                        <Box display="flex" gap={1}>
                            <SelectComponent
                                startIcon={"Sort by:"}
                                placeholder={"category"}
                            // options={categoryFilter}
                            // value={selectedCategory}
                            // onChange={setCategory}
                            />
                            <SelectComponent
                                startIcon={"Sort by:"}
                                placeholder={"highest"}
                            // options={sortFilter}
                            // value={sortOrder}
                            // onChange={setSortOrder}
                            />
                            {/* <ButtonComponent
                                size="sm"
                                variant={"outlined"}
                                label={"Clear Filters"}
                                onClick={clearFilters}
                            /> */}
                        </Box>
                    </Stack>

                </ContainerComponent>

                <ContainerComponent>
                    <PaginatedTable
                        tableTitle={"List of stock-in transactions"}
                        tableDesc={"Sample Table Desription"}
                        columns={receivingHeader}
                        rows={stockinData}
                        actions={<ViewIcon />}
                        actionBtns={
                            <Stack direction="row" spacing={1}>
                                <ButtonComponent
                                    variant={"outlined"}
                                    label="Generate report"
                                    size="lg"
                                />
                                <ButtonComponent label="New RIS" onClick={handleDialogOpen} />
                            </Stack>
                        }
                    />
                </ContainerComponent>
            </Stack>

            {/* <ModalComponent
                isOpen={isViewDialogOpen}
                handle={() => setIsViewDialogOpen(true)}
                content={<ViewDialog />}
                title={'Transaction Overview'}
            /> */}


            {/* stock in form */}
            <ModalComponent
                isOpen={isDialogOpen}
                handleClose={handleDialogClose}
                content={<FormDialog snackbar={snackbar} handleDialogClose={handleDialogClose} setSnackbar={setSnackbar} />}
                actionBtns={false}
                title="Record a new Requisition and Issue slip"
                description={"Describe how would you like to release items from your inventory. All fields are required."}
            />

            <SnackbarComponent
                open={snackbar.open}
                onClose={handleSnackbarClose}
                color={snackbar.color}
                message={snackbar.message}
                variant='solid'
                anchor={{ vertical: 'top', horizontal: 'right' }}
            />
        </>
    )
}

export default ReceivingOverview