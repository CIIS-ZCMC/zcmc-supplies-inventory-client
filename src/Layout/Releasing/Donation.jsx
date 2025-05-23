import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/joy";

import { Plus } from "lucide-react";
import ButtonComponent from "../../Components/ButtonComponent";

import useReleasingHook from "../../Hooks/ReleasingHook";
import BrandInput from "./BrandInput/BrandInput";
import useSnackbarHook from "../../Hooks/AlertHook";
const Donation = ({
  setIsValid,
  qtyRequest,
  errors,
  setTotalDonationQtyBrands,
  selectedId,
  donationBrands,
  setDonationBrands,
  exceed,
}) => {
  const {noBrandDonation,nobrandRegular} = useSnackbarHook();
  const totalDonationBrands = donationBrands?.reduce(
    (acc, donation) => acc + Number(donation.quantity || 0),
    0
  );

  useEffect(() => {
    setTotalDonationQtyBrands(totalDonationBrands);
  }, [totalDonationBrands]);


  const { getBrandDonation } = useReleasingHook();

  const { data: brandDonationData, isLoading: isBrandDonationloading } =
    useQuery({
      queryKey: ["brand-donation", selectedId],
      queryFn: () => getBrandDonation(selectedId),
      enabled: selectedId != null && selectedId !== "", // Ensure selectedId is not null or empty
      staleTime: Infinity,
      cacheTime: Infinity,
    });

    const mapOptions = (data, labelKey) => {
      const labelCounts = {};
    
      return (
        data?.map((item) => {
          let baseLabel = item[labelKey];
          let label = baseLabel;
    
          // Check for duplicates and append count if necessary
          if (labelCounts[baseLabel] !== undefined) {
            labelCounts[baseLabel]++;
            label = `${baseLabel} (${labelCounts[baseLabel]})`;
          } else {
            labelCounts[baseLabel] = 0;
          }
    
          return {
            inventory_stock_id: item.inventory_stock_id,
            id: item.brand_id,
            label,
            supplier_id: item.supplier_id,
            source_id: item.source_id,
            quantity: item.quantity,
            expiration_date: item.expiration_date,
          };
        }) || []
      );
    };
  const brandDonationOptions = useMemo(
    () => mapOptions(brandDonationData, "concatenated_info"),
    [brandDonationData]
  );

  const [donationBrand, setDonationBrand] = useState(null); //Primary key of Donation Brand Product
  const [donationSource, setDonationSource] = useState(null); // ID: Identify as Donation[2] or Regular[1]
  const [donationQuantity, setDonationQuantity] = useState(0);
  const [donationExpirationDate, setDonationExpirationDate] = useState(null);

  function currentTotatlQuantity() {
    return donationBrands.reduce((total, brand) => {
      const quantity = parseFloat(brand.quantity) || 0;

      return total + quantity;
    }, 0);
  }

  function checkOnExceedQuantityRequest() {
    const exceed =
      donationBrands.length > 0 && currentTotatlQuantity() + 1 > qtyRequest;

    return exceed;
  }

  const handleAddBrand = () => {
    let initialQty = 0;

    setDonationBrands((prevList) => [
      ...prevList,
      {
        brand_id: donationBrand,
        source_id: donationSource,
        quantity: donationQuantity,
        expiration_date: donationExpirationDate,
        exceed: false,
      },
    ]);

    // Reset the state for brand and quantity inputs
    setDonationBrand(null);
    setDonationSource(null);
    setDonationQuantity(0);
    setDonationExpirationDate(null);
  };

  const handleRemoveBrand = (index) => {
    const updatedList = donationBrands.filter((_, i) => i !== index);
    setDonationBrands(updatedList);
  };

  function handleQuantityValueChange(e, index) {
    const newQuantityValue = parseFloat(e.target.value) || 0;
   
    const updatedList = [...donationBrands];

    const selectedProduct = brandDonationOptions.find(
      (value) => value.inventory_stock_id === updatedList[index].brand_id
    );

    const currentTotatlQuantity = donationBrands.reduce((total, brand) => {
      const quantity = parseFloat(brand.quantity) || 0;
      return total + quantity;
    }, 0);

    if(
      newQuantityValue <= selectedProduct.quantity &&
      newQuantityValue <= qtyRequest
    ){
//Good
      setIsValid(false);
      updatedList[index].quantity = newQuantityValue;
      updatedList[index].exceed = false;
    }else {
//Exceed
     setIsValid(true);
      updatedList[index].quantity = 0;
      updatedList[index].exceed = true;
    }
    setDonationBrands(updatedList);
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
      {donationBrands.map((item, index) => (
        <BrandInput
          index={index}
          item={item}
          qtyRequest={qtyRequest}
          brandRegularOptions={brandDonationOptions}
          isBrandRegularloading={isBrandDonationloading}
          regularBrands={donationBrands}
          setRegularBrands={setDonationBrands}
          handleQuantityValueChange={handleQuantityValueChange}
          handleRemoveBrand={handleRemoveBrand}
          currentTotatlQuantity={currentTotatlQuantity()}
          errors={errors}
          isRegular={false}
        />
      ))}
  {/* !checkOnExceedQuantityRequest() && !exceed && !noBrandDonation  */}
      {!checkOnExceedQuantityRequest() && !exceed &&  (
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

export default Donation;
