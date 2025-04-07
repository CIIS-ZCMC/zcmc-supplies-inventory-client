import React, { useEffect, useMemo, useState } from "react";
import { Grid, Typography, Stack, Box, Divider,Checkbox } from "@mui/joy";

import { Trash } from "lucide-react";
import AutoCompleteComponent from "../../../Components/Form/AutoCompleteComponent";
import InputComponent from "../../../Components/Form/InputComponent";
import IconButtonComponent from "../../../Components/IconButtonComponent";

import useReleasingHook from "../../../Hooks/ReleasingHook";
import useSnackbarHook from "../../../Hooks/AlertHook";
const BrandInput = (props) => {

  const { brandQuantities, setBrandQuantity, retrieveKey } = useReleasingHook();
  const {nobrandRegular,noBrandDonation,setBrandRegular,setBrandDonation} = useSnackbarHook();

  function selectedBrand() {
    const filteredBrands = props.brandRegularOptions.find(
      (option) =>
        // console.log(option.id, props.item.brand_id)
        option.id === props.item.brand_id
        && option.supplier_id === props.item.supplier_id
    );
    return filteredBrands
  }

  function currentQuantity() {
 

    const selectedItem = selectedBrand();
    if (!selectedItem) return 0;
    return brandQuantities[retrieveKey(selectedItem)];
  }

  useEffect(() => {

    if (props.item.brand_id) {

      if (selectedBrand()) {
        setBrandQuantity(retrieveKey(selectedBrand()), selectedBrand().quantity || 0);
      }
    }
  }, [props.item.brand_id, props.brandRegularOptions, setBrandQuantity,]);



  // Get the correct quantity for the current source_id
  const filterBrandOptions =
    props.regularBrands.length === 0
      ? props.brandRegularOptions
      : props.brandRegularOptions.filter(
        (outerValue) =>
          !props.regularBrands.find(
            (innerValue) =>
              innerValue.brand_id === outerValue.id &&
              innerValue.supplier_id === outerValue.supplier_id
          )
      );

  const QuantityDisplay = () => {
    if (props.item.exceed) {
      return (
        <Typography level="body-xs" sx={{ mt: 1 }}>
          <span style={{ color: "red" }}>
            Quantity inputted exceeds quantity requested ({props.qtyRequest})
          </span>
        </Typography>
      );
    }

    if (!props.item.quantity) {
      return (
        <Typography color="danger" level="body-xs">
          {props.errors.quantity}
        </Typography>
      );
    }

    if (!props.item.brand_id) {
      return (
        <Typography level="body-xs" sx={{ mt: 1 }}>
          <span style={{ color: "red" }}>Please select a brand first</span>
        </Typography>
      );
    }
    const remainingQuantity =
      props.brandRegularOptions.find(
        (option) => option.id === props.item.brand_id
      )?.quantity || 0;

    return (
      <Typography level="body-xs" sx={{ mt: 1 }}>
        <span
          style={{
            color: props.item.quantity === 0 ? "red" : "inherit",
          }}
        >
          {`${props.item.quantity} specified / ${remainingQuantity} left`}
        </span>
      </Typography>
    );
  };

  function setBrands(bool){
    if(props.isRegular){
      setBrandRegular(bool)
    }else {
      setBrandDonation(bool)
    }
  }


  function hasNoBrand(){
    return false;
    if(props.isRegular){
      if(nobrandRegular){
        return true;
      }
    }else {
      if(noBrandDonation){
        return true;
      }
    }

    return false;
  }


  function ifOnlyOneSelected(){
    if(props.isRegular){
      return props.regularBrands.length ==1;
    }else {
      return props.regularBrands.length ==1;
    }
  }

  function BrandValue(value){
    if(props.isRegular){
      if(nobrandRegular){
        return null;
      }else{
        return value
      }
    }else {
      if(noBrandDonation){
        return null;
      }else{
        return value
      }
    }
  }

  return (
    <>
      {" "}
      <Grid container spacing={2}>
        {/* Brand Selection */}
        <Grid md={7} lg={7}>
          {console.log(props.brandRegularOptions)}
          <AutoCompleteComponent
          
            name={"brandRegular"}
            placeholder="Search brand..."
            label={`Brand `}
            options={filterBrandOptions}
            loading={props.isBrandRegularloading}
            value={BrandValue(props.brandRegularOptions.find(
              (option) => option.id === props.item.brand_id
            ))}
            onChange={(e, value) => {
              const updatedList = [...props.regularBrands];
              updatedList[props.index].brand_id = value?.id;
              updatedList[props.index].source_id = value?.source_id;
              updatedList[props.index].supplier_id = value?.supplier_id;
              updatedList[props.index].quantity =
                value?.quantity === null ? 0 : value?.quantity > 0 ? 1 : 0;
              updatedList[props.index].expiration_date = value?.expiration_date;
              props.setRegularBrands(updatedList);
            }}
            fullWidth={true}
            error={!props.item.brand_id && props.errors.brand_id}
            helperText={
              !props.item.brand_id && (
                <Typography color="danger" level="body-xs">
                  {props.errors.brand_id}
                </Typography>
              )
            }
            disabled={hasNoBrand()}
          />
  {/* { ifOnlyOneSelected() && <Box padding={1}>
        <Checkbox label="No brand indicated"
        onChange={(event)=>{
          if (event.target.checked){
            setBrands(true)
          } else {
            setBrands(false)
          }
        }}
        
        sx={{fontSize:"12px"}} size="sm" />  
       </Box>  }
      */}

        </Grid>

        {/* Quantity Input */}
        <Grid xs={11} md={5} lg={5}>
          
          <InputComponent
            label={hasNoBrand() ? "Quantity":`Quantity (${currentQuantity()} available)`}
            placeholder="xxx.xxx.xxx"
            fullWidth={true}
            name={`quantity-${props.index}`}
            size="lg"
            value={props.item.quantity }
            error={!props.item.quantity && props.errors.quantity}
            onChange={(e) =>{

              if(!BrandValue(props.brandRegularOptions.find(
                (option) => option.id === props.item.brand_id
              ))){
                return;
              }
               props.handleQuantityValueChange(e, props.index)
            }}
            helperText={
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <QuantityDisplay />
              </Stack>
            }
          />
          {/* {props.item.quantity} */}

          <Stack direction={'row'} justifyContent={'end'} mt={1}>
            {/* Trash Icon Button */}
            <IconButtonComponent
              color="danger"
              icon={Trash}
              iconSize={16}
              onClick={() => props.handleRemoveBrand(props.index)}
            />
          </Stack>

        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
    </>
  );
};

export default BrandInput;
