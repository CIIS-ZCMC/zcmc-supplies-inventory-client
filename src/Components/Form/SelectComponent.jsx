// Import Option from @mui/joy
import { Select, selectClasses, Option, Box, FormControl, FormLabel } from "@mui/joy";
import { ChevronDown } from "lucide-react";

const SelectComponent = ({ options = [], placeholder, name, label, width }) => {

    const getLabelAndValue = (option) => {
        const label = option.source_name || option.name || option.title || option.area_name || option.category_name || "Unknown";
        const value = option.id || option.key || option.code || label;
        return { label, value };
    };

    return (
        <Box>
            <FormControl>
                <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
                <Select
                    placeholder={placeholder}
                    name={name}
                    size="lg"
                    indicator={<ChevronDown />}
                    sx={{
                        width: width,
                        [`& .${selectClasses.indicator}`]: {
                            transition: '0.2s',
                            [`&.${selectClasses.expanded}`]: {
                                transform: 'rotate(-180deg)',
                            },
                        },
                    }}
                >
                    {options.map((option, index) => {
                        const { label, value } = getLabelAndValue(option);
                        return (
                            <Option key={value || index} value={value}>
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
