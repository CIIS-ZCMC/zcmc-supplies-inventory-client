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

  const mapOptions = (data, labelKey) =>
    data?.map((item) => ({
      id: item.brand_id,
      label: item[labelKey],
      source_id: item.source_id,
      quantity: item.quantity,
      expiration_date: item.expiration_date,
    })) || [];

  const brandDonationOptions = useMemo(
    () => mapOptions(brandDonationData, "concatenated_info"),
    [brandDonationData]
  );

  const [donationBrand, setDonationBrand] = useState(null); //Primary key of Donation Brand Product
  const [donationSource, setDonationSource] = useState(null); // ID: Identify as Donation[2] or Regular[1]
  const [donationQuantity, setDonationQuantity] = useState(1);
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
    let initialQty = 1;

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
    setDonationQuantity(initialQty);
    setDonationExpirationDate(null);
  };

  const handleRemoveBrand = (index) => {
    const updatedList = donationBrands.filter((_, i) => i !== index);
    setDonationBrands(updatedList);
  };

  function handleQuantityValueChange(e, index) {
    const newQuantityValue = parseFloat(e.target.value) || 0;

    const updatedList = [...donationBrands];

    const currentTotatlQuantity = donationBrands.reduce((total, brand) => {
      const quantity = parseFloat(brand.quantity) || 0;
      return total + quantity;
    }, 0);

    if (newQuantityValue + currentTotatlQuantity > qtyRequest) {
      setIsValid(true);
      updatedList[index].quantity = 0;
      updatedList[index].exceed = true;
    } else {
      setIsValid(false);
      updatedList[index].quantity = newQuantityValue;
      updatedList[index].exceed = false;
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
