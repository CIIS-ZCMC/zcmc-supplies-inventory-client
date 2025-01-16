import PropTypes from "prop-types";
import {
  FormControl,
  Typography,
  FormLabel,
  Input,
  FormHelperText,
} from "@mui/joy";

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  value: PropTypes.string.isRequired,
  // setValue: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  fontWeight: PropTypes.number,
  startIcon: PropTypes.object,
  isRequired: PropTypes.bool,
};

function InputComponent({
  label,
  name,
  placeholder,
  helperText,
  value,
  // setValue,
  autoFocus,
  fontWeight,
  startIcon,
  fullWidth,
  width,
  onChange,
  error,
  size,
  isRequired
}) {
  return (
    <FormControl fullWidth>
      <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
      <Input
        required={isRequired}
        width={width}
        name={name}
        size={size}
        variant="outlined"
        error={error}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        fullWidth={fullWidth}
        onChange={onChange ? onChange : (e) => setValue(e.target.value)}
        sx={{ fontWeight: fontWeight, width: width }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default InputComponent;
