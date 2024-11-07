import PropTypes from "prop-types";
import { FormControl, Typography, FormLabel, Input } from "@mui/joy";

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  fontWeight: PropTypes.number,
  startIcon: PropTypes.object,
};

function InputComponent({
  label,
  name,
  placeholder,
  helperText,
  value,
  setValue,
  autoFocus,
  fontWeight,
  startIcon,
  fullWidth,
  width,
  onChange,
  error,
  size
}) {
  return (
    <FormControl>
      <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
      <Input
        name={name}
        size={size}
        variant="outlined"
        error={error}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        fullWidth={fullWidth}
        onChange={onChange}
        sx={{ fontWeight: fontWeight }}
      />
      {error && <Typography variant="body2" color="danger" sx={{ marginTop: 1 }}>{helperText}</Typography>}
    </FormControl>
  );
}

export default InputComponent;
