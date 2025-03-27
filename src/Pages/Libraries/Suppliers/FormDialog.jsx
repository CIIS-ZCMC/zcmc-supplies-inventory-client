import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import {
  Grid,
  Divider,
  Stack,
  Typography,
  Autocomplete,
  TextField,
  FormControl,
  FormLabel,
} from "@mui/joy";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useSuppliersHook from "../../../Hooks/SuppliersHook";
import usePaginatedTableHook from "../../../Hooks/PaginatedTableHook";

import ButtonComponent from "../../../Components/ButtonComponent";
import InputComponent from "../../../Components/Form/InputComponent";

import countries from "./countries.json"; // Save JSON as a file

const FormDialog = ({ handleDialogClose, setSnackbar, isDialogOpen }) => {
  const queryClient = useQueryClient();
  const [showDetails, setShowDetails] = useState(false);
  const { isUpdate, id } = usePaginatedTableHook();
  const {
    initialValues,
    setInitialValues,
    validationSchema,
    getSupplier,
    updateSupplier,
    createSupplier,
  } = useSuppliersHook();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isUpdate) {
          // JSON format for updates
          const updateData = {
            supplier_name: values.supplierName,
            email: values.email,
            prcontactperson: values.prcontactperson,
            prtelno: values.prtelno,
            prfaxno: values.prfaxno,
            premail: values.premail,
            prstreetbldg1: values.prstreetbldg1,
            praddress: values.praddress,
            prcountry: values.prcountry,
          };

          await mutation.mutate(updateData);
        } else {
          // FormData format for new records
          const formData = new FormData();
          formData.append("supplier_name", values.supplierName);
          formData.append("email", values.email || ""); // Optional fields
          formData.append("prcontactperson", values.prcontactperson || "");
          formData.append("prtelno", values.prtelno || "");
          formData.append("prfaxno", values.prfaxno || "");
          formData.append("premail", values.premail || "");
          formData.append("prstreetbldg1", values.prstreetbldg1 || "");
          formData.append("praddress", values.praddress || "");
          formData.append("prcountry", values.prcountry || "Philippines"); // Default to PH

          await mutation.mutate(formData);
        }

        // ✅ Reset the form after successful submission
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    },
  });

  // Load data when editing (update mode)
  useEffect(() => {
    if (isUpdate && id) {
      setShowDetails(true);
      const fetchData = async () => {
        try {
          const supplierData = await getSupplier(id);
          // Correctly set initial values and reset form
          // Ensure the response contains the expected fields
          const updatedValues = {
            id: supplierData?.data?.id || null,
            supplierName: supplierData?.data?.supplier_name || "",
            email: supplierData?.data?.email || "",
            prcontactperson: supplierData?.data?.prcontactperson || "",
            prtelno: supplierData?.data?.prtelno || "",
            prfaxno: supplierData?.data?.prfaxno || "",
            premail: supplierData?.data?.premail || "",
            prstreetbldg1: supplierData?.data?.prstreetbldg1 || "",
            praddress: supplierData?.data?.praddress || "",
            prcountry: supplierData?.data?.prcountry || "",
          };
          formik.setValues(updatedValues);
        } catch (error) {
          console.error("Error fetching supplier:", error.message);
          setSnackbar({
            open: true,
            color: "danger",
            message: "Failed to load supplier details. Please try again.",
          });
        }
      };
      fetchData();
    } else {
      // Reset form when opening the dialog for a new record

      formik.resetForm();
      setShowDetails(false);
      setInitialValues({});
    }
  }, [isUpdate, id, getSupplier, setSnackbar]);

  // Define create the mutation for stockout
  const mutation = useMutation({
    mutationFn: async (formData) =>
      isUpdate ? updateSupplier(id, formData) : createSupplier(formData),
    onSuccess: () => {
      setSnackbar(
        isUpdate
          ? "Supplier Updated Successfully"
          : "Supplier Created Successfully",
        "success",
        "filled"
      );
      queryClient.invalidateQueries("suppliers");
      formik.resetForm();
    },
    onError: (error) => {
      if (error?.response?.status === 409) {
        setSnackbar({
          open: true,
          color: "danger",
          message:
            error.response.data.message ||
            "Conflict: The resource already exists.",
        });
      } else {
        // Handle other errors
        setSnackbar({
          open: true,
          color: "danger",
          message: `${error.message || "An error occurred. Please try again."}`,
        });
      }

      console.error("Error submitting form:", error);
    },
    onSettled: () => {
      // Always close the dialog after the mutation is finished (whether successful or error)
      handleClose();
    },
  });

  function handleClose() {
    setInitialValues(null);
    handleDialogClose();
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* Required Field */}
          <Grid xs={12}>
            <InputComponent
              size="lg"
              label="Supplier Name *"
              placeholder="Enter supplier name"
              fullWidth
              name="supplierName"
              value={formik.values.supplierName}
              onChange={formik.handleChange}
              error={
                formik.touched.supplierName &&
                Boolean(formik.errors.supplierName)
              }
              helperText={
                formik.touched.supplierName && formik.errors.supplierName
              }
            />
          </Grid>

          {/* Toggle Button for Optional Fields */}
          <Grid xs={12}>
            <ButtonComponent
              type="button"
              variant="text"
              color="primary"
              label={showDetails ? "Hide Details" : "View More Details"}
              onClick={() => setShowDetails(!showDetails)}
            />
          </Grid>

          {/* Optional Fields - Conditionally Rendered */}
          {showDetails && (
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <InputComponent
                  size="lg"
                  label="Email"
                  placeholder="Enter supplier email"
                  fullWidth
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <InputComponent
                  size="lg"
                  label="Contact Person"
                  placeholder="Enter contact person"
                  fullWidth
                  name="prcontactperson"
                  value={formik.values.prcontactperson}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <InputComponent
                  size="lg"
                  label="Telephone Number"
                  placeholder="Enter telephone number"
                  fullWidth
                  name="prtelno"
                  value={formik.values.prtelno}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <InputComponent
                  size="lg"
                  label="Fax Number"
                  placeholder="Enter fax number"
                  fullWidth
                  name="prfaxno"
                  value={formik.values.prfaxno}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <InputComponent
                  size="lg"
                  label="Primary Email"
                  placeholder="Enter primary email"
                  fullWidth
                  name="premail"
                  value={formik.values.premail}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <InputComponent
                  size="lg"
                  label="Street & Building"
                  placeholder="Enter street and building"
                  fullWidth
                  name="prstreetbldg1"
                  value={formik.values.prstreetbldg1}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <InputComponent
                  size="lg"
                  label="Address"
                  placeholder="Enter address"
                  fullWidth
                  name="praddress"
                  value={formik.values.praddress}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid xs={12} md={6}>
                {/* <InputComponent
                  size="lg"
                  label="Country"
                  placeholder="Enter country"
                  fullWidth
                  name="prcountry"
                  value={formik.values.prcountry}
                  onChange={formik.handleChange}
                /> */}
                <FormControl fullWidth>
                  <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>
                    {"Country"}
                  </FormLabel>
                  <Autocomplete
                    size="lg"
                    options={countries}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <InputComponent
                        {...params}
                        size="lg"
                        label="Country"
                        placeholder="Enter country"
                        fullWidth
                        name="prcountry"
                        value={formik.values.prcountry}
                        onChange={formik.handleChange}
                      />
                    )}
                    onChange={(event, value) =>
                      formik.setFieldValue("prcountry", value?.name || "")
                    }
                    value={
                      countries.find(
                        (c) => c.name === formik.values.prcountry
                      ) || null
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Divider sx={{ marginY: 3 }} /> {/* Horizontal Divider */}
        {/* Action Buttons */}
        <Stack direction="row" spacing={2}>
          <ButtonComponent
            type="button"
            label="Cancel"
            variant="outlined"
            color="danger"
            onClick={handleDialogClose}
            fullWidth
          />
          <ButtonComponent
            type="submit"
            variant="solid"
            color="primary"
            label="Save"
            fullWidth
            loading={mutation.isPending}
          />
        </Stack>
      </form>
    </>
  );
};

export default FormDialog;
