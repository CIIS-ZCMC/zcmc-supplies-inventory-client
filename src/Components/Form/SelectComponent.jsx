import { Select, selectClasses, Option } from "@mui/joy"
import { ChevronDown } from "lucide-react"

const SelectComponent = ({ options, placeholder, name }) => {
    return (
        <>
            <Select
                placeholder={placeholder}
                name={name}
                indicator={<ChevronDown />}
                sx={{
                    width: 200,
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
        </>
    )
}

export default SelectComponent