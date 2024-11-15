import React from 'react'

import { Snackbar, Stack, Box } from '@mui/joy'
import { X } from 'lucide-react'

import IconButtonComponent from './IconButtonComponent'


const SnackbarComponent = ({ open, onClose, anchor, color, variant, message }) => {


    return (
        <Snackbar
            color={color}
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={anchor} //{ vertical: 'top', horizontal: 'right' }
            size='lg'
            variant={variant}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Box>
                {message}
            </Box>

            <IconButtonComponent
                icon={X}
                onClick={onClose}
            />

        </Snackbar>
    )
}



export default SnackbarComponent