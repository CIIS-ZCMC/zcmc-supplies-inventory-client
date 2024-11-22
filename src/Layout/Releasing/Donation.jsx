import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid, Typography, Stack, Box, Divider } from '@mui/joy';

import { Trash, Plus, } from 'lucide-react';

import AutoCompleteComponent from '../../Components/Form/AutoCompleteComponent';
import InputComponent from '../../Components/Form/InputComponent';
import IconButtonComponent from '../../Components/IconButtonComponent';
import ButtonComponent from '../../Components/ButtonComponent';

import useReleasingHook from '../../Hooks/ReleasingHook';

const Donation = ({ selectedId, donationBrands, setDonationBrands }) => {

    const { getBrandDonation } = useReleasingHook();

    const { data: brandDonationData, isLoading: isBrandDonationloading } = useQuery({
        queryKey: ['brand-donation', selectedId],
        queryFn: () => getBrandDonation(selectedId),
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

    const brandDonationOptions = useMemo(() => mapOptions(brandDonationData, 'concatenated_info'), [brandDonationData])

    const [donationBrand, setDonationBrand] = useState(); //Value is ID
    const [donationSource, setDonationSource] = useState(); //Value is ID
    const [donationQuantity, setDonationQuantity] = useState();
    const [donationExpirationDate, setDonationExpirationDate] = useState();

    const handleAddBrand = () => {
        setDonationBrands((prevList) => [
            ...prevList,
            {
                brand_id: donationBrand,
                source_id: donationSource,
                quantity: donationQuantity,
                expiration_date: donationExpirationDate
            }]);

        // Reset the state for brand and quantity inputs
        setDonationBrand();
        setDonationSource();
        setDonationQuantity("");
        setDonationExpirationDate("");
    };

    const handleRemoveBrand = (index) => {
        const updatedList = donationBrands.filter((_, i) => i !== index);
        setDonationBrands(updatedList);
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
            {donationBrands.map((item, index) => (
                <> <Grid container spacing={2} >
                    {/* Brand Selection */}
                    <Grid item md={12} lg={7}>
                        <AutoCompleteComponent
                            name={'brandDonation'}
                            placeholder="Search brand..."
                            label={'Brand'}
                            options={brandDonationOptions}
                            loading={isBrandDonationloading}
                            value={brandDonationOptions.find(option => option.id === item.brand_id) || null}
                            onChange={(e, value) => {
                                const updatedList = [...donationBrands];
                                updatedList[index].brand_id = value?.id || null;
                                updatedList[index].source_id = value?.source_id || null;
                                updatedList[index].expiration_date = value?.expiration_date || null;
                                setDonationBrands(updatedList);
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
                                const updatedList = [...donationBrands];
                                updatedList[index].quantity = e.target.value;
                                setDonationBrands(updatedList);
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

export default Donation