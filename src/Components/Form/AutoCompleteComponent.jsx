
import { Box, Autocomplete, FormControl, FormLabel, Typography } from '@mui/joy';

const AutoCompleteComponent = ({ name, placeholder, label, options = [], width, onChange, value, fullWidth, error, helperText }) => {

    return (
        <Box>
            <FormControl fullWidth>
                <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
                <Autocomplete
                    error={error}
                    name={name}
                    sx={{ marginTop: 1, width, width }}
                    options={options}
                    placeholder={placeholder}
                    size='lg'
                    onChange={onChange}
                    value={value}
                    fullWidth={fullWidth}
                />
                {error && <Typography variant="body2" color="danger" sx={{ marginTop: 1 }}>{helperText}</Typography>}
            </FormControl>
        </Box>
    );
}

export default AutoCompleteComponent;
