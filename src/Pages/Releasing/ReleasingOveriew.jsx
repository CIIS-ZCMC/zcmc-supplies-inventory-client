import { useEffect, useState } from "react";

import { Grid, Box, Typography, Stack } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";

import { ViewIcon } from "lucide-react";

//hooks
import useSuppliesHook from "../../Hooks/SuppliesHook";
import useReleasingHook from "../../Hooks/ReleasingHook";

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
import ContainerComponent from '../../Components/Container/ContainerComponent'

//datas
import { items, user } from '../../Data/index';
import { releasingHeader } from '../../Data/TableHeader';

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
  const { getStockOut } = useReleasingHook();

  const { data, isLoading, error } = useQuery({
    queryKey: ['stockout'],
    queryFn: getStockOut,
  })

  const stockoutData = data?.data

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
      <Header pageDetails={pageDetails} data={user} />
      <Stack gap={2} mt={2}>

        {/* search and filter */}
        <ContainerComponent>
          <SearchFilter>
            <FilterOptions
              categoryOptions={categoryFilter}
              sortOptions={sortFilter}
            />
          </SearchFilter>
        </ContainerComponent>

        <ContainerComponent>
          <PaginatedTable
            tableTitle={"List of stock-out transactions"}
            tableDesc={"Sample Table Desription"}
            columns={releasingHeader}
            rows={stockoutData}
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
      </Stack>
    </>
  )
}

export default Releasing