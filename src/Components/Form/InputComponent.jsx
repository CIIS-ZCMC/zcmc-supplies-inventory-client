import PropTypes from "prop-types";
import {
  FormControl,
  Typography,
  FormLabel,
  Input,
  FormHelperText,
  Box,
} from "@mui/joy";
import ButtonComponent from "../../Components/ButtonComponent";

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
  setValue,
  autoFocus,
  fontWeight,
  startIcon,
  fullWidth,
  width,
  onChange,
  error,
  size,
  isRequired,
  action = false,
  disabled= false,
  type
}) {
  return (
    <FormControl fullWidth>
      <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
      <Box display="flex" alignItems="center" mb={1}>
        <Input
          type={type}
          disabled={disabled}
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
          onKeyDown={(e) => {
            if (e.key === "Enter" && action?.onClick) {
              action.onClick();
            }
          }}
        />
        {action && (
          <ButtonComponent label={action.label} onClick={action.onClick} />
        )}
      </Box>

      {/* {helperText && <FormHelperText>{helperText}</FormHelperText>} */}

      {error && (
        <Typography variant="body2" color="danger">
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
}

export default InputComponent;
