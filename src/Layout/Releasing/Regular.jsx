import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid, Typography, Stack, Box, Divider } from '@mui/joy';

import { Trash, Plus, } from 'lucide-react';

import AutoCompleteComponent from '../../Components/Form/AutoCompleteComponent';
import InputComponent from '../../Components/Form/InputComponent';
import IconButtonComponent from '../../Components/IconButtonComponent';
import ButtonComponent from '../../Components/ButtonComponent';

import useReleasingHook from '../../Hooks/ReleasingHook';

const Regular = ({ selectedId, setSelectedQuantity, regularBrands, setRegularBrands }) => {

    const { getBrandRegular } = useReleasingHook();

    const { data: brandRegularData, isLoading: isBrandRegularloading } = useQuery({
        queryKey: ['brand-regular', selectedId],
        queryFn: () => getBrandRegular(selectedId),
        enabled: selectedId != null && selectedId !== "", // Ensure selectedId is not null or empty
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const mapOptions = (data, labelKey) =>
        data?.map(item => ({
            id: item.inventory_stock_id,
            label: item[labelKey],
            source_id: item.source_id,
            quantity: item.quantity,
            expiration_date: item.expiration_date
        })) || [];

    const brandRegularOptions = useMemo(() => mapOptions(brandRegularData, 'concatenated_info'), [brandRegularData])

    // const selectedBrand = brandRegularOptions.find(option => option.id === formik.values.brandRegular);

    // Safely parse and validate inputs
    // const inputQuantity = Number();
    // const availableQuantity = Number(selectedBrand?.quantity);

    // const isInputValid = !isNaN(inputQuantity) && inputQuantity >= 0;
    // const isAvailableValid = !isNaN(availableQuantity) && availableQuantity >= 0;

    // Calculate the quantity counter only if inputs are valid
    // const quantityCounter = isInputValid && isAvailableValid ? availableQuantity - inputQuantity : null;

    // useEffect(() => {
    //     setSelectedQuantity(quantityCounter);
    // }, [quantityCounter, selectedBrand]);

    // const renderQuantityStatus = () => {

    //     if (!isInputValid || !isAvailableValid) {
    //         return <Typography color="danger" level="body-sm">Invalid input or no item selected</Typography>;
    //     }

    //     if (availableQuantity === 0) {
    //         return <Typography color="danger" level="body-sm">No stock available</Typography>;
    //     }


    //     if (inputQuantity > availableQuantity) {
    //         return (
    //             <Typography color="danger" level="body-sm">
    //                 Quantity input exceeded: {inputQuantity} / {availableQuantity}
    //             </Typography>
    //         );
    //     }

    //     if (quantityCounter <= 0) {
    //         return (
    //             <Typography color="danger" level="body-sm">
    //                 {inputQuantity} / 0 left
    //             </Typography>
    //         );
    //     }

    //     return (
    //         <Stack direction="row">
    //             <Typography level="body-sm">Qty:</Typography>
    //             <Typography ml={1} fontWeight={700}>
    //                 {inputQuantity} / {quantityCounter} left
    //             </Typography>
    //         </Stack>
    //     );
    // };

    const [regularBrand, setRegularBrand] = useState(); //Value is ID
    const [regularSource, setRegularSource] = useState(); //Value is ID
    const [regularQuantity, setRegularQuantity] = useState();
    const [regularExpirationDate, setRegularExpirationDate] = useState();

    const handleAddBrand = () => {
        setRegularBrands((prevList) => [
            ...prevList,
            {
                brand_id: regularBrand,
                source_id: regularSource,
                quantity: regularQuantity,
                expiration_date: regularExpirationDate
            }
        ]);
        // Reset the state for brand and quantity inputs
        setRegularBrand();
        setRegularSource();
        setRegularQuantity("");
        setRegularExpirationDate("");
    };

    const handleRemoveBrand = (index) => {
        const updatedList = regularBrands.filter((_, i) => i !== index);
        setRegularBrands(updatedList);
    };

    return (
        <Box
            sx={{
                maxHeight: '400px',
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: '8px',
            }}
        >

            {regularBrands.map((item, index) => (
                <> <Grid container spacing={2} >
                    {/* Brand Selection */}
                    <Grid item md={12} lg={7}>
                        <AutoCompleteComponent
                            name={'brandRegular'}
                            placeholder="Search brand..."
                            label={'Brand'}
                            options={brandRegularOptions}
                            loading={isBrandRegularloading}
                            value={brandRegularOptions.find(option => option.id === item.brand_id) || null}
                            onChange={(e, value) => {
                                const updatedList = [...regularBrands];
                                updatedList[index].brand_id = value?.id || null;
                                updatedList[index].source_id = value?.source_id || null;
                                updatedList[index].expiration_date = value?.expiration_date || null;
                                setRegularBrands(updatedList);
                            }}
                            fullWidth={true}
                        />
                    </Grid>

                    {/* Quantity Input */}
                    <Grid item md={12} lg={4}>
                        <InputComponent
                            width={100}
                            label="Quantity"
                            placeholder="xxx.xxx.xxx"
                            fullWidth={true}
                            name={`quantity-${index}`}
                            size="lg"
                            value={item.quantity}
                            onChange={(e) => {
                                const updatedList = [...regularBrands];
                                updatedList[index].quantity = e.target.value;
                                setRegularBrands(updatedList);
                            }}
                        />
                    </Grid>

                    <Grid
                        item
                        md={12}
                        lg={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="end"
                    >
                        <IconButtonComponent
                            color='danger'
                            icon={Trash}
                            iconSize={16}
                            onClick={() => handleRemoveBrand(index)}
                        />
                    </Grid>

                </Grid>
                    <Divider sx={{ my: 2 }} />
                </>

            ))}

            <ButtonComponent
                type="button"
                variant="contained"
                label="Add another brand"
                onClick={handleAddBrand} // Trigger appending
                endDecorator={<Plus size={20} />}
            />
        </Box >
    )
}

export default Regular