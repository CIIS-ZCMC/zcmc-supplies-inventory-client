import { useState, useEffect } from 'react'

import { Stack, Typography, Box } from '@mui/joy'
import { CopyPlus, ViewIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import ButtonComponent from '../../../Components/ButtonComponent'
import ModalComponent from '../../../Components/Dialogs/ModalComponent'
import PaginatedTable from '../../../Components/Table/PaginatedTable'
import SnackbarComponent from '../../../Components/SnackbarComponent'

import FormDialog from './FormDialog';

import useSuppliesHook from '../../../Hooks/SuppliesHook'
import useSnackbarHook from '../../../Hooks/AlertHook'

import { supplyHeader } from '../../../Data/TableHeader';

const SuppliesOverview = ({ filter }) => {

    const { getSupplies, setInitialValues } = useSuppliesHook();
    const { open, message, color, variant, anchor, showSnackbar, closeSnackbar } = useSnackbarHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['supplies'],
        queryFn: getSupplies,
    })

    const suppliesData = data?.data
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
        suppliesData;
    }, [suppliesData]);

    return (
        <div>
            {suppliesData?.length < 0 ?
                <Stack height={750} direction={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Box sx={{
                        my: 2
                    }}>
                        <CopyPlus size={32} />
                    </Box>

                    <Typography my={2} level='title-lg' fontSize={24} gutterBottom>
                        Get started by creating an supply
                    </Typography>

                    <Typography width={600} my={2} level='body-md' textAlign={'center'} gutterBottom>
                        You’ll use registered supplies in this library to fill-up RIS requests and IARs as a pre-defined
                        selection to minimize typographical errors.
                    </Typography>

                    <ButtonComponent
                        label={'Create an supply'}
                        fullWidth={false}
                        width={150}
                        onClick={handleDialogOpen}
                    />
                </Stack>
                :
                <PaginatedTable
                    tableTitle={"Supplies"}
                    // tableDesc={"Sample Table Desription"}
                    columns={supplyHeader}
                    loading={isLoading}
                    rows={filter(suppliesData)}
                    actions={<ViewIcon />}
                    actionBtns={
                        <Stack>
                            <ButtonComponent
                                label="Add new item"
                                onClick={handleDialogOpen}
                            />
                        </Stack>
                    }
                    editRow={handleEditRow}
                    editable={true}
                    viewable={false}
                />
            }
            <ModalComponent
                isOpen={isDialogOpen}
                title="Create a new record"
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

export default SuppliesOverview