import { useEffect } from 'react'

import { useFormik } from 'formik'
import { Grid, Divider, Stack, Typography } from '@mui/joy'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useUnitsHook from '../../../Hooks/UnitsHook'
import usePaginatedTableHook from '../../../Hooks/PaginatedTableHook'

import ButtonComponent from '../../../Components/ButtonComponent'
import InputComponent from '../../../Components/Form/InputComponent'

const FormDialog = ({ handleDialogClose, setSnackbar, isDialogOpen }) => {

    const queryClient = useQueryClient()
    const { isUpdate, id } = usePaginatedTableHook();
    const { initialValues, validationSchema, createUnit, updateUnit, setInitialValues, getUnit } = useUnitsHook();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            // Create a new FormData object
            const formData = new FormData();
            formData.append("unit_name", values.unitName);
            await mutation.mutate(isUpdate ? { 'unit_name': values.unitName } : formData);
        }
    })

    // Load data when editing (update mode)
    useEffect(() => {
        if (isUpdate && id) {
            const fetchData = async () => {
                try {
                    const unitData = await getUnit(id);
                    // Correctly set initial values and reset form
                    const updatedValues = {
                        id: unitData?.data?.id || null,
                        unitName: unitData?.data.unit_name || "",
                    };
                    formik.setValues(updatedValues);
                } catch (error) {
                    console.error('Error fetching unit:', error.message);
                    setSnackbar('Failed to load unit details. Please try again.', 'danger', 'filled');
                }
            };
            fetchData();
        }
    }, [isUpdate, id, getUnit, setSnackbar]);

    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: async (formData) =>
            isUpdate ? updateUnit(id, formData) : createUnit(formData),
        onSuccess: () => {
            setSnackbar(isUpdate ? 'Unit updated successfully' : 'Unit Created Successfully', "success", "filled");
            queryClient.invalidateQueries('units');
            formik.resetForm()
        },
        onError: (error) => {
            if (error?.response?.status === 409) {
                setSnackbar(`${error.response.data.message}` || 'Conflict: The resource already exists.', "danger", "filled");
            } else {
                // Handle other errors
                setSnackbar(`${error.message || 'An error occurred. Please try again.', 'danger', 'filled'}`);
            }
            console.error("Error submitting form:", error);
        },
        onSettled: () => {
            // Always close the dialog after the mutation is finished (whether successful or error)
            handleClose();
        }
    });

    function handleClose() {
        setInitialValues(null)
        handleDialogClose()
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <InputComponent
                            size={'lg'}
                            label="Unit Name"
                            placeholder="Enter unit name"
                            fullWidth={true}
                            name={'unitName'}
                            value={formik.values.unitName}
                            onChange={formik.handleChange}
                            error={formik.touched.unitName && Boolean(formik.errors.unitName)}
                            helperText={formik.touched.unitName && formik.errors.unitName}
                        />

                        <Typography my={2} level={'body-sm'}>
                            Item’s name and type of unit can be combined together to simplify form fill-up and prevent typographical errors on input.
                        </Typography>
                    </Grid>

                </Grid>

                <Divider sx={{ marginY: 3 }} />  {/* Horizontal Divider */}

                <Stack direction={'row'} spacing={2}>
                    <ButtonComponent
                        type={'button'}
                        label={'Cancel'}
                        variant="outlined"
                        color="danger"
                        onClick={handleDialogClose}
                        fullWidth
                    />
                    <ButtonComponent
                        type={'submit'}
                        variant="solid"
                        color={"primary"}
                        label={'Save'}
                        fullWidth
                        loading={mutation.isPending}
                    />
                </Stack>
            </form>
        </>
    )
}

export default FormDialog