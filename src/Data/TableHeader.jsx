export const releasingHeader = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: '#',
    },
    {
        id: 'supply_name',
        numeric: false,
        disablePadding: false,
        label: 'Item Name',
    },
    {
        id: 'category_name',
        numeric: false,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'requested_quantity',
        numeric: true,
        disablePadding: false,
        label: 'Total Quantity Requested',
    },
    {
        id: 'quantity',
        numeric: true,
        disablePadding: false,
        label: 'Total Quantity Served',
    },
    {
        id: 'unit_name',
        numeric: false,
        disablePadding: false,
        label: 'Unit',
    },

    { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
]

export const receivingHeader = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: '#',
    },

    {
        id: 'purchase_order_no',
        numeric: false,
        disablePadding: false,
        label: 'PO Number',
    },

    {
        id: 'iar_no',
        numeric: false,
        disablePadding: false,
        label: 'IAR Number',
    },

    {
        id: 'supply_name',
        numeric: false,
        disablePadding: false,
        label: 'Item Name',
    },

    {
        id: 'category_name',
        numeric: false,
        disablePadding: false,
        label: 'Category',
    },

    {
        id: 'unit_name',
        numeric: false,
        disablePadding: false,
        label: 'Unit',
    },

    {
        id: 'quantity',
        numeric: false,
        disablePadding: false,
        label: 'Quantity',
    }

]