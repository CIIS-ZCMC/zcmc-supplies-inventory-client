export const items = [
    {
        id: '1',
        item_name: 'Zonrox Color Bleach',
        category: "Laboratory Essentials",
        quantity_requested: '1400',
        quantity_served: '800/1400',
        unit: 'Box'
    },

    {
        id: '2',
        item_name: 'Zonrox Color Bleach',
        category: "Laboratory Essentials",
        quantity_requested: '1400',
        quantity_served: '800/1400',
        unit: 'Gallon'
    }
]

export const user = {
    name: "Remy Sharp",
    email: "email@domain.com",
    src: "https://mui.com/static/images/avatar/1.jpg"
};

export const categoryFilter = [
    { name: "Janitorial", value: "Janitorial" },
    { name: "Medical", value: "Medical" },
    { name: "Office", value: "Office" },
];

export const sortFilter = [
    { name: "Alphabetical (A-Z)", value: "asc" },
    { name: "Alphabetical (Z-A)", value: "desc" },
    // { name: "By Date (Newest First)", value: "date_desc" },
    // { name: "By Date (Oldest First)", value: "date_asc" },
];

const baseYear = 2022;
const currentYear = new Date().getFullYear();

// Ensure 2024 is always included
const filterByYear = [{ name: `${baseYear}`, value: baseYear.toString() }];

// Add each new year only when it passes
for (let year = baseYear + 1; year <= currentYear; year++) {
    filterByYear.push({ name: `${year}`, value: year.toString() });
}

export { filterByYear };

export const legends = [
    {
        backgroundColor: '#D32F2F',
        title: 'Out of stocks'
    },

    {
        backgroundColor: '#F57C00',
        title: 'Low Stock'
    },

    {
        backgroundColor: '#FFE347',
        title: 'Moderate'
    },

    {
        backgroundColor: '#388E3C',
        title: 'Sufficient'
    },
]
