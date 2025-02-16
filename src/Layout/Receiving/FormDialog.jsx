import { useMemo, useEffect, useState } from 'react';
import { Box, Stack, Grid, Divider, Checkbox, Typography, Button } from "@mui/joy";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';

import SuppliesForm from '../../Pages/Receiving/Forms/SuppliesForm';
import BrandForm from '../../Pages/Receiving/Forms/BrandForm';
import SourceForm from '../../Pages/Receiving/Forms/SourceForm';
import SupplierForm from '../../Pages/Receiving/Forms/SupplierForm';

// Custom Components
import AutoCompleteComponent from "../../Components/Form/AutoCompleteComponent";
import InputComponent from "../../Components/Form/InputComponent";
import DatePickerComponent from '../../Components/Form/DatePickerComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import SnackbarComponent from '../../Components/SnackbarComponent';
import ModalComponent from '../../Components/Dialogs/ModalComponent';

// hooks
import useSourceHook from '../../Hooks/SourceHook';
import useSuppliesHook from '../../Hooks/SuppliesHook';
import useSuppliersHook from '../../Hooks/SuppliersHook';
import useBrandsHook from '../../Hooks/BrandsHook';
import useReceivingHook from '../../Hooks/ReceivingHook';
import useSnackbarHook from '../../Hooks/AlertHook';

