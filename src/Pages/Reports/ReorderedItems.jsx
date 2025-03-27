import { useQuery } from '@tanstack/react-query'
import { ViewIcon } from 'lucide-react'

import { Stack, Box, Typography } from "@mui/joy"

import useReportsHook from '../../Hooks/ReportsHook'
import PaginatedTable from '../../Components/Table/PaginatedTable'

const ReorderedItems = ({ filter, currentMonthYear, header, InfoDescription, stock_legends }) => {

    const { getReorder } = useReportsHook()

    const { data, isLoading, error } = useQuery({
        queryKey: ["reorder", currentMonthYear],
        queryFn: () => getReorder(currentMonthYear),
    });

    const reorderData = data;

    const TableDescription = () => (
        <>
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Stack direction={'row'} gap={1}>
                    <InfoDescription />

                    <Typography
                        bgcolor={"#FEF2E6"}
                        sx={{ color: '#666666' }}
                        fontSize={13}
                    >
                        those below the 7-month threshold (number of months left to consume)
                    </Typography>

                </Stack>

                <Stack direction="column" gap={1}>
                    <Typography level="body-sm">
                        Legend (by number of months left prior expiry)
                    </Typography>

                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        gap={1}
                    >
                        {stock_legends?.map((e, i) => (
                            <>
                                <Box
                                    bgcolor="white"
                                    padding={0.5}
                                    borderRadius={100}
                                    style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                                >
                                    <Box
                                        borderRadius={100}
                                        bgcolor={e.color}
                                        width={15}
                                        height={15}
                                    ></Box>
                                </Box>

                                <Typography key={i} level="body-sm">
                                    {e.label}
                                </Typography>
                            </>
                        ))}
                    </Box>

                </Stack>

            </Box>
        </>
    )

    return (
        <div>
            <PaginatedTable
                // tableTitle={"Reordered Items"}
                tableDesc={<TableDescription />}
                loading={isLoading}
                columns={header}
                rows={filter(reorderData)}
                actions={<ViewIcon />}
                editable={false}
                viewable={true}
            />
        </div>
    )
}

export default ReorderedItems