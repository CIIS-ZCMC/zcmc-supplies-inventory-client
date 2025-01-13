import { useEffect } from 'react'

import { useFormik } from 'formik'
import { Grid, Divider, Stack, Typography } from '@mui/joy'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useSourceHook from '../../../Hooks/SourceHook'
import usePaginatedTableHook from '../../../Hooks/PaginatedTableHook'
import useSnackbarHook from '../../../Hooks/AlertHook'

import ButtonComponent from '../../../Components/ButtonComponent'
import InputComponent from '../../../Components/Form/InputComponent'

const FormDialog = ({ handleDialogClose }) => {

    const queryClient = useQueryClient()
    const { isUpdate, id } = usePaginatedTableHook();
    const { showSnackbar } = useSnackbarHook();
    const { initialValues, validationSchema, getSource, updateSource, setInitialValues, createSource } = useSourceHook();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("source_name", values.sourceName);
            await mutation.mutate(isUpdate ? { 'source_name': values.sourceName } : formData);
        }
    })

    // Load data when editing (update mode)
    useEffect(() => {
        if (isUpdate && id) {
            const fetchData = async () => {
                try {
                    const sourceData = await getSource(id);
                    // Correctly set initial values and reset form
                    const updatedValues = {
                        id: sourceData?.data?.id || null,
                        sourceName: sourceData?.data.source_name || "",
                    };
                    formik.setValues(updatedValues);
                } catch (error) {
                    console.error('Error fetching unit:', error.message);
                    showSnackbar('Failed to load source details. Please try again.', 'danger', 'filled');
                }
            };
            fetchData();
        }
    }, [isUpdate, id, getSource, showSnackbar]);

    const mutation = useMutation({
        mutationFn: async (formData) =>
            isUpdate ? updateSource(id, formData) : createSource(formData),
        onSuccess: () => {
            showSnackbar(isUpdate ? 'Source updated successfully' : 'Source Created Successfully', "success", "filled");
            queryClient.invalidateQueries('sources');
            formik.resetForm();
        },
        onError: (error) => {
            if (error?.response?.status === 409) {
                showSnackbar(`${error.response.data.message}` || 'Conflict: The resource already exists.', "danger", "filled");
            } else {
                // Handle other errors
                showSnackbar(`${error.message || 'An error occurred. Please try again.', 'danger', 'filled'}`);
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
                    <Grid item xs={12}>
                        <InputComponent
                            size={'lg'}
                            label="Sources"
                            placeholder="Enter source name"
                            fullWidth={true}
                            name={'sourceName'}
                            value={formik.values.sourceName}
                            onChange={formik.handleChange}
                            error={formik.touched.sourceName && Boolean(formik.errors.sourceName)}
                            helperText={formik.touched.sourceName && formik.errors.sourceName}
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