import React,{ useEffect, useState }  from 'react';
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
import { receivingHeader } from '../../../Data/TableHeader';
import ReceivingDetails from '../../Receiving/ReceivingDetails';
import ModalComponent from '../../../Components/Dialogs/ModalComponent';
function ViewReceivedItem(props) {
    const navigate = useNavigate();
 const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const { selectedRow,setSelectedRow,selectedItem ,setSelectedItem} = useSelectedRow();
    const [row,setRow] = useState([]);

    const pageDetails = {
        pageTitle: `Viewing "${selectedRow?.supply_name}"`,
        title: 'Reports',
        description: "Received quantities.",
        pagePath: "/reports/starting-balance",
        subTitle: "Viewing Received item (IAR)",
        subPath: null,
    }
    const { getSuppliesStockInList,stockinList } = useReleasingHook();
    const { data, isLoading, error,status } = useQuery({
        queryKey: ["stockins_lists"],
        queryFn: () => getSuppliesStockInList(selectedRow?.id),
      });

      const handleViewDialogClose = (row) => {
        setIsViewDialogOpen(false);
    };

 
    return (
        <div>
              <Header pageDetails={pageDetails} data={user} />

                   <ContainerComponent>
                              <PaginatedTable
                                  tableTitle={<>
                                 <Typography level="body-lg" fontWeight={"bold"}>
                                 Receiving (IAR)
                                                   </Typography>
                                  </>}
                                  //tableDesc={"A single item can have multiple brands, suppliers, expiry dates and more."}
                                  loading={isLoading}
                                  columns={receivingHeader}
                                  rows={stockinList}
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
                                                setIsViewDialogOpen(true)
                                                setRow(perRow)
                                                console.log(perRow)
                                              }}
                                          />

                                          
                                    </>
                                  }}
                              />      
                          </ContainerComponent>

                             <ModalComponent
                                          isOpen={isViewDialogOpen}
                                          handleClose={handleViewDialogClose}
                                          content={<ReceivingDetails urlId={row.id} />}
                                          actionBtns={false}
                                          title={"Transaction Overview"}
                                          description={
                                              "Complete information about an IAR. This record cannot be edited."
                                          }
                                      />
        </div>
    );
}

export default ViewReceivedItem;