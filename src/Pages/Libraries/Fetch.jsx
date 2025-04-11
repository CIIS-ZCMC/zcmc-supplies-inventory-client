import React, { useEffect, useState } from 'react'

import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ButtonComponent from '../../Components/ButtonComponent';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { ListDivider, Typography ,Stack, Card,Input,Select,Option} from '@mui/joy';
import AreaChartIcon from '@mui/icons-material/AreaChart';
import ListIcon from '@mui/icons-material/List';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Groups3Icon from '@mui/icons-material/Groups3';
import moment from 'moment/moment';
import InputComponent from '../../Components/Form/InputComponent';
import useSnackbarHook from '../../Hooks/AlertHook';

export const Fetch = () => {
const [open, setOpen] = React.useState(false);
const {showSnackbar} = useSnackbarHook();
const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setOpen(inOpen);
    };
    const [loader,setLoader] = useState([])
    const [supplies,setSupplies] = useState([]);
    const [btnFetchDisabled,setBtnfetchDisabled] = useState(true);
    const [btnFetchLoader,setBtnFetchLoader] = useState(false);
const syncData = [
    {
        id:1,
        type:"area",
         url:"",
         icon:<AreaChartIcon/>
    },
    {
        id:2,
        type:"categories",
         url:"",
         icon:<ListIcon/>
    },
    {
        id:3,
        type:"units",
         url:"",
         icon:<ApartmentIcon/>
    },
    {
        id:4,
        type:"suppliers",
         url:"",
         icon:<Groups3Icon/>
    }
];
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: moment().format('YYYY') - 2020 + 1 }, (_, i) => 2020 + i);
const inputStyle = {
    marginBottom:"10px"
};
const handleChange = (name) => (event, value) => {
    setSupplies((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };
const handleFetchSupplies = () =>{
    setBtnFetchLoader(true);

    setTimeout(() => {
        showSnackbar("Supplies data fetched successfully!","success","filled")
        setBtnFetchLoader(false)
    }, 4000);
  
}
const handleFetchOthers = (row) => {
    if (!loader.includes(row.id)) {
        setLoader((prev) => [...prev, row.id]);

        setTimeout(() => {
            setLoader((prev) => prev.filter((id) => id !== row.id));
            showSnackbar(`${row.type} data fetched successfully!`,"success","filled")
        }, 4000);
    
        // try {
        //   // Your async request here (replace with actual call)
        //   await yourAsyncFunction(row.id);
    
        //   // You can handle success here (e.g., show a message)
        // } catch (error) {
        //   // Handle error (e.g., show error message)
        //   console.error("Request failed:", error);
        // } finally {
        //   // Remove row.id from loader after request finishes (success or fail)
        //   setLoader((prev) => prev.filter((id) => id !== row.id));
        // }
      }
}
useEffect(() => {
    const hasYearAndMonth = supplies.hasOwnProperty('year') && supplies.hasOwnProperty('month');
    const hasValues = supplies.year && supplies.month;
  
    if (hasYearAndMonth && hasValues) {
        setBtnfetchDisabled(false)
    }
  }, [supplies]);
  
  return (
    <Box sx={{ display: 'flex' }}>
       <ButtonComponent
                  label={"Fetch from BIZBOX"}
                  size="sm"
                  variant={"plain"} 
                  startDecorator={<CloudSyncIcon/>}
                  onClick={toggleDrawer(true)}
                 />
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box
        role="presentation"
      >
      <Box p={5}>
    <Typography level="h4" color="neutral">
        Fetch Data from Bizbox
    </Typography>

    <ListDivider/>
    <Stack spacing={2} direction={"column"}  mt={2}>
        {syncData.map((row)=>
        <Card>
           <Stack direction="row" alignItems="center">
            <Button
                variant="soft"
                sx={{
                textTransform: "uppercase",
                textAlign: "left !important",
                width:"200px"
                }}
                startDecorator={row.icon}
                loading={loader.includes(row.id)}
                loadingPosition="end"
                onClick={()=>handleFetchOthers(row)}
            >
                {row.type} 
            </Button>
            <Box ml="auto">
                <Typography level="body-xs">
                Last synced: {moment().subtract(6, "days").calendar()}
                </Typography>
            </Box>
            </Stack>
        </Card>  
        )}
        <Card sx={{background:"#EFEFEF"}}>
         
           {/* <Box ml="auto">
    <Typography level="body-xs">
      Last synced: {moment().subtract(6, "days").calendar()}
    </Typography>
  </Box> */}


  
 <Box>
 <Box ml="auto" mb={1}>
                <Typography level="body-xs">
                Last synced: {moment().subtract(6, "days").calendar()}
                </Typography>
            </Box>
            <Stack ml="auto" mb={1}>
                <Typography level="body-xs">
               Year: 2002 
                </Typography>
                <Typography level="body-xs">
               Month : 3 
                </Typography>
            </Stack>
    <Typography>
       Select Year
    </Typography>
    <Select 
    onChange={handleChange("year")}
 
    >
  {years.map((year) => (
    <Option key={year} value={year}>
      {year}
    </Option>
  ))}
</Select>
<Typography mt={1}>
       Select Month
    </Typography>
    <Select sx={inputStyle}
      onChange={handleChange("month")}
      
    >
  {months.map((month) => (
    <Option key={month} value={month}>
      {month}
    </Option>
  ))}
</Select>

 <Box display={"flex"} justifyContent={"flex-end"}>
 <Button
    variant="solid"
    sx={{
      textTransform: "uppercase",
      textAlign: "left !important",
      width:"200px"
    }}
    onClick={handleFetchSupplies}
    disabled={btnFetchDisabled}
    loading={btnFetchLoader}
    loadingPosition='end'
  >
    Fetch-Supplies
  </Button>
 </Box>
 </Box>
  </Card>  
    </Stack>
      </Box>
      </Box>
    </Drawer>
  </Box>
  )
}
