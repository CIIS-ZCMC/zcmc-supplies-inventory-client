import React from 'react';
import useSelectedRow from '../../Store/SelectedRowStore';
import Header from '../../Layout/Header/Header';
import {user} from "../../Data/index";
import { Stack, Typography,Box } from '@mui/joy';
import ContainerComponent from '../../Components/Container/ContainerComponent';
import { Card, CardContent } from '@mui/joy';
import InputComponent from '../../Components/Form/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import Grid from '@mui/joy/Grid';
function TaggingPurchasedOrder(props) {
    const {selectedPo} = useSelectedRow();
console.log(selectedPo)
    const pageDetails = {
        pageTitle: `Tagging  PO#"${selectedPo.PO_number}" `,
        title: 'Reports',
        description: "Tag ORS/BURS no., Amount etc.",
        pagePath: null,
        subTitle: "Viewing Purchased order",
        subPath: null,
    }


const fieldLabels = {
    Category: 'Category',
    DTdelivery: 'Delivery Date',
    FK_faVendors: 'Vendor ID',
    FK_iwItems: 'Item Code',
    IAR: 'IAR Number',
    PO_ITEM_UNIT: 'Item Unit',
    PO_docdate: 'PO Document Date',
    PO_number: 'PO Number',
    SourceFunds: 'Source of Funds',
    api_docno: 'API Document No.',
    barcodeid: 'Barcode ID',
    barcodeidcustom: 'Custom Barcode',
    billto: 'Bill To',
    billtoaddress: 'Billing Address',
    created_at: 'Created At',
    curramt: 'Current Amount',
    deliverDate: 'Actual Delivery Date',
    delivertoaddress: 'Delivery Address',
    deliveryTerms: 'Delivery Terms',
    discount: 'Discount',
    docbarcodeid: 'Document Barcode ID',
    fullname: 'Supplier Name',
    id: 'Record ID',
    isInmms: 'Included in MMS',
    itemSpec: 'Item Specification',
    itemabbrev: 'Item Abbreviation',
    itemdesc: 'Item Description',
    itemdesccustom: 'Custom Item Description',
    itemgroup: 'Item Group',
    locamt: 'Local Amount',
    netcurramt: 'Net Current Amount',
    netlocamt: 'Net Local Amount',
    phicprice: 'PHIC Price',
    postatus: 'PO Status',
    postdate: 'Post Date',
    pr_old_po_number: 'Old PO Number',
    purcprice: 'Purchase Price',
    reorderdatestart: 'Reorder Date Start',
    saleprice: 'Sale Price',
    surgicaltype: 'Surgical Type',
    totitm: 'Total Items',
    totqty: 'Total Quantity',
    updated_at: 'Updated At',
    vat: 'VAT (%)',
    vatamt: 'VAT Amount'
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
  
    console.log("All form values:", formValues);
  }

    return (
        <div>
               <Header pageDetails={pageDetails} data={user} />
            {/* {JSON.stringify(selectedPo)} */}
           
                              <ContainerComponent>

       <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, boxShadow: 'lg' }}>
      <CardContent>
        <Typography level="h4" gutterBottom>
          Purchase Order Details
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(selectedPo).map(([key, value]) => 
            {
                if(!['id', 'isInmms','updated_at','created_at','FK_faVendors'].includes(key)){
                    return  <Grid xs={6} key={key}>
                    <Typography level="body-sm" fontWeight="lg">
                      {fieldLabels[key] || key}
                    </Typography>
                    <Typography level="body-md">
                      {value === null || value === ''
                        ? '—'
                        : !isNaN(value) && !isNaN(parseFloat(value)) && value.length > 3 && !['PO_number', 'pr_old_po_number'].includes(key)
                        ? Number(value).toLocaleString()
                        : value}
                    </Typography>
                  </Grid>
                }
            
            })}
        </Grid>
        <Box
  sx={{
    position: 'sticky',
    bottom: 0,
    zIndex: 100,
    //backgroundColor: 'white',
  //  boxShadow: '0 -2px 6px rgba(0,0,0,0.05)',
    pt: 2,
  }}
>
    <form onSubmit={handleSubmit}>
            <Card sx={{marginTop:"10px",borderLeft:"5px solid #FFA55D"}}>
        <Typography level='body-xs'>
            TAGGING
        </Typography>
        <Grid container spacing={2}>
        <Grid xs={6} >
      <Box >
      <Typography>
            Fund Cluster :
        </Typography>
        <InputComponent fullWidth isRequired 
        name={"fund_cluster"}
        />
      </Box>
      <Box >
      <Typography>
            Funds Available :
        </Typography>
        <InputComponent fullWidth isRequired
         name={"fund_available"}
        />
      </Box>
         </Grid>
         <Grid xs={6} >
         <Box >
      <Typography>
            ORS/BURS No.:
        </Typography>
        <InputComponent fullWidth isRequired
         name={"ors_burs_no"}
        />
      </Box>
      <Box >
      <Typography>
          Date of ORS/BURS :
        </Typography>
        <InputComponent fullWidth type={"date"} isRequired
          name={"ors_burs_date"}
        />
      </Box>
      <Box >
      <Typography>
          Amount:
        </Typography>
        <InputComponent fullWidth isRequired
          name={"amount"}
        />
      </Box>
         </Grid>
        </Grid>
      <ButtonComponent
      type={"submit"}
        label={"Submit"}
      />
      
       </Card> 
    </form>


</Box>
      
      </CardContent>
    </Card>         
 </ContainerComponent>
        </div>
    );
}

export default TaggingPurchasedOrder;