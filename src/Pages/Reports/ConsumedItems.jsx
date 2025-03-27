import React, { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { ViewIcon } from 'lucide-react'

import { Stack, Box, Typography } from '@mui/joy'

import useReportsHook from '../../Hooks/ReportsHook'

import PaginatedTable from '../../Components/Table/PaginatedTable'


const ConsumedItems = ({ filter, header, currentYear, InfoDescription }) => {

    const { getConsumed } = useReportsHook()

    const { data, isLoading, error } = useQuery({
        queryKey: ['consumedItems', currentYear],
        queryFn: () => getConsumed(currentYear)
    })

    const consumedItemsData = data || [];

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
                        its number of average monthly consumption
                    </Typography>
                </Stack>
            </Box>
        </>
    )

    return (
        <div>
            <PaginatedTable
                // tableTitle={"Most Consumed Items"}
                tableDesc={<TableDescription />}
                loading={isLoading}
                columns={header}
                rows={filter(consumedItemsData)}
                actions={<ViewIcon />}
                editable={false}
                viewable={true}
            />
        </div>
    )
}

export default ConsumedItems