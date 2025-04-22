import React, { Fragment, useEffect } from "react";
import Header from "../../Layout/Header/Header";
import useSelectedRow from "../../Store/SelectedRowStore";
import { items, user } from "../../Data/index";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import useInventoryHook from "../../Hooks/InventoryHook";
import { Box, Stack, Typography } from "@mui/joy";
import BoxComponent from "../../Components/Container/BoxComponent";
import { BiCategory } from "react-icons/bi";
import { useTheme } from "@emotion/react";
import { MdAppShortcut, MdTune } from "react-icons/md";
import { GrApps } from "react-icons/gr";
import ButtonComponent from "../../Components/ButtonComponent";
import { useParams } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { BsColumnsGap } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ImBoxAdd } from "react-icons/im";
export const BoxItem = ({ icon, iconColor, categoryTitle, categoryName ,option}) => {
  const theme = useTheme(); // Access the theme

  return (
    <BoxComponent>
    
      <Box display="flex" alignItems="center" padding={1}>
        {icon}
        <Stack direction="row" justifyContent="space-between" width="100%" ml={1}>
  <Box>
    <Typography level="body-sm">{categoryTitle}</Typography>
    <Typography level="title-lg">{categoryName}</Typography>
  </Box>
  <Box>
    {option}
  </Box>
</Stack>

      
      </Box>

    </BoxComponent>
  );
};

function ViewDetails(props) {
  const theme = useTheme();
  const { selectedRow ,setSelectedItem} = useSelectedRow();
  const { id } = useParams();
  // const storedSupplyName = localStorage.getItem("selectedRow");
  const { details, getInventoryDetails,stockouts,startingBalance ,stockins} = useInventoryHook();
  const navigate = useNavigate();
  
  const pageDetails = {
    pageTitle: `Viewing "${selectedRow?.supply_name}"`,
    title: "Inventory",
    description:
      "See how an RIS item was received by your inventory, including more information about its integrity.",
    pagePath: "/inventory",
    subTitle: "Viewing Item",
    subPath: "/viewing/:id",
  };
  const columns = [
    // { id: "id", label: "#" },
    { id: "supplier_name", label: "Supplier" },
    { id: "category_name", label: "Category" },
    { id: "brand_name", label: "Brand" },
    { id: "unit_name", label: "Unit" },
    { id: "source_name", label: "Source" },
    { id: "delivery_date", label: "Delivery Date" },
    { id: "quantity", label: "Quantity" }
  ];

  const totalQuantity = details.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getInventoryDetails(id);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [getInventoryDetails]);
  return (
    <Fragment>
      <Header pageDetails={pageDetails} data={user} />
      <Stack my={2}>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
     
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
            categoryName={`${selectedRow?.quantity} | ${selectedRow?.unit_name}`}
            categoryTitle={"Total quantity | Unit type"}
          />

<BoxItem           
             icon={
               <ImBoxAdd
                 fontSize={30}
                 color="darkBlue"
                 style={{
                   padding: 10,
                   backgroundColor: theme.palette.custom.lighter,
                 }}
               />
             }
             option={  <ButtonComponent
               variant={"outlined"}   
               size="lg"
               color="neutral"
               onClick={()=>{
                 navigate(`/reports/receiving/${selectedRow?.id}`)        
              //  //  setSelectedItem(selectedRow)
               }}
              label={<IoLogOutOutline
               fontSize={20}           
               />}
             />}
             categoryName={stockins}
             categoryTitle={"Total quantity received (IAR)"}
           />
             


             <BoxItem
             
            icon={
              <TbTruckDelivery
                fontSize={30}
                color="darkBlue"
                style={{
                  padding: 10,
                  backgroundColor: theme.palette.custom.lighter,
                }}
              />
            }
            option={  <ButtonComponent
              variant={"outlined"}   
              size="lg"
              color="neutral"
              onClick={()=>{
                navigate(`/reports/releasing/${selectedRow?.id}`)        
              //  setSelectedItem(selectedRow)
              }}
             label={<IoLogOutOutline
              fontSize={20}           
              />}
            />}
            categoryName={stockouts}
            categoryTitle={"Total quantity released (RIS)"}
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
            option={

              <ButtonComponent
              variant={"outlined"}
              label={<IoLogOutOutline
                fontSize={20}           
                />}
              size="lg"
              color="neutral"
              onClick={()=>{
              //  console.log(selectedRow?.id)
                navigate(`/reports/starting-balance/${selectedRow?.id}`)
               
              }}
            
            />
            }
            categoryName={startingBalance}
            categoryTitle={"Starting balance"}
          />

        </Stack>
      </Stack>
      <ContainerComponent>
        <PaginatedTable
          tableTitle={"More information"}
          tableDesc={
            "A single item can have multiple brands, suppliers, expiry dates and more."
          }
          columns={columns}
          rows={details}
          actionBtns={
            <Stack direction="row" spacing={1} mt={2}>
              <ButtonComponent
                variant={"solid"}
                label="Generate report"
                size="lg"
              />
            </Stack>
          }
        />
      </ContainerComponent>
    </Fragment>
  );
}

export default ViewDetails;