const FormDialog = ({ handleDialogClose, showSnackbar }) => {

    const [isSupplyFormDialogOpen, setIsSupplyFormDialogOpen] = useState(false);
    const [isBrandFormDialogOpen, setIsBrandFormDialogOpen] = useState(false);
    const [isSourceFormDialogOpen, setIsSourceFormDialogOpen] = useState(false);
    const [isSupplierFormDialogOpen, setIsSupplierFormDialogOpen] = useState(false);

    const queryClient = useQueryClient()

    // Hooks for data fetching functions
    const { getSuppliers } = useSuppliersHook(); //change this into brand
    const { getBrands } = useBrandsHook(); //change this int o suppliers
    const { getSources } = useSourceHook();
    const { getSupplies } = useSuppliesHook();

    const { initialValues, validationSchema, createStockIn, setInitialValues } = useReceivingHook();

    // Array of queries to manage multiple fetching in a cleaner way
    const queryConfigs = [
        { key: 'supplies', fn: getSupplies },
        { key: 'sources', fn: getSources },
        { key: 'brands', fn: getBrands },
        { key: 'suppliers', fn: getSuppliers },
    ];

    const queries = queryConfigs.map(({ key, fn }) =>
        useQuery({ queryKey: [key], queryFn: fn })
    );

    // Destructure data and loading states from queries for cleaner access
    const [
        { data: suppliesData, isLoading: isSuppliesLoading },
        { data: sourcesData, isLoading: isSourcesLoading },
        { data: brandsData, isLoading: isBrandsLoading },
        { data: suppliersData, isLoading: isSuppliersLoading },
    ] = queries;

    // Helper function for mapping options
    const mapOptions = (data, labelKey) =>
        data?.map(item => ({ label: item[labelKey], id: item.id })) || [];

    // Memoized options to avoid recalculating on every render
    const suppliesOptions = useMemo(() => mapOptions(suppliesData?.data, 'name'), [suppliesData]);
    const sourcesOptions = useMemo(() => mapOptions(sourcesData?.data, 'source_name'), [sourcesData]);
    const brandsOptions = useMemo(() => mapOptions(brandsData?.data, 'brand_name'), [brandsData]);
    const suppliersOptions = useMemo(() => mapOptions(suppliersData?.data, 'supplier_name'), [suppliersData]);

    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: createStockIn,
        onSuccess: () => {
            // Only show success notification and close dialog after mutation is successful
            showSnackbar("Stockin Success!", "success", "filled");
            queryClient.invalidateQueries('stockin');
            // formik.resetForm();
            formik.resetForm();
            formik.validateForm();
        },
        onError: (error) => {
            showSnackbar(
                `Stockin failed!. Please try again. ${error}`,
                "danger",
                "filled"
            );
            console.error("Error stockin form:", error);
        },
        onSettled: () => {
            // Always close the dialog after the mutation is finished (whether successful or error)
            handleClose();
        }
    });

    function handleClose() {
        setInitialValues(null)
        handleDialogClose()
        handleBrandDialogClose()
    }

    //supplies
    const handleFormDialogOpen = () => {
        setIsSupplyFormDialogOpen(true);
    };

    const handleFormDialogClose = () => {
        setIsSupplyFormDialogOpen(false);
    };

    //sources
    const handleSourceDialogOpen = () => {
        setIsSourceFormDialogOpen(true);
    };

    const handleSourceDialogClose = () => {
        setIsSourceFormDialogOpen(false);
    };

    //brands
    const handleBrandDialogOpen = () => {
        setIsBrandFormDialogOpen(true);
    };

    const handleBrandDialogClose = () => {
        setIsBrandFormDialogOpen(false);
    };

    //suppliers
    const handleSupplierDialogOpen = () => {
        setIsSupplierFormDialogOpen(true);
    }

    const handleSupplierDialogClose = () => {
        setIsSupplierFormDialogOpen(false);
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            // console.log(values)

            // Create a new FormData object
            const formData = new FormData();

            // Map formik values to the expected API field names
            formData.append("supplies_masterlist_id", values.itemName);
            formData.append("brand_id", values.brand);
            formData.append("source_id", values.source);
            formData.append("supplier_id", values.supplier);
            formData.append("expiration_date", values.expiryDate === "N/A" ? "" : values.expiryDate);
            formData.append("quantity", values.quantity);
            formData.append("delivery_date", values.dateDelivered);
            formData.append("purchase_order_no", values.poNumber);
            formData.append("iar_no", values.iarNumber);

            await mutation.mutate(formData);
        }
    })

    useEffect(() => {
        console.log("Formik values after reset:", formik.values);
    }, [formik.values]);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Box>

                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            {/* Supplies Autocomplete */}

                            <AutoCompleteComponent
                                name={'itemName'}
                                placeholder="Search Item..."
                                label="Item Name"
                                options={suppliesOptions}
                                loading={isSuppliesLoading}
                                value={suppliesOptions.find(option => option.id === formik.values.itemName) || null}
                                onChange={(event, value) => formik.setFieldValue("itemName", value ? value.id : '')}
                                error={formik.touched.itemName && Boolean(formik.errors.itemName)}
                                helperText={formik.touched.itemName && formik.errors.itemName}
                                fullWidth={true}
                                addBtn={
                                    <ButtonComponent
                                        type={'button'}
                                        label={'Add Item'}
                                        size='sm'
                                        variant={'outlined'}
                                        onClick={handleFormDialogOpen}
                                    />
                                }
                            />

                            <Stack mt={2}>
                                <Typography level="body-sm">
                                    Item’s name and type of unit is combined and derived from your Dynamic Library to speed-up form fill-up and prevent typographical errors on input.
                                </Typography>
                            </Stack>

                        </Grid>

                        <Grid xs={12} md={6}>
                            <AutoCompleteComponent
                                name={'source'}
                                placeholder="Search source..."
                                label="Source"
                                options={sourcesOptions}
                                loading={isSourcesLoading}
                                value={sourcesOptions.find(option => option.id === formik.values.source) || null}
                                onChange={(event, value) => formik.setFieldValue("source", value ? value.id : '')}
                                error={formik.touched.source && Boolean(formik.errors.source)}
                                helperText={formik.touched.source && formik.errors.source}
                                fullWidth={true}
                                addBtn={
                                    <ButtonComponent
                                        type={'button'}
                                        label={'Add Source'}
                                        size='sm'
                                        variant={'outlined'}
                                        onClick={handleSourceDialogOpen}
                                    />
                                }
                            />
                        </Grid>

                        <Grid xs={12} md={6} mt={2.5}>
                            <InputComponent
                                name={'quantity'}
                                size='lg'
                                label="Quantity"
                                placeholder="xxx.xxx"
                                fullWidth={true}
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                helperText={formik.touched.quantity && formik.errors.quantity}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <InputComponent
                                size='lg'
                                label="PO Number"
                                placeholder="xxx.xxx"
                                fullWidth={true}
                                name={'poNumber'}
                                value={formik.values.poNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.poNumber && Boolean(formik.errors.poNumber)}
                                helperText={formik.touched.poNumber && formik.errors.poNumber}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <InputComponent
                                size='lg'
                                label="IAR Number"
                                placeholder="xxx.xxx"
                                fullWidth={true}
                                name={'iarNumber'}
                                value={formik.values.iarNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.iarNumber && Boolean(formik.errors.iarNumber)}
                                helperText={formik.touched.iarNumber && formik.errors.iarNumber}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <DatePickerComponent
                                size={'lg'}
                                name={"dateDelivered"}
                                label="Date Delivered"
                                placeholder="xxxx.xx.xx"
                                value={formik.values.dateDelivered || null}
                                onChange={(date) => formik.setFieldValue("dateDelivered", date)}
                                error={formik.touched.dateDelivered && Boolean(formik.errors.dateDelivered)}
                                helperText={formik.touched.dateDelivered && formik.errors.dateDelivered}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <DatePickerComponent
                                size={'lg'}
                                name="expiryDate"
                                label="Expiry Date"
                                placeholder="xxxx.xx.xx"
                                value={formik.values.expiryDate === "N/A" ? null : formik.values.expiryDate || null} // Reset to null when cleared
                                onChange={(date) => formik.setFieldValue("expiryDate", date)}
                                error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                                helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                            />

                            {/* Checkbox for No Expiry Date */}
                            <Checkbox
                                label="No Expiry Date (N/A)"
                                checked={formik.values.expiryDate === "N/A"}
                                onChange={(e) =>
                                    formik.setFieldValue("expiryDate", e.target.checked ? "N/A" : null)
                                }
                                size="lg"
                                sx={{
                                    mt: 1,
                                    color: "primary.500",
                                    "&.Mui-checked": {
                                        color: "primary.700",
                                    },
                                }}
                            >
                                No Expiry Date (N/A)
                            </Checkbox>


                        </Grid>

                        <Grid xs={12} md={6}>
                            <AutoCompleteComponent
                                name={'brand'}
                                placeholder="Search brands..."
                                label="Brand"
                                options={brandsOptions} // Include "No Brand" in options
                                loading={isBrandsLoading}
                                value={brandsOptions.find(option => option.id === formik.values.brand) || null}
                                onChange={(event, value) =>
                                    formik.setFieldValue("brand", value ? value.id : '')
                                }
                                error={formik.touched.brand && Boolean(formik.errors.brand)}
                                helperText={formik.touched.brand && formik.errors.brand}
                                fullWidth={true}
                                addBtn={
                                    <ButtonComponent
                                        type={'button'}
                                        label={'Add Brand'}
                                        size='sm'
                                        variant={'outlined'}
                                        onClick={handleBrandDialogOpen}
                                    />
                                }
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <AutoCompleteComponent
                                name={'supplier'}
                                placeholder="Search supplier..."
                                label="Supplier"
                                options={suppliersOptions}
                                loading={isSuppliersLoading}
                                value={suppliersOptions.find(option => option.id === formik.values.supplier) || null}
                                onChange={(event, value) => formik.setFieldValue("supplier", value ? value.id : '')}
                                error={formik.touched.supplier && Boolean(formik.errors.supplier)}
                                helperText={formik.touched.supplier && formik.errors.supplier}
                                fullWidth={true}
                                addBtn={
                                    <ButtonComponent
                                        type={'button'}
                                        label={'Add Supplier'}
                                        size='sm'
                                        variant={'outlined'}
                                        onClick={handleSupplierDialogOpen}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>

                </Box>

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
            </form >

            {/* Supplies Form Modal */}
            <ModalComponent
                isOpen={isSupplyFormDialogOpen}
                content={<SuppliesForm handleDialogClose={handleFormDialogClose} />}
                actionBtns={false}
                handleClose={handleFormDialogClose}
                title={"Add new item"}
                description={"Add a new item to your library."}
            />

            {/* Source Form Modal */}
            <ModalComponent
                isOpen={isSourceFormDialogOpen}
                content={<SourceForm handleDialogClose={handleSourceDialogClose} />}
                actionBtns={false}
                handleClose={handleSourceDialogClose}
                title={"Add new Source"}
                description={"Add a new item to your library."}
            />

            {/* Brands Form Modal */}
            <ModalComponent
                isOpen={isBrandFormDialogOpen}
                content={<BrandForm handleDialogClose={handleBrandDialogClose} />}
                actionBtns={false}
                handleClose={handleBrandDialogClose}
                title={"Add new brand "}
                description={"Add a new item to your library."}
            />

            {/* Suppliers */}
            <ModalComponent
                isOpen={isSupplierFormDialogOpen}
                content={<SupplierForm handleDialogClose={handleSupplierDialogClose} />}
                actionBtns={false}
                handleClose={handleSupplierDialogClose}
                title={"Add New supplier"}
                description={"Add a new item to your library."}
            />
        </>
    );
};

export default FormDialog;
