import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid, Typography, Stack, Box, Divider } from "@mui/joy";

import { Trash, Plus } from "lucide-react";

import ButtonComponent from "../../Components/ButtonComponent";

import useReleasingHook from "../../Hooks/ReleasingHook";
import BrandInput from "./BrandInput/BrandInput";

const Regular = ({
  qtyRequest,
  errors,
  selectedId,
  setTotalRegularQtyBrands,
  regularBrands,
  setRegularBrands,
  exceed,
}) => {
  const totalRegularBrands = regularBrands?.reduce(
    (acc, regular) => acc + Number(regular.quantity || 0),
    0
  );

  useEffect(() => {
    setTotalRegularQtyBrands(totalRegularBrands);
  }, [totalRegularBrands]);

  const { getBrandRegular } = useReleasingHook();

  const { data: brandRegularData, isLoading: isBrandRegularloading } = useQuery(
    {
      queryKey: ["brand-regular", selectedId],
      queryFn: () => getBrandRegular(selectedId),
      enabled: selectedId != null && selectedId !== "", // Ensure selectedId is not null or empty
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const mapOptions = (data, labelKey) =>
    data?.map((item) => ({
      id: item.brand_id,
      label: item[labelKey],
      source_id: item.source_id,
      quantity: item.quantity,
      expiration_date: item.expiration_date,
    })) || [];

  const brandRegularOptions = useMemo(
    () => mapOptions(brandRegularData, "concatenated_info"),
    [brandRegularData]
  );

  const [regularBrand, setRegularBrand] = useState(null); //Primary key of Regular Brand Product
  const [regularSource, setRegularSource] = useState(null); // ID: Identify as Donation[2] or Regular[1]
  const [regularQuantity, setRegularQuantity] = useState(1);
  const [regularExpirationDate, setRegularExpirationDate] = useState(null);

  function currentTotatlQuantity() {
    return regularBrands.reduce((total, brand) => {
      const quantity = parseFloat(brand.quantity) || 0;

      return total + quantity;
    }, 0);
  }

  function checkOnExceedQuantityRequest() {
    const exceed =
      regularBrands.length > 0 && currentTotatlQuantity() + 1 > qtyRequest;

    return exceed;
  }

  const handleAddBrand = () => {
    let initialQty = 1;

    setRegularBrands((prevList) => [
      ...prevList,
      {
        brand_id: regularBrand,
        source_id: regularSource,
        quantity: regularQuantity,
        expiration_date: regularExpirationDate,
        exceed: false,
      },
    ]);
    // Reset the state for brand and quantity inputs
    setRegularBrand(null);
    setRegularSource(null);
    setRegularQuantity(initialQty);
    setRegularExpirationDate(null);
  };

  const handleRemoveBrand = (index) => {
    const updatedList = regularBrands.filter((_, i) => i !== index);
    setRegularBrands(updatedList);
  };

  function handleQuantityValueChange(e, index) {
    const newQuantityValue = parseFloat(e.target.value) || 0;

    const updatedList = [...regularBrands];
    const selectedProduct = brandRegularOptions.find(
      (value) => value.id === updatedList[index].brand_id
    );

    updatedList[index].quantity = newQuantityValue;

    const currentTotatlQuantity = regularBrands.reduce((total, brand) => {
      const quantity = parseFloat(brand.quantity) || 0;
      return total + quantity;
    }, 0);

    if (
      currentTotatlQuantity > qtyRequest ||
      newQuantityValue > selectedProduct.quantity
    ) {
      updatedList[index].quantity = 0;
      updatedList[index].exceed = true;
    } else {
      updatedList[index].exceed = false;
    }

    setRegularBrands(updatedList);
  }

  return (
    <Box
      sx={{
        maxHeight: "400px",
        overflowY: "auto",
        overflowX: "hidden",
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      {regularBrands.map((item, index) => (
        <BrandInput
          index={index}
          item={item}
          qtyRequest={qtyRequest}
          brandRegularOptions={brandRegularOptions}
          isBrandRegularloading={isBrandRegularloading}
          regularBrands={regularBrands}
          setRegularBrands={setRegularBrands}
          handleQuantityValueChange={handleQuantityValueChange}
          handleRemoveBrand={handleRemoveBrand}
          errors={errors}
          currentTotatlQuantity={currentTotatlQuantity()}
        />
      ))}

      {!checkOnExceedQuantityRequest() && !exceed && (
        <ButtonComponent
          type="button"
          variant="contained"
          label="Add another brand"
          onClick={handleAddBrand} // Trigger appending
          endDecorator={<Plus size={20} />}
        />
      )}
    </Box>
  );
};

export default Regular;
