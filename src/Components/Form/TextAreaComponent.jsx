import React from 'react'

import { Textarea, FormControl, FormLabel } from '@mui/joy'

const TextAreaComponent = ({ onChange, label, placeholder, name, value, minRows, maxRows, error, helperText }) => {
    return (
        <FormControl>
            <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
            <Textarea
                placeholder={placeholder}
                minRows={3}
                maxRows={5}
                name={name}
                value={value}
                onChange={onChange}
                error={error}
            // sx={{
            //     width: '100%',
            //     fontSize: '16px',
            //     borderRadius: 'md',
            //     borderColor: 'neutral.outlinedBorder', // Style as needed
            //     '&:focus': { borderColor: 'primary.main' },
            // }}
            />
            {error && <Typography variant="body2" color="danger" sx={{ marginTop: 1 }}>{helperText}</Typography>}
        </FormControl>
    )
}

export default TextAreaComponent