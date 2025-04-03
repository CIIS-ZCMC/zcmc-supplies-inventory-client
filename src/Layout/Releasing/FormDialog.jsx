import { useMemo, useEffect, useState } from "react";
import { Box, Stack, Grid, Divider, Alert, Button, Typography } from "@mui/joy";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Checkbox from '@mui/joy/Checkbox';
//stepper components
import Step2Form from "./Stepper/Step2Form";
import Step1Form from "./Stepper/Step1Form";
import Summary from "./Stepper/Summary";
``;
// hooks
import useAreasHook from "../../Hooks/AreasHook";
import useSuppliesHook from "../../Hooks/SuppliesHook";
import useReleasingHook from "../../Hooks/ReleasingHook";
import useSnackbarHook from "../../Hooks/AlertHook";
import Regular from "./Regular";
import Donation from "./Donation";

const FormDialog = ({
  showSnackbar,
  handleDialogClose,
  activeStep,
  steps,
  handleBack,
  handleNext,
}) => {
  const [btnType, setBtnType] = useState("button");

  const queryClient = useQueryClient();
  const {nobrandRegular,noBrandDonation,setBrandRegular,setBrandDonation} = useSnackbarHook();

  // local state
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [totalRegularQtyBrands, setTotalRegularQtyBrands] = useState(null);
  const [totalDonationQtyBrands, setTotalDonationQtyBrands] = useState(null);
  const [errors, setErrors] = useState({});

  //form state
  const [selectedId, setSelectedId] = useState();
  const [regularBrands, setRegularBrands] = useState([]);
  
  //   const [regularBrands, setRegularBrands] = useState([
  //     { brand_id: "", source_id: "", quantity: "", expiration_date: "" },
  //   ]);

  const [donationBrands, setDonationBrands] = useState([]);
  const [requestingOffice, setRequestingOffice] = useState(null);
  const [qtyRequest, setQtyRequest] = useState(0);
  const [risDate, setRisDate] = useState(moment().format("YYYY-M-D"));
  const [risNo, setRisNo] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isValid, setIsValid] = useState(false);

  //validation function
  const validateStep = () => {
    const newErrors = {};

    if (activeStep === 0) {
      if (!requestingOffice)
        newErrors.requestingOffice = "Requesting office is required.";
      if (!qtyRequest || qtyRequest <= 0)
        newErrors.qtyRequest = "Requested quantity must be greater than 0.";
      if (!risNo) newErrors.risNo = "RIS Number is required.";
    }

    if (activeStep === 1) {
      if (!selectedId) newErrors.selectedId = "Supply selection is required.";

      if (
        !regularBrands.some((brand) => brand.brand_id) &&
        !donationBrands.some((brand) => brand.brand_id)
      ) {
        newErrors.brand_id = "At least one brand is required.";
      }

      if (
        !regularBrands.some((brand) => brand.quantity > 0) &&
        !donationBrands.some((brand) => brand.quantity > 0)
      ) {
        newErrors.quantity = "Please enter quantity";
      }

      // Check if any brand's quantity exceeds its available quantity
      // const exceededBrand = [
      //     ...regularBrands,
      //     ...donationBrands,
      // ].find((brand) => brand.brand_id && brand.quantity > (brand.brandQuantity || 0));

      // if (exceededBrand.quantity > qtyRequest) {
      //     newErrors.quantity = 'Quanity inputted exceeds the current available quantity'
      // }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function dissableOnRegularOrDonationEmptyItems() {
    if(nobrandRegular || noBrandDonation){
      return false;
    }

    if (regularBrands.length === 0 && donationBrands.length === 0) return true;

    if (regularBrands.length > 0) {
      const initialBrandOnly =
        regularBrands[0].brand_id === null ||
        regularBrands[0].brand_id === undefined;

      return initialBrandOnly;
    }

    if (donationBrands.length > 0) {
      const initialBrandOnly =
        donationBrands[0].brand_id === null ||
        donationBrands[0].brand_id === undefined;

      return initialBrandOnly;
    }
  }

  function exceedLimitBaseOnRegularAndDonationQuantity() {
    const totalRegularBrand = regularBrands.reduce((total, brand) => {
      const quantity = parseFloat(brand.quantity) || 0;

      return total + quantity;
    }, 0);

    const totalDonationBrand = donationBrands.reduce((total, brand) => {
      const quantity = parseFloat(brand.quantity) || 0;

      return total + quantity;
    }, 0);

    return totalRegularBrand + totalDonationBrand + 1 > qtyRequest;
  }

  const onHandleBack = () => {
    setIsValid(false);
    handleBack();
  };

  const onHandleNext = () => {
    const isValid = validateStep();

  
    if (isValid) {
      handleNext();
    }
  };

  const resetForm = () => {
    setSelectedId(null);
    setRegularBrands([
      { brand_id: "", source_id: "", quantity: "", expiration_date: "" },
    ]);
    setDonationBrands([
      { brand_id: "", source_id: "", quantity: "", expiration_date: "" },
    ]);
    setRequestingOffice(null);
    setQtyRequest(0);
    setRisDate(moment().format("YYYY-M-D"));
    setRisNo("");
    setRemarks("");
  };

  // Hooks for data fetching functions
  const { getAreas } = useAreasHook();
  const { getSupplies } = useSuppliesHook();
  const { createStockOut, initialValues, validationSchema } =
    useReleasingHook();

  // Array of queries to manage multiple fetching in a cleaner way
  const queryConfigs = [
    { key: "supplies", fn: getSupplies },
    { key: "areas", fn: getAreas },
  ];

  const queries = queryConfigs.map(({ key, fn }) =>
    useQuery({ queryKey: [key], queryFn: fn })
  );

  const [
    { data: suppliesData, isLoading: isSuppliesLoading },
    { data: areasData, isLoading: isAreasLoading },
  ] = queries;

  // Helper function for mapping options
  const mapOptions = (data, labelKey) =>
    data?.map((item) => ({
      label: item[labelKey],
      id: item.id,
      quantity: item.quantity,
    })) || [];

  // Memoized options to avoid recalculating on every render
  const suppliesOptions = useMemo(
    () => mapOptions(suppliesData?.data, "name"),
    [suppliesData]
  );
  const areaOptions = useMemo(
    () => mapOptions(areasData?.data, "area_name"),
    [areasData]
  );
 
  const itemCurrentStockLevel = suppliesOptions?.find(
    (item) => item.id === selectedId
  );
  // useEffect(() => {
  //     const specificItem = suppliesOptions.find(item => item.id === someId);
  //     if (specificItem) {
  //         console.log(specificItem.quantity);
  //     }
  // }, [suppliesOptions]);

  // Define create the mutation for stockout
  const mutation = useMutation({
    mutationFn: createStockOut,
    onSuccess: () => {
      showSnackbar("Stockout Success!", "success", "filled");
      queryClient.invalidateQueries("stocks");
      closeDialog();
    },
    onError: (error) => {
      showSnackbar;
      // setSnackbar({ open: true, color: "danger", message: `${error}` });
      setSnackbar("Failed to stockout", "danger");

      showSnackbar(
        `Stockout failed!. Please try again. ${error}`,
        "danger",
        "filled"
      );
    },
    onSettled: () => {
      closeDialog();
    },
  });

  const closeDialog = () => {
    handleDialogClose();
    resetForm();
  };

  const isSubmitting = mutation.isLoading;

  useEffect(() => {
    if (activeStep === 2) {
      return setBtnType("submit");
    }

    setBtnType("button");
  }, [activeStep]);

  const accordionData = [
    {
      summary: (
        <>
          <Stack>
            <Typography>Regular</Typography>
            <Typography level="body-sm">
              Total quantity to be released from Regular: {totalRegularQtyBrands} / {itemCurrentStockLevel?.quantity} left
            </Typography>
          </Stack>
        </>
      ),
      details: (
        <>
          <Regular
          errors={errors}
          selectedId={selectedId}
          regularBrands={regularBrands}
          setTotalRegularQtyBrands={setTotalRegularQtyBrands}
          setRegularBrands={setRegularBrands}
          setSelectedQuantity={setSelectedQuantity}
          qtyRequest={qtyRequest}
          isValid={isValid}
          setIsValid={setIsValid}
          exceed={exceedLimitBaseOnRegularAndDonationQuantity()}
        />
        
          {/* <Box padding={1}>
        <Checkbox label="No brand indicated" sx={{fontSize:"12px"}} size="sm" />  
          </Box>   */}

        </>
      
      ),
    },
    {
      summary: (
        <>
          <Stack>
            <Typography>Donation</Typography>
            <Typography level="body-sm">
              Total quantity to be released from Donation: {totalDonationQtyBrands} / {itemCurrentStockLevel?.quantity} left
            </Typography>
          </Stack>
        </>
      ),
      details: (
        <>
         <Donation
          errors={errors}
          selectedId={selectedId}
          donationBrands={donationBrands}
          setTotalDonationQtyBrands={setTotalDonationQtyBrands}
          setDonationBrands={setDonationBrands}
          qtyRequest={qtyRequest}
          setIsValid={setIsValid}
          exceed={exceedLimitBaseOnRegularAndDonationQuantity()}
        />
        {/* <Box padding={1}>
        <Checkbox label="No brand indicated" sx={{fontSize:"12px"}} size="sm" />  
          </Box>   */}

        </>
       
      ),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const brandSource = [...regularBrands, ...donationBrands];

    const formData = new FormData();
    formData.append("supplies_masterlist_id", selectedId);
    formData.append("area_id", requestingOffice);
    formData.append("requested_quantity", qtyRequest);
    formData.append("ris_no", risNo);
    formData.append("ris_date", risDate);
    formData.append("remarks", remarks);

    // Append each item of the array as a properly indexed key
    brandSource.forEach((item, index) => {
      formData.append(`brand_source_pairs[${index}][brand_id]`, item.brand_id);
      formData.append(
        `brand_source_pairs[${index}][source_id]`,
        item.source_id
      );
      formData.append(
        `brand_source_pairs[${index}][expiration_date]`,
        item.expiration_date === null ? "" : item.expiration_date
      );
      formData.append(`brand_source_pairs[${index}][quantity]`, item.quantity);
    });

    // Log the contents of FormData for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    mutation.mutate(formData);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box>
       
          {activeStep === 0 && (
            // step 1 form dont mind the naming
            <Step1Form
              requestingOffice={requestingOffice}
              setRequestingOffice={setRequestingOffice}
              qtyRequest={qtyRequest}
              setQtyRequest={setQtyRequest}
              risDate={risDate}
              setRisDate={setRisDate}
              risNo={risNo}
              setRisNo={setRisNo}
              remarks={remarks}
              setRemarks={setRemarks}
              areaOptions={areaOptions}
              isAreasLoading={isAreasLoading}
              errors={errors}
            />
          )}

          {activeStep === 1 && (
            <Grid xs={12}>
              {/* Step 2 form dont mind the naming */}
              <Step2Form
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                selectedQuantity={selectedQuantity}
                accordionData={accordionData}
                suppliesOptions={suppliesOptions}
                isSuppliesLoading={isSuppliesLoading}
                qtyRequest={qtyRequest}
                errors={errors}
              />
            </Grid>
          )}

          {activeStep === 2 && (
            <Summary
              qtyRequest={qtyRequest}
              risNo={risNo}
              requestingOffice={requestingOffice}
              totalRegularQtyBrands={totalRegularQtyBrands}
              totalDonationQtyBrands={totalDonationQtyBrands}
            />
          )}
        </Box>

        <Divider sx={{ marginY: 3 }} />

        <Stack direction={"row"} spacing={2}>
          {/* display only on step 1 */}
          <Button
            onClick={activeStep === 0 ? closeDialog : onHandleBack}
            variant="outlined"
            fullWidth
          >
            {activeStep === 0 ? "Cancel" : "Back"}
          </Button>

          <Button
            type={btnType}
            disabled={
              activeStep === 0
                ? !(
                  requestingOffice !== null &&
                  qtyRequest > 0 &&
                  risNo !== null &&
                  risNo !== ""
                )
                : dissableOnRegularOrDonationEmptyItems()
            }
            onClick={onHandleNext}
            variant="solid"
            fullWidth
            loading={isSubmitting}
          >
            {activeStep === 2 ? "Submit" : "Next"}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default FormDialog;
