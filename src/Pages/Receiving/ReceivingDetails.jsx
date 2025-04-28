import React from "react";
import {
  Grid,
  Stack,
  Box,
  Typography,
  Divider,
  Sheet,
  Card,
  Button,
} from "@mui/joy";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { user } from "../../Data/index";
import useReceivingHook from "../../Hooks/ReceivingHook";
import Header from "../../Layout/Header/Header";
import LabelComponent from "../../Components/Typography/LabelComponent";
import useReportsHook from "../../Hooks/ReportsHook";
const ReceivingDetails = ({ urlId }) => {
  // const { id: urlId } = useParams(); // Get the `id` from the URL

  const { getStockIn } = useReceivingHook();

  const { data, isLoading, error } = useQuery({
    queryKey: ["stockin"],
    queryFn: getStockIn,
  });

  const stockinData = data?.data;

  const filteredItems = stockinData?.filter(
    (item) => item.id === Number(urlId)
  );

  // Destructure the first item in filteredItems, if available
  const {
    purchase_order_no,
    supply_name,
    brand_name,
    iar_no,
    category_name,
    supplier_name,
    source_name,
    quantity,
    expiry_date,
    delivery_date,
    unit_name,
  } = filteredItems?.[0] || {};

  return (
    <>
      <Stack pr={4}>
        <Grid container spacing={2}>
          {/* Group 1 */}
          <Grid width={"100%"}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
              Transaction Information
            </Typography>

            <Card sx={{ p: 2 }}>
              <LabelComponent label="PO Number:" value={purchase_order_no} />
              <LabelComponent label="IAR Number:" value={iar_no} />
              <LabelComponent label="Source:" value={source_name} />
              <LabelComponent label="Date Delivered:" value={delivery_date} />
            </Card>
          </Grid>

          {/* Group 2 */}
          <Grid width={"100%"}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
              Product Information
            </Typography>

            <Card sx={{ p: 2 }}>
              <LabelComponent label="Item Name:" value={supply_name} />
              <LabelComponent label="Item Brand:" value={brand_name} />
              <LabelComponent label="Category:" value={category_name} />
              <LabelComponent label="Supplier:" value={supplier_name} />
              <LabelComponent label="Unit:" value={unit_name} />
              <LabelComponent label="Quantity:" value={quantity} />
              <LabelComponent label="Expiry Date:" value={expiry_date} />
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default ReceivingDetails;
