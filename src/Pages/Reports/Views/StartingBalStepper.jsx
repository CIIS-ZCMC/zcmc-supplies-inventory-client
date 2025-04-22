import * as React from 'react';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Chip from '@mui/joy/Chip';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import moment from 'moment';
import { Divider } from '@mui/joy';
export default function StartingBalanceStepper({row}) {
    let total = 0;
  return (
    <>
      <Stepper orientation="vertical">
{row?.inventoryTransactionLog.map((data,index)=>{
      total += data.quantity;
 
      return   <Step
      indicator={
        <StepIndicator
        variant={
          row?.inventoryTransactionLog?.length === 1
            ? "solid"
            : index === row?.inventoryTransactionLog?.length - 1
              ? "outlined"
              : "solid"
        }
        color="primary"
        sx={{ fontSize: "9px" }}
      >
        {index + 1}
      </StepIndicator>
      
      
      }
    >
      <Typography level="body-xs">
   <span style={{fontSize:"10px"}}> Released Qty </span> : <Typography  sx={{float:"right"}}>{data.quantity}</Typography> 
   <br />
 <span style={{fontSize:"10px"}}> RIS Date </span>:   <br />  {data.ris_date}
   {/*   <br />
   <span style={{fontSize:"10px"}}> Created at </span>: <br /> {moment(data.created_at).format('Y-MM-D')} */}
  </Typography>
  {index !== row?.inventoryTransactionLog?.length - 1 && <Divider></Divider> }
     
    </Step>
    })}
    </Stepper>
    <Divider></Divider> 
    <Typography level='body-xs' color='danger' >
    TOTAL RELEASED : <Typography fontWeight={"bold"} sx={{float:"right"}}>{total}</Typography>
    </Typography>
    <Typography level='body-xs' color='neutral' >
    STARTING BAL : <Typography fontWeight={"bold"}  sx={{float:"right"}}>{row.quantity}</Typography>
    </Typography>
    <Divider></Divider> 
    <Typography level='body-xs' color='primary' >
    REMAINING BAL  : <Typography fontWeight={"bold"}  sx={{float:"right"}}>{row.quantity - total}</Typography>
    </Typography>
    </>
  
  );
}