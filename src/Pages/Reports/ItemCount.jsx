import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { ViewIcon } from 'lucide-react'

import useReportsHook from '../../Hooks/ReportsHook'
import PaginatedTable from '../../Components/Table/PaginatedTable'

const ItemCount = ({ filter, header }) => {

    const { getItemCount } = useReportsHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['itemCount',],
        queryFn: () => getItemCount()
    })

    const itemCount = data || [];

    return (
        <div>
            <PaginatedTable
                tableTitle={"Item Count"}
                tableDesc={"Sample Table Desription"}
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