import React, { useEffect } from "react";

import { Stack, Typography, Divider, Alert } from "@mui/joy";
import { CircleAlert } from "lucide-react";

import AutoCompleteComponent from "../../../Components/Form/AutoCompleteComponent";
import AccordionComponent from "../../../Components/AccordionComponent";

const Step2Form = ({
  errors,
  accordionData,
  suppliesOptions,
  isSuppliesLoading,
  setSelectedId,
  selectedId,
  selectedQuantity,
  qtyRequest
}) => {
  const itemCurrentStockLevel = suppliesOptions?.find(
    (item) => item.id === selectedId
  );

  // useEffect(() => {
  //   if (itemCurrentStockLevel) {
  //     console.log(itemCurrentStockLevel?.quantity);
  //   }
  // }, [itemCurrentStockLevel]);

  return (
    <div>
    
      <AutoCompleteComponent
        label={"Item Name"}
        placeholder="Search Item..."
        options={suppliesOptions}
        loading={isSuppliesLoading}
        value={
          suppliesOptions?.find((option) => option.id === selectedId) || null
        }
        onChange={(e, value) => {
          setSelectedId(value?.id || null);
          console.log(value)
        }}
        error={!selectedId && errors.selectedId}
        helperText={
          !selectedId && (
            <Typography color="danger" level="body-xs">
              {errors.selectedId}
            </Typography>
          )
        }
        fullWidth={true}
      />

      <Stack my={1}>
      <Typography level={"body-sm"}>
        Requested Quantity : ({" "}
          <span style={{ fontWeight: "bold" ,color:"#A62C2C"}}>
            {qtyRequest || 0}{" "}
          </span>
          )
        </Typography>
        <Typography level={"body-sm"}>
          Item's current stock level: value remaining: ({" "}
          <span style={{ fontWeight: "bold" }}>
            {itemCurrentStockLevel?.quantity || 0}{" "}
          </span>
          )
        </Typography>

        <Divider sx={{ my: 1 }}></Divider>
        <Alert
          variant="soft"
          color="neutral"
          size="sm"
          startDecorator={<CircleAlert size={16} />}
          sx={{ borderRadius: 10 }}
        >
          You can separately add an item with multiple brands both on Regular
          and Donation sources and submit it once.
        </Alert>
      </Stack>

      <AccordionComponent accordionData={accordionData} />
    </div>
  );
};

export default Step2Form;
