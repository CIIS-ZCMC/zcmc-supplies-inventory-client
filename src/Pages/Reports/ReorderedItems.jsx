import React, { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { CopyPlus, ViewIcon } from 'lucide-react'
import { Stack } from '@mui/joy'

import useReportsHook from '../../Hooks/ReportsHook'

import ButtonComponent from '../../Components/ButtonComponent'
import PaginatedTable from '../../Components/Table/PaginatedTable'

const ReorderedItems = ({ filter, currentMonthYear, header }) => {

    const { getReorder, reorder } = useReportsHook()

    const { data, isLoading, error } = useQuery({
        queryKey: ["reorder", currentMonthYear],
        queryFn: () => getReorder(currentMonthYear),
    });

    const reorderData = data?.data;

    return (
        <div>
            <PaginatedTable
                tableTitle={"Reordered Items"}
                tableDesc={"Sample Table Desription"}
                loading={isLoading}
                columns={header}
                rows={filter(reorderData)}
                actions={<ViewIcon />}
                editable={false}
                viewable={true}
            />
        </div>
    )
}

export default ReorderedItems