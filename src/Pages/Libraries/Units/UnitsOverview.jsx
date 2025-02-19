import { useState, useEffect } from 'react'

import { Stack, Typography, Box } from '@mui/joy'
import { CopyPlus, ViewIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import ButtonComponent from '../../../Components/ButtonComponent'
import ModalComponent from '../../../Components/Dialogs/ModalComponent'
import PaginatedTable from '../../../Components/Table/PaginatedTable'
import SnackbarComponent from '../../../Components/SnackbarComponent'

//layouts
import TableDescription from '../../../Layout/Libraries/TableDescription'

import FormDialog from './FormDialog';

import useUnitsHook from '../../../Hooks/UnitsHook'
import useSnackbarHook from '../../../Hooks/AlertHook'

import { unitHeader } from '../../../Data/TableHeader';

const UnitsOverview = ({ filter }) => {
    const { getUnits, setInitialValues } = useUnitsHook();
    const { open, message, color, variant, anchor, showSnackbar, closeSnackbar } = useSnackbarHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['units'],
        queryFn: getUnits,
    })

    const unitsData = data?.data
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false)
    }

    function handleEditRow(data) {
        setInitialValues(data);
    }

    useEffect(() => {
        unitsData;
    }, [unitsData]);

    return (
        <div>
            {unitsData?.length < 0 ?
                <Stack height={750} direction={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Box sx={{
                        my: 2
                    }}>
                        <CopyPlus size={32} />
                    </Box>

                    <Typography my={2} level='title-lg' fontSize={24} gutterBottom>
                        Get started by creating an unit
                    </Typography>

                    <Typography width={600} my={2} level='body-md' textAlign={'center'} gutterBottom>
                        You’ll use registered units in this library to fill-up RIS requests and IARs as a pre-defined
                        selection to minimize typographical errors.
                    </Typography>

                    <ButtonComponent
                        label={'Create a unit'}
                        fullWidth={false}
                        width={150}
                        onClick={handleDialogOpen}
                    />
                </Stack>
                :
                <PaginatedTable
                    // tableTitle={"Units"}
                    tableDesc={
                        <TableDescription
                            label={'Add new unit'}
                            onClick={handleDialogOpen}
                        />
                    }
                    columns={unitHeader}
                    rows={filter(unitsData)}
                    loading={isLoading}
                    actions={<ViewIcon />}
                    editRow={handleEditRow}
                    editable={true}
                    viewable={false}
                    showChip={false}
                />
            }
            <ModalComponent
                isOpen={isDialogOpen}
                title="Create a new unit record"
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

export default UnitsOverview