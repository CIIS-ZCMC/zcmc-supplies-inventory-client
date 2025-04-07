import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { ViewIcon } from 'lucide-react'

import { Stack, Box, Typography } from '@mui/joy'

import useReportsHook from '../../Hooks/ReportsHook'
import PaginatedTable from '../../Components/Table/PaginatedTable'

const ItemCount = ({ filter, header, InfoDescription, currentYear }) => {

    const { getItemCount } = useReportsHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['itemCount', currentYear],
        queryFn: () => getItemCount(currentYear)
    })

    const itemCount = data || [];

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
                        the number of balances and consumption.
                    </Typography>
                </Stack>
            </Box>
        </>
    )

    return (
        <div>
        
            <PaginatedTable
                // tableTitle={"Item Count"}
                tableDesc={<TableDescription />}
                loading={isLoading}
                columns={header}
                rows={filter(itemCount)}
                actions={<ViewIcon />}
                editable={false}
                viewable={true}
            />
        </div>
    )
}

export default ItemCount