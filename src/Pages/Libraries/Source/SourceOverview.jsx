import { useState } from 'react'

import { Stack, Typography, Box } from '@mui/joy'
import { CopyPlus, ViewIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import ButtonComponent from '../../../Components/ButtonComponent'
import ModalComponent from '../../../Components/Dialogs/ModalComponent'
import PaginatedTable from '../../../Components/Table/PaginatedTable'
import SnackbarComponent from '../../../Components/SnackbarComponent'

import FormDialog from './FormDialog';

import useSourceHook from '../../../Hooks/SourceHook';

import { sourceHeader } from '../../../Data/TableHeader';

const SourceOverview = ({ filter }) => {

    const { getSources } = useSourceHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['sources'],
        queryFn: getSources,
    })

    const sourcesData = data?.data

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
            {sourcesData?.length < 0 ?
                <Stack height={750} direction={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Box sx={{
                        my: 2
                    }}>
                        <CopyPlus size={32} />
                    </Box>

                    <Typography my={2} level='title-lg' fontSize={24} gutterBottom>
                        Get started by creating an Source
                    </Typography>

                    <Typography width={600} my={2} level='body-md' textAlign={'center'} gutterBottom>
                        You’ll use registered sources in this library to fill-up RIS requests and IARs as a pre-defined
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
                    tableTitle={"Source"}
                    // tableDesc={"Sample Table Desription"}
                    columns={sourceHeader}
                    rows={filter(sourcesData)}
                    loading={isLoading}
                    actions={<ViewIcon />}
                    actionBtns={
                        <Stack>
                            <ButtonComponent label="Add new source" onClick={handleDialogOpen} />
                        </Stack>
                    }
                />
            }
            <ModalComponent
                isOpen={isDialogOpen}
                title="Create a new source record"
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

export default SourceOverview