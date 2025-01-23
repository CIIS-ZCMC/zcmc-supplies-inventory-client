import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { ViewIcon } from 'lucide-react'

import useReportsHook from '../../Hooks/ReportsHook'
import PaginatedTable from '../../Components/Table/PaginatedTable'

const DisposalItems = ({ filter, header, currentMonthYear }) => {

    const { getDisposal } = useReportsHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['disposalItems', currentMonthYear],
        queryFn: () => getDisposal(currentMonthYear)
    })

    const disposalItems = data || [];

    return (
        <div>
            <PaginatedTable
                tableTitle={"Disposal Items"}
                tableDesc={"Sample Table Desription"}
                loading={isLoading}
                columns={header}
                rows={filter(disposalItems)}
                actions={<ViewIcon />}
                editable={false}
                viewable={true}
            />
        </div>
    )
}

export default DisposalItems