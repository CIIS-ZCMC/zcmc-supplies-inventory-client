import { useState } from 'react'

import { Stack, Typography, Box } from '@mui/joy'
import { CopyPlus, ViewIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import ButtonComponent from '../../../Components/ButtonComponent'
import ModalComponent from '../../../Components/Dialogs/ModalComponent'
import PaginatedTable from '../../../Components/Table/PaginatedTable'
import SnackbarComponent from '../../../Components/SnackbarComponent'

import FormDialog from './FormDialog';

import useSuppliersHook from '../../../Hooks/SuppliersHook';
import useSnackbarHook from '../../../Hooks/AlertHook'

import { supplierHeader } from '../../../Data/TableHeader';

const SuppliersOverview = ({ filter }) => {

  const { getSuppliers, setInitialValues } = useSuppliersHook();
  const { open, message, color, variant, anchor, showSnackbar, closeSnackbar } = useSnackbarHook();

  const { data, isLoading, error } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
  })

  const suppliersData = data?.data

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  const handleSnackbarClose = () => {
    setSnackbar({ open: false })
  }

  function handleEditRow(data) {
    setInitialValues(data);
  }

  return (
    <div>
      {suppliersData?.length < 0 ?
        <Stack height={750} direction={'column'} alignItems={'center'} justifyContent={'center'}>
          <Box sx={{
            my: 2
          }}>
            <CopyPlus size={32} />
          </Box>

          <Typography my={2} level='title-lg' fontSize={24} gutterBottom>
            Get started by creating an suppliers
          </Typography>

          <Typography width={600} my={2} level='body-md' textAlign={'center'} gutterBottom>
            You’ll use registered suppliers in this library to fill-up RIS requests and IARs as a pre-defined
            selection to minimize typographical errors.
          </Typography>

          <ButtonComponent
            label={'Create an supplier'}
            fullWidth={false}
            width={150}
            onClick={handleDialogOpen}
          />
        </Stack>
        :
        <PaginatedTable
          tableTitle={"Suppliers"}
          // tableDesc={"Sample Table Desription"}
          loading={isLoading}
          columns={supplierHeader}
          rows={filter(suppliersData)}
          actions={<ViewIcon />}
          actionBtns={
            <Stack>
              <ButtonComponent
                label="Add new supplier"
                onClick={handleDialogOpen} />
            </Stack>
          }
          editRow={handleEditRow}
        />
      }
      <ModalComponent
        isOpen={isDialogOpen}
        title="Create a new supplier record"
        description={"Library records allows for a more streamlined and dynamic form-filling experiences."}
        handleClose={handleDialogClose}
        content={<FormDialog handleDialogClose={handleDialogClose} isDialogOpen={isDialogOpen} setSnackbar={showSnackbar} />}
      />

      <SnackbarComponent
        open={open}
        onClose={closeSnackbar}
        anchor={anchor}
        color={color}
        variant={variant}
        message={message}
      />


    </div>
  )
}

export default SuppliersOverview