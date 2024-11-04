import { useEffect } from 'react'

import { Box, Typography, Stack } from "@mui/joy";

// custom components
import AutoCompleteComponent from "../../Components/Form/AutoCompleteComponent";
import InputComponent from "../../Components/Form/InputComponent";
import SelectComponent from "../../Components/Form/SelectComponent";
import DatePickerComponent from '../../Components/Form/DatePickerComponent';

import useSourceHook from '../../Hooks/SourceHook'

const categoryFilter = [
    { name: 'Option 1', value: 'option 1' },
    { name: 'Option 2', value: 'option 2' },
    { name: 'Option 3', value: 'option 3' }
]

const FormDialog = () => {

    const { getSources, } = useSourceHook();

    useEffect(() => {
        getSources(); // Call the function to fetch data
    }, [getSources]);

    return (
        <form>
            <Box>
                <AutoCompleteComponent
                    placeholder={'Search Item...'}
                    label={'Item Name'}
                />

                <Typography
                    mt={2}
                >
                    Item’s current stock level: 1,200/3,000 (40% remaining)
                </Typography>
                <Box mt={4} >
                    <Stack direction='row' spacing={3} >
                        <Box mt={2}>
                            <SelectComponent
                                placeholder="Select a source"
                                label='Source'
                                options={categoryFilter}
                                width={300}
                            />
                        </Box>

                        <Box mt={2}>
                            <SelectComponent
                                placeholder="Select an office"
                                label='Requesting Office'
                                options={categoryFilter}
                                width={300}
                            />
                        </Box>

                    </Stack>

                    <Stack mt={2} direction='row' spacing={3} >
                        <DatePickerComponent
                            width={300}
                            label='RIS date'
                            placeholder='xxxx.xx.xx'
                        />
                        <InputComponent
                            label="RIS number"
                            placeholder='xxx.xxx.xxx'
                            width={300}
                            fullWidth={true}
                        />
                    </Stack>

                    <Box mt={2}>
                        <SelectComponent
                            placeholder="Assign in a category"
                            label='Category'
                            options={categoryFilter}
                        />
                    </Box>

                    <Stack mt={2} direction='row' spacing={3} >

                        <InputComponent
                            label="Quantity Requested"
                            placeholder='xxx.xxx.xxx'
                            width={300}
                            fullWidth={true}
                        />

                        <InputComponent
                            label="Quantity Served"
                            placeholder='xxx.xxx.xxx'
                            width={300}
                            fullWidth={true}
                        />
                    </Stack>

                </Box>

            </Box>
        </form>
    )
}

export default FormDialog