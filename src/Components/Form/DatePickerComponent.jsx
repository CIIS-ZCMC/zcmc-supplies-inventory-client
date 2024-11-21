import { FormLabel, FormControl, Input } from "@mui/joy";
import { Calendar1Icon } from "lucide-react";

const DatePickerComponent = ({ label, width, placeholder, value, name, onChange, error, helperText, disabled }) => {
  return (
    <>
      <FormControl >
        <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
        <Input
          disabled={disabled}
          sx={{ width: width, marginTop: 1, }}
          value={value}
          name={name}
          onChange={(event) => {
            onChange(event.target.value); // Pass the new date value to Formik
          }}
          size='lg'
          type="date"
          error={error}
          placeholder={placeholder}
          slotProps={{
            // input: {
            //     min: '2018-06-07',
            //     max: '2018-06-14',
            // },
          }}
        />
        {error && <div style={{ color: 'danger' }}>{helperText}</div>} {/* Display error message */}
      </FormControl>
    </>
  )
}
export default DatePickerComponent;
