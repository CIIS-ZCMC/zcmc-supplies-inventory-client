import React from 'react';
import Header from '../../../Layout/Header/Header';
import {user} from '../../../Data/index';
import useSelectedRow from '../../../Store/SelectedRowStore';
import ContainerComponent from '../../../Components/Container/ContainerComponent';
import PaginatedTable from '../../../Components/Table/PaginatedTable';
import { Stack, Typography,Box } from '@mui/joy';
import ButtonComponent from '../../../Components/ButtonComponent';
import { useQuery } from '@tanstack/react-query';
import useReleasingHook from '../../../Hooks/ReleasingHook';
import { releasingHeader } from '../../../Data/TableHeader';
import { SquareArrowOutUpRight, Pencil } from "lucide-react";
import { useNavigate } from 'react-router-dom';
function ViewReleasedItem(props) {
    const navigate = useNavigate();

    const { selectedRow } = useSelectedRow();
    const pageDetails = {
        pageTitle: `Viewing "${selectedRow?.supply_name}"`,
        title: 'Reports',
        description: "Released quantities.",
        pagePath: "/reports/starting-balance",
        subTitle: "Viewing Released item (RIS)",
        subPath: null,
    }
    const { getSuppliesStockOutList } = useReleasingHook();

   
    const { data, isLoading, error,status } = useQuery({
        queryKey: ["stockouts_lists"],
        queryFn:getSuppliesStockOutList(selectedRow?.id),
      });
console.log(error);
    
    return (
        <div>
              <Header pageDetails={pageDetails} data={user} />

                   <ContainerComponent>
                              <PaginatedTable
                                  tableTitle={<>
                                 <Typography level="body-lg" fontWeight={"bold"}>
                                 Requisition and issue slip
                                                   </Typography>
                                  </>}
                                  //tableDesc={"A single item can have multiple brands, suppliers, expiry dates and more."}
                                  loading={isLoading}
                                  columns={releasingHeader}
                                  rows={data?.data}
                                  actionBtns={
                                      <Stack direction="row" spacing={1} mt={2}>
                                          <ButtonComponent
                                              variant={"outlined"}
                                              label="Generate report"
                                              size="lg"
                                          />
                                      </Stack>
                                  }
                                  customAction={true}
                                  handleCustomAction={(perRow)=>{
                                    return <>
                                   <ButtonComponent
                                     startDecorator={
                                                <SquareArrowOutUpRight size={"1rem"} />
                                                                   }
                                              variant={"plain"}
                                            
                                              size="sm"
                                              onClick={()=>{
                                                // localStorage.setItem("supply_year",perRow.year)
                                                // localStorage.setItem("supply_name",perRow.supply_name)
                                                navigate(`/releasing/${perRow?.id}`)
                                              }}
                                          />
                                    </>
                                  }}
                              />      
                          </ContainerComponent>
        </div>
    );
}

export default ViewReleasedItem;