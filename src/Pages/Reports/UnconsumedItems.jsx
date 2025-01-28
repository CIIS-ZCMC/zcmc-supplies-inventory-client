import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { ViewIcon } from 'lucide-react'

import { Stack, Box, Typography } from '@mui/joy'

import useReportsHook from '../../Hooks/ReportsHook'
import PaginatedTable from '../../Components/Table/PaginatedTable'

const UnconsumedItems = ({ filter, header, InfoDescription, fullyear }) => {

    const { getUnconsumed } = useReportsHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['itemCount', fullyear],
        queryFn: () => getUnconsumed(fullyear)
    })

    const unconsumedItemsData = data || [];

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
                        those with sufficient stocks having months left to consume of greater than 5 months but with no RIS requests
                    </Typography>
                </Stack>
            </Box>
        </>
    )

    return (
        <div>
            <PaginatedTable
                // tableTitle={"Unconsumed without ris"}
                tableDesc={<TableDescription />}
                loading={isLoading}
                columns={header}
                rows={filter(unconsumedItemsData)}
                actions={<ViewIcon />}
                editable={false}
                viewable={true}
            />
        </div>
    )
}

export default UnconsumedItems