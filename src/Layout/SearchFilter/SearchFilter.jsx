
import { Box, Stack, Typography } from "@mui/joy"

import InputComponent from "../../Components/Form/InputComponent"
import SheetComponent from "../../Components/SheetComponent"
import ButtonComponent from "../../Components/ButtonComponent"

const SearchFilter = ({ children }) => {
    return (
        <>
            <SheetComponent>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: 'end',
                        justifyContent: 'space-between',
                        my: 2
                    }}
                >
                    <Stack direction='column'>
                        <InputComponent
                            label="Find Item"
                        />
                    </Stack>

                    <Stack
                        direction='row'
                        alignItems={'center'}
                    >
                        {children}
                    </Stack>
                </Box>

                <hr />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="body-lg">
                        Showing 6 records as filtered from 08-01-2023 - Present
                    </Typography>

                    <Stack
                        direction='row'
                    >
                        <ButtonComponent
                            size="sm"
                            variant="outlined"
                            label='Clear Filters'
                        />
                    </Stack>
                </Box>
            </SheetComponent>
        </>
    )
}

export default SearchFilter