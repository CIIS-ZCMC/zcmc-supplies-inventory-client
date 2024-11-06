import { FormLabel, FormControl, Input } from "@mui/joy";
import { Calendar1Icon } from "lucide-react";

const DatePickerComponent = ({ label, width, placeholder, startIcon }) => {
  return (
    <>
      <FormControl>
        <FormLabel sx={{ fontSize: 13, fontWeight: 500 }}>{label}</FormLabel>
        <Input
          sx={{ width: width }}
          size="md"
          type="date"
          placeholder={placeholder}
          slotProps={
            {
              // input: {
              //     min: '2018-06-07',
              //     max: '2018-06-14',
              // },
            }
          }
          startDecorator={startIcon}
        />
      </FormControl>
    </>
  );
};

export default DatePickerComponent;
