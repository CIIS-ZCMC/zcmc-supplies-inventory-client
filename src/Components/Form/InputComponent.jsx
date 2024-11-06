import PropTypes from "prop-types";
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";

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
  placeholder,
  helperText,
  value,
  setValue,
  autoFocus,
  fontWeight,
  startIcon,
  fullWidth,
  width,
}) {
  return (
    <FormControl>
      <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
      <Input
        size="md"
        variant="outlined"
        color="primary"
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        fullWidth={fullWidth}
        onChange={(e) => setValue(e.target.value)}
        sx={{ fontWeight: fontWeight }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default InputComponent;
