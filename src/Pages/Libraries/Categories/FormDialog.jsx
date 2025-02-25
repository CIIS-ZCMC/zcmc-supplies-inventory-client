import { useEffect } from "react";

import { useFormik } from "formik";
import { Grid, Divider, Stack, Typography } from "@mui/joy";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCategoriesHook from "../../../Hooks/CategoriesHook";
import usePaginatedTableHook from "../../../Hooks/PaginatedTableHook";

import ButtonComponent from "../../../Components/ButtonComponent";
import InputComponent from "../../../Components/Form/InputComponent";

const FormDialog = ({ handleDialogClose, setSnackbar }) => {
  const queryClient = useQueryClient();
  const { isUpdate, id } = usePaginatedTableHook();
  const {
    initialValues,
    setInitialValues,
    validationSchema,
    createCategory,
    getCategory,
    updateCategory,
  } = useCategoriesHook();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("category_name", values.categoryName);
      await mutation.mutate(
        isUpdate ? { category_name: values.categoryName } : formData
      );
    },
  });

  // Load data when editing (update mode)
  useEffect(() => {
    if (isUpdate && id) {
      const fetchData = async () => {
        try {
          const categoryData = await getCategory(id);
          // Correctly set initial values and reset form
          const updatedValues = {
            id: categoryData?.data?.id || null,
            categoryName: categoryData?.data.category_name || "",
          };
          formik.setValues(updatedValues);
        } catch (error) {
          console.error("Error fetching category:", error.message);
          setSnackbar(
            "Failed to load category details. Please try again.",
            "danger",
            "filled"
          );
        }
      };
      fetchData();
    }
  }, [isUpdate, id, getCategory, setSnackbar]);

  // Define create the mutation for stockout
  const mutation = useMutation({
    mutationFn: async (formData) =>
      isUpdate ? updateCategory(id, formData) : createCategory(formData),
    onSuccess: () => {
      setSnackbar(
        isUpdate
          ? "Category updated successfully"
          : "Category created successfully",
        "success",
        "filled"
      );
      queryClient.invalidateQueries("categories");
      formik.resetForm();
    },
    onError: (error) => {
      if (error?.response?.status === 409) {
        setSnackbar(
          `${error.response.data.message}` ||
            "Conflict: The resource already exists.",
          "danger",
          "filled"
        );
      } else {
        // Handle other errors
        setSnackbar(
          `${
            (error.message || "An error occurred. Please try again.",
            "danger",
            "filled")
          }`
        );
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
          <Grid xs={12}>
            <InputComponent
              size={"lg"}
              label="Category"
              placeholder="Enter category name"
              fullWidth={true}
              name={"categoryName"}
              value={formik.values.categoryName}
              onChange={formik.handleChange}
              error={
                formik.touched.categoryName &&
                Boolean(formik.errors.categoryName)
              }
              helperText={
                formik.touched.categoryName && formik.errors.categoryName
              }
            />

            <Typography my={2} level={"body-sm"}>
              Item’s name and type of unit can be combined together to simplify
              form fill-up and prevent typographical errors on input.
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 3 }} /> {/* Horizontal Divider */}
        <Stack direction={"row"} spacing={2}>
          <ButtonComponent
            label={"Cancel"}
            variant="outlined"
            color="danger"
            onClick={handleDialogClose}
            fullWidth
          />
          <ButtonComponent
            type={"submit"}
            variant="solid"
            color={"primary"}
            label={"Save"}
            fullWidth
            loading={mutation.isPending}
          />
        </Stack>
      </form>
    </>
  );
};

export default FormDialog;
