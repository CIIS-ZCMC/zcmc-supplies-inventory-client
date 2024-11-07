import { useEffect, useState } from "react";

import { Grid, Box, Typography, Stack } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";

import { ViewIcon } from "lucide-react";

//hooks
import useSuppliesHook from "../../Hooks/SuppliesHook";

//layouts
import Header from "../../Layout/Header/Header";
import SearchFilter from "../../Layout/SearchFilter/SearchFilter";
import Table from "../../Layout/Table/Table";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import ButtonComponent from "../../Components/ButtonComponent";

//custom components
import DatePickerComponent from "../../Components/Form/DatePickerComponent";
import SelectComponent from "../../Components/Form/SelectComponent";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import FormDialog from "../../Layout/Receiving/FormDialog";
import SnackbarComponent from "../../Components/SnackbarComponent";

//datas
import { items, user } from '../../Data/index'
import { receivingTableHeader } from '../../Data/TableHeader'


const data = [
  {
    id: 1,
    supply_name: 'Alcohol',
    category_name: 'Medical',
    unit_name: 'Box',
    quantity: 0,
    decription: 'Isopropyl 70 %"',
    name: 'Alcohol (Box)'
  }
]

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

const Releasing = () => {
  const { getSupplies } = useSuppliesHook();

  const { data, isLoading, error } = useQuery({
    queryKey: ['supplies'],
    queryFn: getSupplies,
  })

  const suppliedData = data?.data

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const pageDetails = {
    title: "Requisition and issue slip",
    description: "this is a sample description"
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
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        {/* Page Header */}
        <Grid item md={12}>
          <Header pageDetails={pageDetails} data={user} />
        </Grid>

        {/* search and filter */}
        <Grid item md={12}>
          <SearchFilter>
            <FilterOptions
              categoryOptions={categoryFilter}
              sortOptions={sortFilter}
            />
          </SearchFilter>
        </Grid>

        <Grid item md={12}>
          {/* table */}
          {/* <Table
            tableHeader={receivingTableHeader}
            tableData={suppliedData}
            tableTitle="RIS Records"
            tableSubtitle='This is a subheading. It should add more context to the interaction.'
            btnLabel='New RIS'
            onClick={handleDialogOpen}
          /> */}


          <PaginatedTable
            tableTitle={"List of items"}
            // tableDesc={
            //   "Inventory items with stocks are shown here real-time. You can also add a new item name if necessary."
            // }
            columns={receivingTableHeader}
            rows={suppliedData}
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

        </Grid>
      </Grid>

      <ModalComponent
        isOpen={isDialogOpen}
        handleClose={handleDialogClose}
        content={<FormDialog />}
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