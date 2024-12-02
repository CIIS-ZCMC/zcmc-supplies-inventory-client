import React, { useEffect } from 'react'

import { Grid, Typography, Divider, Box } from '@mui/joy'

const Summary = ({ requestingOffice, totalRegularQtyBrands, totalDonationQtyBrands, qtyRequest, risNo }) => {

    // variable for total regualr and donation brands
    const totalBothSources = (totalRegularQtyBrands + totalDonationQtyBrands)

    // useEffect(() => {
    //     console.log(qtyRequest)
    // }, [qtyRequest])

    return (
        <div>

            <Box>

                <Typography>
                    Your RIS contains:
                </Typography>

                <Box
                    sx={{
                        my: 2,
                        p: 2,
                        borderRadius: 10,
                        border: '2px solid #1D70BC',
                        borderColor: '#1D70BC', // Set the border color
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" fontWeight="bold">
                                {totalRegularQtyBrands ? totalRegularQtyBrands : 0}
                            </Typography>
                            <Typography variant="body2">
                                Total quantity to be released from{' '}
                                <Typography component="span" color="success.main" fontWeight="bold">
                                    Regular.
                                </Typography>
                            </Typography>
                        </Grid>

                        {/* Divider between columns */}
                        <Divider
                            orientation="horizontal"
                            flexItem
                            sx={{ mx: 2, bgcolor: '#E0E0E0', width: 1 }}
                        />

                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" fontWeight="bold">
                                {totalDonationQtyBrands ? totalDonationQtyBrands : 0}
                            </Typography>
                            <Typography variant="body2">
                                Total quantity to be released from{' '}
                                <Typography component="span" color="success.main" fontWeight="bold">
                                    Donation.
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Bottom Section */}
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" fontWeight="bold">
                            Total quantity from both sources:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                            {totalBothSources} out of {qtyRequest} requested
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        my: 2,
                        p: 2,
                        borderRadius: 10,
                        border: '1px solid #E6E6E6',
                    }}
                >
                    <Typography level='h6' gutterBottom>
                        General Information:
                    </Typography>

                    <Typography level={'body-md'} gutterBottom>
                        Requested by {requestingOffice}, "RIS #:{risNo}"
                    </Typography>

                    {/* <Typography level={'body-md'} gutterBottom>
                        Includes stocks from 4 brands (2 regular, 2 donation)
                    </Typography> */}
                </Box>


            </Box>

        </div >
    )
}

export default Summary