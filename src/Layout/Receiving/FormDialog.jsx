import { useEffect } from 'react'

import { Box, Typography, Stack } from "@mui/joy";
import { useQuery } from '@tanstack/react-query';

// custom components
import AutoCompleteComponent from "../../Components/Form/AutoCompleteComponent";
import InputComponent from "../../Components/Form/InputComponent";
import SelectComponent from "../../Components/Form/SelectComponent";
import DatePickerComponent from '../../Components/Form/DatePickerComponent';

import useSourceHook from '../../Hooks/SourceHook'
import useAreasHook from '../../Hooks/AreasHook'
import useCategoriesHook from '../../Hooks/CategoriesHook';

const FormDialog = () => {

    //hooks 
    const { getAreas } = useAreasHook();
    const { getSources } = useSourceHook();
    const { getCategories } = useCategoriesHook();

    //fetch sources data with react-query
    const { data: sourcesData, isLoading, error } = useQuery({
        queryKey: ['sources'],
        queryFn: getSources,
    });

    //fetch areas data with react-query
    const { data: areasData, isLoading: isAreasLoading, error: areasError } = useQuery({
        queryKey: ['areas'],
        queryFn: getAreas,
    });

    //fetch categories data with react-query
    const { data: categoriesData, isLoading: isCategoriesLoading, error: categoriesError } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    const sources = sourcesData?.data
    const areas = areasData?.data
    const cetegories = categoriesData?.data

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

                            {/* <AutoCompleteComponent
                                placeholder={'Search Item...'}
                                label={'Item Name'}
                                options={sources} // Pass sources as options
                            /> */}

                            <SelectComponent
                                placeholder="Select a source"
                                label="Source"
                                options={sources} // Pass sources as options
                                width={300}
                            />
                        </Box>

                        <Box mt={2}>
                            {/* <SelectComponent
                                placeholder="Select an office"
                                label='Requesting Office'
                                options={areas}
                                width={300}
                            /> */}
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
                        {/* <SelectComponent
                            placeholder="Assign in a category"
                            label='Category'
                            options={cetegories}
                        /> */}
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