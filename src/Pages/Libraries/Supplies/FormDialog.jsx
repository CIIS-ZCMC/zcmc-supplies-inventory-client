import { useMemo } from 'react'

import { useFormik } from 'formik'
import { Grid, Divider, Stack, Typography } from '@mui/joy'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

import ButtonComponent from '../../../Components/ButtonComponent'
import InputComponent from '../../../Components/Form/InputComponent'
import AutoCompleteComponent from '../../../Components/Form/AutoCompleteComponent'
import AccordionComponent from '../../../Components/AccordionComponent'

import useSuppliesHook from '../../../Hooks/SuppliesHook'
import useCategoriesHook from '../../../Hooks/CategoriesHook'
import useUnitsHook from '../../../Hooks/UnitsHook'

const FormDialog = ({ handleDialogClose, setSnackbar }) => {

    const queryClient = useQueryClient()
    const { initialValues, validationSchema, createSupply } = useSuppliesHook();

    const { getCategories } = useCategoriesHook();
    const { getUnits } = useUnitsHook();

    // Array of queries to manage multiple fetching in a cleaner way
    const queryConfigs = [
        { key: 'units', fn: getUnits },
        { key: 'categories', fn: getCategories },
    ];

    const queries = queryConfigs.map(({ key, fn }) =>
        useQuery({ queryKey: [key], queryFn: fn })
    );

    // Destructure data and loading states from queries for cleaner access
    const [
        { data: unitsData, isLoading: isUnitsLoading },
        { data: categoriesData, isLoading: isCategoriesLoading },
    ] = queries;

    // Helper function for mapping options
    const mapOptions = (data, labelKey) =>
        data?.map(item => ({ label: item[labelKey], id: item.id })) || [];

    const unitsOptions = useMemo(() => mapOptions(unitsData?.data, 'unit_name'), [categoriesData]);
    const categoriesOptions = useMemo(() => mapOptions(categoriesData?.data, 'category_name'), [categoriesData]);

    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: createSupply,
        onSuccess: () => {
            // Show success notification, close dialog, and invalidate areas cache
            setSnackbar({ open: true, color: 'success', message: 'Source created successfully' });
            queryClient.invalidateQueries('supplies');
            // Reset Formik form values after submission
            formik.resetForm(); // Reset form to initial values
            // setInitialValues;  // Reset the initial state in the store
        },
        onError: (error) => {
            setSnackbar({ open: true, color: 'danger', message: `${error}` })
            console.error("Error submitting form:", error);
        },
        onSettled: () => {
            // Always close the dialog after the mutation is finished (whether successful or error)
            handleDialogClose();
        }
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Create a new FormData object
            const formData = new FormData();

            formData.append("supply_name", values.supplyName);
            formData.append("category_id", values.category);
            formData.append("unit_id", values.unit);

            await mutation.mutate(formData)
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputComponent
                            size={'lg'}
                            label="Item name"
                            placeholder="Enter item name"
                            fullWidth={true}
                            name={'supplyName'}
                            value={formik.values.supplyName}
                            onChange={formik.handleChange}
                            error={formik.touched.supplyName && Boolean(formik.errors.supplyName)}
                            helperText={formik.touched.supplyName && formik.errors.supplyName}
                        />

                        <Typography my={2} level={'body-sm'}>
                            Item’s name and type of unit can be combined together to simplify form fill-up and prevent typographical errors on input.
                        </Typography>
                    </Grid>

                    <Grid xs={12}>
                        <AutoCompleteComponent
                            name={'unit'}
                            placeholder="Search unit..."
                            label="Unit"
                            options={unitsOptions}
                            loading={isUnitsLoading}
                            value={unitsOptions.find(option => option.id === formik.values.unit) || null}
                            onChange={(event, value) => formik.setFieldValue("unit", value ? value.id : '')}
                            error={formik.touched.unit && Boolean(formik.errors.unit)}
                            helperText={formik.touched.unit && formik.errors.unit}
                            fullWidth={true}
                        />
                    </Grid>

                    <Grid xs={12}>
                        <AutoCompleteComponent
                            name={'category'}
                            placeholder="Search categories..."
                            label="Categories"
                            options={categoriesOptions}
                            loading={isCategoriesLoading}
                            value={categoriesOptions.find(option => option.id === formik.values.category) || null}
                            onChange={(event, value) => formik.setFieldValue("category", value ? value.id : '')}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                            fullWidth={true}
                        />
                    </Grid>

                </Grid>

                <Divider sx={{ marginY: 3 }} />  {/* Horizontal Divider */}

                <Stack direction={'row'} spacing={2}>
                    <ButtonComponent
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