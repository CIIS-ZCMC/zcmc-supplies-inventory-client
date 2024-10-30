import { Box, Stack, Typography } from "@mui/joy"

//custom components
import SheetComponent from "../../Components/SheetComponent"
import TableComponent from "../../Components/Table/TableComponent"
import ChipComponent from "../../Components/ChipComponent"
import ButtonComponent from "../../Components/ButtonComponent"

const Table = ({ tableHeader, tableData, tableTitle, tableSubtitle, btnLabel, onClick }) => {
    return (
        <div>
            <SheetComponent>
                <Box p={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box>
                            <Stack mb={1} direction={'row'} alignItems={'startcenter'}>
                                <Typography
                                    level="h4"
                                    mr={1} >
                                    {tableTitle}
                                </Typography>
                                <ChipComponent label='8 records' />
                            </Stack>

                            <Typography variant="body-md">
                                {tableSubtitle}
                            </Typography>
                        </Box>

                        <Box>
                            <ButtonComponent
                                onClick={onClick}
                                label={btnLabel}
                            />
                        </Box>
                    </Box>

                    <hr />

                    <TableComponent
                        tableHeader={tableHeader}
                        tableData={tableData}
                    />
                </Box>
            </SheetComponent>
        </div>
    )
}

export default Table