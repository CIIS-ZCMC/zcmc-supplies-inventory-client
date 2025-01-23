import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { ViewIcon } from 'lucide-react'

import useReportsHook from '../../Hooks/ReportsHook'
import PaginatedTable from '../../Components/Table/PaginatedTable'

const ZeroStockItems = ({ filter, header }) => {

    const { getZeroStocks } = useReportsHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['zeroStocksItems'],
        queryFn: () => getZeroStocks()
    })

    const zeroStocksItems = data || [];

    return (
        <div>
            <PaginatedTable
                tableTitle={"Zero Stocks Items"}
                tableDesc={"Sample Table Desription"}
                loading={isLoading}
                columns={header}
                rows={filter(zeroStocksItems)}
                actions={<ViewIcon />}
                editable={false}
                viewable={true}
            />
        </div>
    )
}

export default ZeroStockItems