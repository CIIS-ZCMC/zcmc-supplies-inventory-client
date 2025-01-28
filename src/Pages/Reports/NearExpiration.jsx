import { useQuery } from "@tanstack/react-query"
import { ViewIcon } from "lucide-react"

import { Stack, Box, Typography } from "@mui/joy"

import useReportsHook from "../../Hooks/ReportsHook"
import PaginatedTable from "../../Components/Table/PaginatedTable"
import { useEffect } from "react"

const NearExpiration = ({ filter, header, expire_legends, InfoDescription }) => {

    const { getNearExp } = useReportsHook()

    const { data, isLoading, error } = useQuery({
        queryKey: ["nearExpiration"],
        queryFn: () => getNearExp()
    })

    const nearExpData = data?.data


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
                        less than 4 months remaining prior date of expiry.
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
                        {expire_legends?.map((e, i) => (
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
                tableTitle={""}
                tableDesc={<TableDescription />}
                loading={isLoading}
                columns={header}
                rows={filter(nearExpData)}
                actions={<ViewIcon />}
                editable={false}
                viewable={true}
            />
        </div>
    )
}

export default NearExpiration