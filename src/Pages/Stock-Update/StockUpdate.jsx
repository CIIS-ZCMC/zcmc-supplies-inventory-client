import React, { useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack } from '@mui/joy';

import { SearchIcon, ViewIcon } from 'lucide-react';

//hooks
import useFilterHook from '../../Hooks/FilterHook';
import useSnackbarHook from '../../Hooks/AlertHook';
import useReceivingHook from '../../Hooks/ReceivingHook';
import useStockUpdateHook from '../../Hooks/StockUpdateHook';

//layouts
import Header from '../../Layout/Header/Header';
import ContainerComponent from '../../Components/Container/ContainerComponent';
import InputComponent from '../../Components/Form/InputComponent';
import SelectComponent from '../../Components/Form/SelectComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import PaginatedTable from '../../Components/Table/PaginatedTable';
import ModalComponent from '../../Components/Dialogs/ModalComponent';
import SnackbarComponent from '../../Components/SnackbarComponent';

// custom components
import FormDialog from '../../Layout/StockUpdate/FormDialog';

import { user, categoryFilter } from '../../Data/index';
import { updateStockHeader } from '../../Data/TableHeader';

const StockUpdate = () => {
    const { getStockUpdateList } = useStockUpdateHook();
    const { open, message, color, variant, anchor, showSnackbar, closeSnackbar, } = useSnackbarHook();
    const { selectedCategory, setCategory, filteredInventory, clearFilters, setSearchTerm, searchTerm } = useFilterHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['stockin'],
        queryFn: getStockUpdateList,
    })

    //local states
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const pageDetails = {
        title: 'Stock Update',
        description: ""
    }

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false)
    }

    const stockinData = useMemo(() => data?.data || [], [data]);

    useEffect(() => {
        console.log(stockinData)
    }, [stockinData])

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
                        columns={updateStockHeader}
                        rows={filteredInventory(stockinData)}
                        actions={<ViewIcon />}
                        loading={isLoading}
                        actionBtns={
                            <Stack direction="row" spacing={1}>
                                {/* <ButtonComponent
                                    variant={"outlined"}
                                    label="Generate report"
                                    size="lg"
                                    onClick={generateReport}
                                /> */}
                                <ButtonComponent label="New Stock Update" onClick={handleDialogOpen} />
                            </Stack>
                        }
                        viewModal={true}
                    // viewModalContent={handleViewDialogOpen}
                    />
                </ContainerComponent>
            </Stack>

            {/* stock update form */}
            <ModalComponent
                isOpen={isDialogOpen}
                handleClose={handleDialogClose}
                content={<FormDialog open={open} message={message} color={color} showSnackbar={showSnackbar} handleDialogClose={handleDialogClose} />}
                actionBtns={false}
                title="Stock update"
            // description={"Describe how would you like to release items from your inventory. All fields are required."}
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

export default StockUpdate