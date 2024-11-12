import React from 'react'

import { Snackbar, Stack } from '@mui/joy'
import { X } from 'lucide-react'

const SnackbarComponent = ({ open, onClose, anchor, color, variant, message }) => {
    return (
        <Snackbar
            color={color}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={anchor} //{ vertical: 'top', horizontal: 'right' }
            size='lg'
            variant={variant}
        >
            <Stack>
                {message}
            </Stack>

        </Snackbar>
    )
}



export default SnackbarComponent