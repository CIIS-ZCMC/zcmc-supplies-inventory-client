import React from 'react';
import { Stack, Typography } from '@mui/material';

const LabelComponent = ({ label, value }) => {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Typography sx={{ fontSize: '1rem', width: 150 }}>{label}</Typography>
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 'medium' }}>
                {value === null ? "N/A" : value}
            </Typography>
        </Stack>
    );
};

export default LabelComponent;