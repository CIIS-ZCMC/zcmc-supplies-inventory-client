import {
  Box,
  Autocomplete,
  FormControl,
  FormLabel,
  Typography,
  Stack,
} from "@mui/joy";

const AutoCompleteComponent = ({
  name,
  placeholder,
  label,
  options = [],
  width,
  onChange,
  value,
  fullWidth,
  error,
  helperText,
  addBtn
}) => {
  return (
    <Box>
      <FormControl fullWidth>

        <Stack direction={'row'} justifyContent='space-between' alignItems={'center'} mb={1} >
          <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
          {addBtn && addBtn}
        </Stack>

        <Autocomplete
          filterSelectedOptions
          error={error}
          name={name}
          sx={{ width }}
          options={options}
          placeholder={placeholder}
          size="lg"
          onChange={onChange}
          value={value}
          fullWidth={fullWidth}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          getOptionLabel={(option) => option.label || ""} // Safely retrieve the label
        />

        {error && (
          <Typography variant="body2" color="danger">
            {helperText}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default AutoCompleteComponent;
