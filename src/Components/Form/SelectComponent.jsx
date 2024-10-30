import { Select, selectClasses, Option, Box, FormControl, FormLabel } from "@mui/joy"
import { ChevronDown } from "lucide-react"

const SelectComponent = ({ options, placeholder, name, label, width }) => {
    return (
        <>
            <Box >

                <FormControl>
                    <FormLabel sx={{ fontSize: 14, fontWeight: 500 }} >{label}</FormLabel>
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
                        {options.map(({ value, name }, index) => (
                            <Option
                                key={index}
                                value={value}
                            >
                                {name}
                            </Option>
                        ))}
                    </Select>
                </FormControl>



            </Box>
        </>
    )
}

export default SelectComponent