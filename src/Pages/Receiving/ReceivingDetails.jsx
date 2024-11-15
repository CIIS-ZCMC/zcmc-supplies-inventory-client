import React from 'react';
import { Grid, Stack, Box, Typography, Divider, Sheet } from '@mui/joy';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import useReceivingHook from '../../Hooks/ReceivingHook'

const ReceivingDetails = () => {

    const { id: urlId } = useParams(); // Get the `id` from the URL

    const { getStockIn } = useReceivingHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['stockin'],
        queryFn: getStockIn,
    })

    const stockinData = data?.data;

    const filteredItems = stockinData?.filter((item) => item.id === Number(urlId));

    // Destructure the first item in filteredItems, if available
    const { purchase_order_no, supply_name, brand_name, iar_no, category_name, supplier_name, source_name, quantity, expiry_date, delivery_date, unit_name } =
        filteredItems?.[0] || {};

    const itemStyles = {
        p: 2,
        mt: 1,
        borderRadius: '10px',
    }

    // Data array for each detail section
    const detailsData = [
        { header: 'Transaction information', label: 'PO Number', value: purchase_order_no },
        { header: 'Product Information', label: 'Item name', value: supply_name },
        { header: '', label: 'Brand', value: brand_name },
        { label: 'IAR number', value: iar_no },
        { label: 'Category', value: category_name },
        { label: 'Supplier', value: supplier_name },
        { label: 'Source', value: source_name },
        { label: 'Quantity', value: quantity },
        { label: 'Expiry Date', value: expiry_date },
        { label: 'Date Delivered', value: delivery_date },
        { label: 'Unit', value: unit_name },
    ];

    return (
        <Stack>
            <Sheet
                variant="outlined"
                sx={{
                    p: 2,
                    borderRadius: '10px',
                    width: '850px',
                }}
            >
                <Typography level="h4">Transaction Overview</Typography>
                <Typography>Complete information about an IAR. This record cannot be edited.</Typography>
                <Divider />

                <Grid container spacing={2} mt={2}>
                    {detailsData.map((detail, index) => (
                        <Grid key={index} xs={12} md={4}>
                            {/* <Typography mb={2}>{detail.header}</Typography> */}
                            <Box>
                                <Sheet variant="outlined" sx={{ ...itemStyles }}>
                                    <Stack>
                                        <Typography variant="body1">{detail.label}</Typography>
                                        <Typography>{detail.value}</Typography>
                                    </Stack>
                                </Sheet>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Sheet>
        </Stack>
    )
}

export default ReceivingDetails
