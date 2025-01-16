import React, { useEffect, useMemo, useState } from "react";
import { Grid, Typography, Stack, Box, Divider } from "@mui/joy";

import { Trash } from "lucide-react";
import AutoCompleteComponent from "../../../Components/Form/AutoCompleteComponent";
import InputComponent from "../../../Components/Form/InputComponent";
import IconButtonComponent from "../../../Components/IconButtonComponent";

const BrandInput = (props) => {
  const filterBrandOptions =
    props.regularBrands.length === 0
      ? props.brandRegularOptions
      : props.brandRegularOptions.filter(
        (outerValue) =>
          !props.regularBrands.find(
            (innerValue) => innerValue.brand_id === outerValue.id
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

  return (
    <>
      {" "}
      <Grid container spacing={2}>
        {/* Brand Selection */}
        <Grid md={7} lg={7}>
          <AutoCompleteComponent
            name={"brandRegular"}
            placeholder="Search brand..."
            label={"Brand"}
            options={filterBrandOptions}
            loading={props.isBrandRegularloading}
            value={props.brandRegularOptions.find(
              (option) => option.id === props.item.brand_id
            )}
            onChange={(e, value) => {
              const updatedList = [...props.regularBrands];
              updatedList[props.index].brand_id = value?.id;
              updatedList[props.index].source_id = value?.source_id;
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
          />
        </Grid>

        {/* Quantity Input */}
        <Grid xs={11} md={5} lg={5}>
          <InputComponent
            label="Quantity"
            placeholder="xxx.xxx.xxx"
            fullWidth={true}
            name={`quantity-${props.index}`}
            size="lg"
            value={props.item.quantity}
            error={!props.item.quantity && props.errors.quantity}
            onChange={(e) => props.handleQuantityValueChange(e, props.index)}
            helperText={
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <QuantityDisplay />

                {/* Trash Icon Button */}
                <IconButtonComponent
                  color="danger"
                  icon={Trash}
                  iconSize={16}
                  onClick={() => props.handleRemoveBrand(props.index)}
                />
              </Stack>
            }
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
    </>
  );
};

export default BrandInput;
