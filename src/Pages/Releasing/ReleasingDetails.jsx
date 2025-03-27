import React, { useEffect } from 'react';

import { Box, Sheet, Stack, Typography } from '@mui/joy';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@emotion/react';

import { BiCategory } from 'react-icons/bi';
import { GrApps } from 'react-icons/gr';
import { MdTune } from 'react-icons/md';

import PaginatedTable from '../../Components/Table/PaginatedTable';
import BoxComponent from '../../Components/Container/BoxComponent';
import ContainerComponent from '../../Components/Container/ContainerComponent';
import ButtonComponent from '../../Components/ButtonComponent';

import { user } from '../../Data/index';

import Header from '../../Layout/Header/Header';
import LabelComponent from '../../Components/Typography/LabelComponent';

import useReleasingHook from '../../Hooks/ReleasingHook';
import useSelectedRow from '../../Store/SelectedRowStore';

export const BoxItem = ({ icon, categoryTitle, categoryName }) => {
    return (
        <BoxComponent>
            <Box display="flex" alignItems="center" padding={1}>
                {icon}
                <Box ml={1}>
                    <Typography level="body-sm">{categoryTitle}</Typography>
                    <Typography level="title-lg">{categoryName}</Typography>
                </Box>
            </Box>
        </BoxComponent>
    );
};

const ReleasingDetails = () => {
    const theme = useTheme();
    const { selectedRow } = useSelectedRow();
    const { id: urlId } = useParams(); // Get the `id` from the URL

    const { getSelectedReleasingList } = useReleasingHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['releasedItem', urlId],
        queryFn: () => getSelectedReleasingList(urlId),
    });

    const releasedItems = data?.data || [];
    const quantityServed = releasedItems[0]?.total_quantity;

    const pageDetails = {
        pageTitle: `Viewing "${selectedRow?.supply_name}"`,
        title: 'RIS',
        description: "Complete information about an IAR. This record cannot be edited.",
        pagePath: ":/releasing",
        subTitle: "Viewing Item",
        subPath: "/viewing/:id",
    }

    const columns = [
        { id: "id", label: "#" },
        { id: "brand_name", label: "Brand" },
        { id: "supplier_name", label: "Suppliers" },
        { id: "source_name", label: "Source" },
        { id: "quantity", label: "Quantity" },
    ];

    const formatData = (data) => {
        return data.map((row) => ({
            ...row,
            brand_name: row.brand_name ?? "N/A",
            supplier_name: row.supplier_name ?? "N/A",
        }));
    };

    useEffect(() => {
        console.log(formatData(releasedItems))
    }, [formatData])

    return (
        <>
            {/* {JSON.stringify(filteredItems)} */}
            <Header pageDetails={pageDetails} data={user} />

            <Stack my={2}>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <BoxItem
                        icon={
                            <BiCategory
                                fontSize={25}
                                color="darkBlue"
                                style={{
                                    padding: 10,
                                    backgroundColor: theme.palette.custom.lighter,
                                    borderRadius: 5,
                                }}
                            />
                        }
                        categoryName={selectedRow?.category_name}
                        categoryTitle={"Item category"}
                    />

                    <BoxItem
                        icon={
                            <GrApps
                                fontSize={25}
                                color="darkBlue"
                                style={{
                                    padding: 10,
                                    backgroundColor: theme.palette.custom.lighter,
                                }}
                            />
                        }
                        categoryName={`${selectedRow?.requested_quantity} | ${quantityServed} `}
                        categoryTitle={"Requested | Served"}
                    />

                    <BoxItem
                        icon={
                            <MdTune
                                fontSize={25}
                                color="darkBlue"
                                style={{
                                    padding: 10,
                                    backgroundColor: theme.palette.custom.lighter,
                                }}
                            />
                        }
                        categoryName={selectedRow?.area_name}
                        categoryTitle={"Type of unit"}
                    />

                    <BoxItem
                        icon={
                            <MdTune
                                fontSize={25}
                                color="darkBlue"
                                style={{
                                    padding: 10,
                                    backgroundColor: theme.palette.custom.lighter,
                                }}
                            />
                        }
                        categoryName={selectedRow?.unit_name}
                        categoryTitle={"Type of unit"}
                    />
                </Stack>
            </Stack>

            <ContainerComponent>
                <PaginatedTable
                    tableTitle={"More information"}
                    tableDesc={"A single item can have multiple brands, suppliers, expiry dates and more."}
                    loading={isLoading}
                    columns={formatData(columns)}
                    rows={releasedItems}
                    actionBtns={
                        <Stack direction="row" spacing={1}>
                            <ButtonComponent
                                variant={"outlined"}
                                label="Generate report"
                                size="lg"
                            />
                        </Stack>
                    }
                />
            </ContainerComponent>
        </>
    );
};

export default ReleasingDetails;
