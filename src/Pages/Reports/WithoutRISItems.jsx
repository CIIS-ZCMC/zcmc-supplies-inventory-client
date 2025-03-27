import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { ViewIcon } from 'lucide-react'

import useReportsHook from '../../Hooks/ReportsHook'
import PaginatedTable from '../../Components/Table/PaginatedTable'

const WithoutRISItems = ({ currentYear, filter, header }) => {

    const { getUnconsumed } = useReportsHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['unconsumedItems', currentYear],
        queryFn: () => getUnconsumed(currentYear)
    })

    const unconsumedItems = data || [];

    return (
        <div>
            <PaginatedTable
                // tableTitle={"Unconsumed without ris"}
                tableDesc={"Sample Table Desription"}
                loading={isLoading}
                columns={header}
                rows={filter(unconsumedItems)}
                actions={<ViewIcon />}
                editable={false}
                viewable={true}
            />
        </div>
    )
}

export default WithoutRISItems
