// Import Option from @mui/joy
import {
  Select,
  selectClasses,
  Option,
  Box,
  FormControl,
  FormLabel,
} from "@mui/joy";
import { ChevronDown } from "lucide-react";

const SelectComponent = ({
  options = [],
  placeholder,
  name,
  label,
  width,
  startIcon,
  value,
  onChange,
}) => {
  const getLabelAndValue = (option) => {
    console.log(option);
    const label =
      option.source_name ||
      option.name ||
      option.title ||
      option.area_name ||
      option.category_name ||
      "Unknown";
    const value =
      option.value || option.id || option.key || option.code || label;

    const icon = option.icon || "";
    return { label, value, icon };
  };

  return (
    <Box>
      <FormControl>
        <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
        <Select
          placeholder={placeholder}
          name={name}
          size="md"
          indicator={<ChevronDown />}
          sx={{
            width: width,
            [`& .${selectClasses.indicator}`]: {
              transition: "0.2s",
              [`&.${selectClasses.expanded}`]: {
                transform: "rotate(-180deg)",
              },
            },
          }}
          startDecorator={startIcon}
          value={value}
          onChange={(e, newValue) => onChange(newValue)}
        >
          {options.map((option, index) => {
            const { label, value, icon } = getLabelAndValue(option);
            return (
              <Option key={value || index} value={value}>
                {icon}
                {label}
              </Option>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
