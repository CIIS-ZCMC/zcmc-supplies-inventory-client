import { useState } from 'react'

import { Stack, Typography, Box } from '@mui/joy'
import { CopyPlus, ViewIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import ButtonComponent from '../../../Components/ButtonComponent'
import ModalComponent from '../../../Components/Dialogs/ModalComponent'
import PaginatedTable from '../../../Components/Table/PaginatedTable'
import SnackbarComponent from '../../../Components/SnackbarComponent'

import FormDialog from './FormDialog';

import useCategoriesHook from '../../../Hooks/CategoriesHook'
import { categoriesHeader } from '../../../Data/TableHeader';

const SuppliersOverview = () => {

    const { getCategories } = useCategoriesHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    })

    const categoriesData = data?.data

    const [snackbar, setSnackbar] = useState({ open: false, color: '', message: '' })
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

    return (
        <div>
            {categoriesData?.length < 0 ?
                <Stack height={750} direction={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Box sx={{
                        my: 2
                    }}>
                        <CopyPlus size={32} />
                    </Box>

                    <Typography my={2} level='title-lg' fontSize={24} gutterBottom>
                        Get started by creating an Area
                    </Typography>

                    <Typography width={600} my={2} level='body-md' textAlign={'center'} gutterBottom>
                        You’ll use registered areas in this library to fill-up RIS requests and IARs as a pre-defined
                        selection to minimize typographical errors.
                    </Typography>

                    <ButtonComponent
                        label={'Create an area'}
                        fullWidth={false}
                        width={150}
                        onClick={handleDialogOpen}
                    />
                </Stack>
                :
                <PaginatedTable
                    tableTitle={"Supplies"}
                    // tableDesc={"Sample Table Desription"}
                    columns={categoriesHeader}
                    rows={categoriesData}
                    actions={<ViewIcon />}
                    actionBtns={
                        <Stack>
                            <ButtonComponent label="Add new area" onClick={handleDialogOpen} />
                        </Stack>
                    }
                />
            }
            <ModalComponent
                isOpen={isDialogOpen}
                title="Create a new area record"
                description={"Library records allows for a more streamlined and dynamic form-filling experiences."}
                handleClose={handleDialogClose}
                content={<FormDialog handleDialogClose={handleDialogClose} isDialogOpen={isDialogOpen} setSnackbar={setSnackbar} />}
            />

            <SnackbarComponent
                open={snackbar.open}
                onClose={handleSnackbarClose}
                color={snackbar.color}
                message={snackbar.message}
                variant='solid'
                anchor={{ vertical: 'top', horizontal: 'right' }}
            />

        </div>
    )
}

export default SuppliersOverview