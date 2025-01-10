import { FormLabel, FormControl, Input } from "@mui/joy";
import { Calendar1Icon } from "lucide-react";

const DatePickerComponent = ({
  label,
  width,
  placeholder,
  value,
  name,
  onChange,
  error,
  helperText,
  size,
  startDecorator,
  type = "date",
  actions,
  disabled,
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
    if (actions) {
      actions(e.target.value);
    }
  };
  return (
    <>
      <FormControl>
        <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
        <Input
          disabled={disabled}
          sx={{ width: width, marginTop: 1, }}
          value={value || ""}
          name={name}
          onChange={handleChange}
          size={size}
          type={type}
          error={error}
          placeholder={placeholder}
          startDecorator={startDecorator}
          slotProps={
            {
              // input: {
              //     min: '2018-06-07',
              //     max: '2018-06-14',
              // },
            }
          }
        />
        {error && <div style={{ color: "danger" }}>{helperText}</div>}{" "}
        {/* Display error message */}
      </FormControl>
    </>
  );
};
export default DatePickerComponent;
