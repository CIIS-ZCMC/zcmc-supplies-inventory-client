import React, { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { ViewIcon } from 'lucide-react'

import { Stack, Box, Typography } from '@mui/joy'

import useReportsHook from '../../Hooks/ReportsHook'
import PaginatedTable from '../../Components/Table/PaginatedTable'

const AreaSupplies = ({ filter, header, InfoDescription, currentYear, areaId }) => {

    const { getAreaSupply } = useReportsHook();

    const { data, isLoading, } = useQuery({
        queryKey: ['areaSupplies', areaId, currentYear],
        queryFn: () => getAreaSupply(areaId, currentYear)
    })

    const areaSuppliesData = data || [];

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
                        starting balance of 0 upon start of the year.
                    </Typography>
                </Stack>
            </Box>
        </>
    )

    return (
        <div>
            <PaginatedTable
                // tableTitle={"Starting Balance Items"}
                tableDesc={<TableDescription />}
                loading={isLoading}
                columns={header}
                rows={filter(areaSuppliesData)}
                actions={<ViewIcon />}
                editable={false}
                viewable={true}
            />
        </div>
    )
}

export default AreaSupplies