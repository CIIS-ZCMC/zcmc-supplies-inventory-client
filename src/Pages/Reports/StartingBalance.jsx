import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { ViewIcon } from 'lucide-react'

import useReportsHook from '../../Hooks/ReportsHook'
import PaginatedTable from '../../Components/Table/PaginatedTable'

const StartingBalance = ({ filter, header }) => {

    const { getStartingBal } = useReportsHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['startingBalance'],
        queryFn: () => getStartingBal()
    })

    const startingBalance = data || [];

    return (
        <div>
            <PaginatedTable
                tableTitle={"Starting Balance Items"}
                tableDesc={"Sample Table Desription"}
                loading={isLoading}
                columns={header}
                rows={filter(startingBalance)}
                actions={<ViewIcon />}
                editable={false}
                viewable={true}
            />
        </div>
    )
}

export default StartingBalance