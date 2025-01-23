import React, { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { ViewIcon } from 'lucide-react'

import useReportsHook from '../../Hooks/ReportsHook'

import PaginatedTable from '../../Components/Table/PaginatedTable'


const ConsumedItems = ({ filter, header, currentYear }) => {

    const { getConsumed } = useReportsHook()

    const { data, isLoading, error } = useQuery({
        queryKey: ['consumedItems', currentYear],
        queryFn: () => getConsumed(currentYear)
    })

    const consumedItemsData = data || [];

    return (
        <div>
            <PaginatedTable
                tableTitle={"Most Consumed Items"}
                tableDesc={"Sample Table Desription"}
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