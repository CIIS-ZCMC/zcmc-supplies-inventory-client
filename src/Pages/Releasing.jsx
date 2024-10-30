import { useState } from "react";

import { Grid, Box, Typography, Stack } from "@mui/joy";

//layouts
import Header from "../Layout/Header/Header";
import SearchFilter from "../Layout/SearchFilter/SearchFilter";
import Table from "../Layout/Table/Table";

//custom components
import DatePickerComponent from "../Components/Form/DatePickerComponent";
import SelectComponent from "../Components/Form/SelectComponent";
import ModalComponent from "../Components/Dialogs/ModalComponent";
import AutoCompleteComponent from "../Components/Form/AutoCompleteComponent";
import InputComponent from "../Components/Form/InputComponent";

//datas
import { items, user } from '../Data/index'
import { receivingTableHeader } from '../Data/TableHeader'

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

const Releasing = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const pageDetails = {
        title: "Requisition and issue slip",
        description: "this is a sample description"
    }

    const handleDialogOpen = () => {
        setIsDialogOpen(true)
    }

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
                <SelectComponent placeholder="Select Category" options={categoryFilter} />
            </Box>
            <Box>
                <SelectComponent placeholder="Sort By" options={sortFilter} />
            </Box>
        </>
    );

    const ModalContent = () => (
        <>
            <Box>

                <AutoCompleteComponent
                    placeholder={'Search Item...'}
                    label={'Item Name'}
                />

                <Typography
                    mt={2}
                >
                    Item’s current stock level: 1,200/3,000 (40% remaining)
                </Typography>
                <Box mt={4} >
                    <Stack direction='row' spacing={3} >
                        <Box mt={2}>
                            <SelectComponent
                                placeholder="Select a source"
                                label='Source'
                                options={categoryFilter}
                                width={300}
                            />
                        </Box>

                        <Box mt={2}>
                            <SelectComponent
                                placeholder="Select an office"
                                label='Requesting Office'
                                options={categoryFilter}
                                width={300}
                            />
                        </Box>

                    </Stack>

                    <Stack mt={2} direction='row' spacing={3} >
                        <DatePickerComponent
                            width={300}
                            label='RIS date'
                            placeholder='xxxx.xx.xx'
                        />
                        <InputComponent
                            label="RIS number"
                            placeholder='xxx.xxx.xxx'
                            width={300}
                            fullWidth={true}
                        />
                    </Stack>

                    <Box mt={2}>
                        <SelectComponent
                            placeholder="Assign in a category"
                            label='Category'
                            options={categoryFilter}
                        />
                    </Box>

                    <Stack mt={2} direction='row' spacing={3} >

                        <InputComponent
                            label="Quantity Requested"
                            placeholder='xxx.xxx.xxx'
                            width={300}
                            fullWidth={true}
                        />

                        <InputComponent
                            label="Quantity Served"
                            placeholder='xxx.xxx.xxx'
                            width={300}
                            fullWidth={true}
                        />
                    </Stack>

                </Box>

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
                    <Table
                        tableHeader={receivingTableHeader}
                        tableData={items}
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
                content={<ModalContent />}
                leftButtonLabel={'Cancel'}
                leftButtonAction={handleDialogClose}
                rightButtonLabel={'Save'}
                rightButtonAction={handleSaveRIS}
                title="Record a new Requisition and Issue slip"
                description={"Describe how would you like to release items from your inventory. All fields are required."}
            />
        </>
    )
}

export default Releasing