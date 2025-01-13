import { useEffect, useMemo, useState } from 'react';

import { useFormik } from 'formik';
import { Grid, Divider, Stack, Typography } from '@mui/joy';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import ButtonComponent from '../../../Components/ButtonComponent';
import InputComponent from '../../../Components/Form/InputComponent';
import AutoCompleteComponent from '../../../Components/Form/AutoCompleteComponent';

import useSuppliesHook from '../../../Hooks/SuppliesHook';
import useCategoriesHook from '../../../Hooks/CategoriesHook';
import useUnitsHook from '../../../Hooks/UnitsHook';
import useSourceHook from '../../../Hooks/SourceHook';
import usePaginatedTableHook from '../../../Hooks/PaginatedTableHook';
import useSnackbarHook from '../../../Hooks/AlertHook';

const SuppliesForm = ({ handleDialogClose }) => {

    const queryClient = useQueryClient()
    const { isUpdate, id } = usePaginatedTableHook()
    const { initialValues, validationSchema, createSupply, getSupplies, getSupply, updateSupply, setInitialValues } = useSuppliesHook();
    const { showSnackbar } = useSnackbarHook();
    const { getCategories } = useCategoriesHook();
    const { getUnits } = useUnitsHook();
    const { getSources } = useSourceHook();


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("supply_name", values.supplyName);
            formData.append("category_id", values.category);
            formData.append("unit_id", values.unit);

            await mutation.mutate(isUpdate ?
                {
                    'supply_name': values.supplyName,
                    'category_id': values.category,
                    'unit_id': values.unit,
                }
                :
                formData
            );

        }
    })

    // Array of queries to manage multiple fetching in a cleaner way
    const queryConfigs = [
        { key: 'units', fn: getUnits },
        { key: 'categories', fn: getCategories },
        { key: 'sources', fn: getSources },
    ];

    const queries = queryConfigs.map(({ key, fn }) =>
        useQuery({ queryKey: [key], queryFn: fn })
    );

    // Destructure data and loading states from queries for cleaner access
    const [
        { data: unitsData, isLoading: isUnitsLoading },
        { data: categoriesData, isLoading: isCategoriesLoading },
        { data: sourcesData, isLoading: isSourcesLoading },
    ] = queries;

    // Helper function for mapping options
    const mapOptions = (data, labelKey) =>
        data?.map(item => ({ label: item[labelKey], id: item.id })) || [];

    const unitsOptions = useMemo(() => mapOptions(unitsData?.data, 'unit_name'), [categoriesData]);
    const categoriesOptions = useMemo(() => mapOptions(categoriesData?.data, 'category_name'), [categoriesData]);
    const sourcesOptions = useMemo(() => mapOptions(sourcesData?.data, 'source_name'), [sourcesData]);

    useEffect(() => {
        if (isUpdate && id) {
            const fetchData = async () => {
                try {
                    const supplyData = await getSupply(id);

                    const selectedCategory = categoriesOptions.find(option =>
                        option.label?.toLowerCase().trim() === supplyData?.data?.category_name?.toLowerCase().trim()
                    ) || null;

                    const selectedUnit = unitsOptions.find(option =>
                        option.label?.toLowerCase().trim() === supplyData?.data?.unit_name?.toLowerCase().trim()
                    ) || null;

                    formik.setValues({
                        id: supplyData?.data?.id || null,
                        supplyName: supplyData?.data?.supply_name || "",
                        category: selectedCategory ? selectedCategory.id : '',
                        unit: selectedUnit ? selectedUnit.id : '',
                    });
                } catch (error) {
                    console.error('Error fetching Supply item details:', error.message);
                    showSnackbar('Failed to load supply details. Please try again.', 'danger', 'filled');
                }
            };

            fetchData();
        }
    }, [isUpdate, id, getSupply, categoriesOptions, unitsOptions, showSnackbar]);


    //Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: async (formData) =>
            isUpdate ? updateSupply(id, formData) : createSupply(formData),
        onSuccess: () => {
            showSnackbar(isUpdate ? 'Supply updated successfully' : 'Supply created successfully', "success", "filled");
            queryClient.invalidateQueries('supplies');
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
            </form >

        </>
    )
}

export default SuppliesForm