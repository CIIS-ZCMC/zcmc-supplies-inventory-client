import React from 'react'

import { Box } from '@mui/joy'
import ButtonComponent from '../../Components/ButtonComponent'

const TableDescription = ({ label, onClick }) => {
    return (
        <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'end'}
            alignItems={'end'}
            mt={1}
        >
            <ButtonComponent
                size="sm"
                label={label}
                onClick={onClick}
            />
        </Box>
    )
}

export default TableDescription