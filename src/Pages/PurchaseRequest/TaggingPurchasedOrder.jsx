import React, { useEffect, useState } from "react";
import useSelectedRow from "../../Store/SelectedRowStore";
import Header from "../../Layout/Header/Header";
import { user } from "../../Data/index";
import { Stack, Typography, Box, Textarea, Badge, Input } from "@mui/joy";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import {
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Divider,
  Chip,
} from "@mui/joy";
import InputComponent from "../../Components/Form/InputComponent";
import ButtonComponent from "../../Components/ButtonComponent";
import Grid from "@mui/joy/Grid";
import usePOTaggingHooks from "../../Hooks/POTaggingHook";
import useSnackbarHook from "../../Hooks/AlertHook";
import SnackbarComponent from "../../Components/SnackbarComponent";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import swal from "sweetalert";
import moment from "moment";
function TaggingPurchasedOrder(props) {
  const path = window.location.pathname; // "/purchase-order/22030086"
  const segments = path.split("/");
  const poNumber = segments[2];

  const { selectedPo } = useSelectedRow();
  const { open, message, color, variant, anchor, showSnackbar, closeSnackbar } =
    useSnackbarHook();
  const { storeTagging, getPOitems, CAFRecords } = usePOTaggingHooks();
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [searchParams] = useSearchParams();
  const viewingOnly = searchParams.get("viewingOnly");

  const [inputs, setInputs] = useState([]);
  //let po_number = selectedPo?.PO_number ?? selectedPo?.po_number;

  const handleChange = (key, value) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    handleChange("caf_no", "");
    handleChange("fund_cluster", "");
    if (CAFRecords) {
      handleChange("caf_no", CAFRecords?.cafno);
      handleChange("fund_cluster", CAFRecords?.fundsource);
    }
  }, [CAFRecords]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["purchased_orders_items", poNumber],
    queryFn: () => getPOitems(poNumber),
  });

  const pageDetails = {
    pageTitle: `Tagging  PO# "${poNumber}" `,
    title: "Reports",
    description: "Tag ORS/BURS no., Amount etc.",
    pagePath: null,
    subTitle: "Viewing Purchased order",
    subPath: null,
  };

  const fieldLabels = {
    itemabbrev: "Item Name",
    itemdesc: "Item Description",
    unit: "Unit",
    supplier: "Supplier",
    totqty: "Total Quantity",
    price: "Price",
    vat: "VAT (%)",
    remarks: "Remarks",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());

    swal({
      title: "Please review carefully",
      text: "Once submitted, you will no longer be able to edit this information. Do you want to proceed?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setSubmit(true);

        storeTagging(formValues, poNumber).then((row) => {
          if (row?.request?.status === 200) {
            swal("Tagging Saved Successfully!", {
              icon: "success",
            });
            setSubmit(false);
            navigate(-1);
            return;
          }

          if (row?.request?.status !== 200) {
            const { message } = JSON.parse(row.request.response);
            swal(message, {
              icon: "error",
            });
            setSubmit(false);
            return;
          }
          setSubmit(false);
        });
      }
    });
  };

  const excludedKeys = [
    "FK_faVendors",
    "created_at",
    "id",
    "isInmms",
    "updated_at",
  ];
  // Calculate the midpoint to balance fields between left and right dynamically
  const fieldKeys = Object.keys(fieldLabels).filter(
    (key) => !excludedKeys.includes(key)
  ); // Filter out excluded keys
  const midpoint = Math.ceil(fieldKeys.length / 2); // Split at the midpoint

  const splitFields = {
    first: fieldKeys.slice(0, midpoint),
    second: fieldKeys.slice(midpoint),
  };
  return (
    <div>
      <Header pageDetails={pageDetails} data={user} />
      {/* {JSON.stringify(selectedPo)} */}

      <ContainerComponent>
        <Card sx={{ maxWidth: 800, margin: "auto", mt: 4, boxShadow: "lg" }}>
          <CardContent>
            <Typography level="h4" gutterBottom>
              Purchase Order Details
            </Typography>

            <div>
              {data?.map((row, rowIndex) => (
                <div key={rowIndex} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {/* Left side (first half of fields) */}
                    <div style={{ flex: "1 1 48%" }}>
                      <h4>PO#: {poNumber}</h4>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          fontSize: "11px",
                        }}
                      >
                        <tbody>
                          {splitFields.first.map((key) => {
                            const label = fieldLabels[key] || key;
                            const value =
                              row[key] === null || row[key] === ""
                                ? "—"
                                : !isNaN(row[key]) &&
                                  !isNaN(parseFloat(row[key])) &&
                                  String(row[key]).length > 3
                                ? !["PO_number", "pr_old_po_number"].includes(
                                    key
                                  )
                                  ? Number(row[key]).toLocaleString()
                                  : row[key]
                                : row[key];
                            return (
                              <tr key={key}>
                                <td
                                  style={{
                                    padding: "5px",
                                    fontWeight: "500",
                                    //   borderBottom: "1px solid #ccc",
                                  }}
                                >
                                  <strong>{label}:</strong>
                                </td>
                                <td
                                  style={{
                                    padding: "5px",
                                    textAlign: "left",
                                    borderBottom: "1px solid #ccc",
                                  }}
                                >
                                  {value}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Right side (second half of fields) */}
                    <div style={{ flex: "1 1 48%" }}>
                      <h6
                        style={{
                          float: "right",
                          fontWeight: "normal",
                          padding: "0 10px 0 0",
                        }}
                      >
                        Page {rowIndex + 1} of {data.length}
                      </h6>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          fontSize: "11px",
                          marginTop: "17%",
                        }}
                      >
                        <tbody>
                          {splitFields.second.map((key) => {
                            const label = fieldLabels[key] || key;
                            const value =
                              row[key] === null || row[key] === ""
                                ? "—"
                                : !isNaN(row[key]) &&
                                  !isNaN(parseFloat(row[key])) &&
                                  String(row[key]).length > 3
                                ? !["PO_number", "pr_old_po_number"].includes(
                                    key
                                  )
                                  ? Number(row[key]).toLocaleString()
                                  : row[key]
                                : row[key];
                            return (
                              <tr key={key}>
                                <td
                                  style={{
                                    padding: "5px",
                                    fontWeight: "500",
                                    //  borderBottom: "1px solid #ccc",
                                  }}
                                >
                                  <strong>{label}:</strong>
                                </td>
                                <td
                                  style={{
                                    padding: "5px",
                                    textAlign: "left",
                                    borderBottom: "1px solid #ccc",
                                  }}
                                >
                                  {value}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Box
              sx={{
                position: "sticky",
                bottom: 0,
                zIndex: 100,
                //backgroundColor: 'white',
                //  boxShadow: '0 -2px 6px rgba(0,0,0,0.05)',
                pt: 2,
              }}
            >
              <Accordion
                sx={{
                  marginTop: "10px",
                  border: viewingOnly
                    ? "10px solid #81E7AF"
                    : "3px solid  #536493",
                  borderRadius: "15px",
                }}
                defaultExpanded={viewingOnly ? true : false}
              >
                <AccordionSummary
                  expandIcon={<>open</>}
                  sx={{
                    padding: "5px",
                    background: "#FBFBFB",
                    borderRadius: "15px",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <Typography
                      level="body-lg"
                      color={viewingOnly ? "primary" : "danger"}
                      sx={{ padding: "0 0 0 20px" }}
                    >
                      {viewingOnly ? "TAGGED DETAILS" : "TAGGING"}
                    </Typography>
                    <Chip color="primary" size="sm">
                      {data?.length ?? 0}
                      <span style={{ fontSize: "11px", marginLeft: "5px" }}>
                        Record(s) found
                      </span>
                    </Chip>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    px: 2,
                    pb: 2,
                    background: "white",
                    borderRadius: "15px",
                  }}
                >
                  {viewingOnly ? (
                    <>
                      <Grid container spacing={2}>
                        <Grid xs={6}>
                          <Box>
                            <Typography level="body-xs">CAF No :</Typography>
                            {selectedPo?.caf_no}
                          </Box>
                          <Box>
                            <Typography level="body-xs">
                              Mode of Procurement :
                            </Typography>
                            {selectedPo?.mode_of_procurement}
                          </Box>
                        </Grid>

                        <Grid xs={6}>
                          <Box>
                            <Typography level="body-xs">
                              Delivery Term :
                            </Typography>
                            {selectedPo?.delivery_term}
                          </Box>
                          <Box>
                            <Typography level="body-xs">
                              Payment Term :
                            </Typography>
                            {selectedPo?.payment_term}
                          </Box>
                        </Grid>
                        <Grid xs={6}>
                          <Box>
                            <Typography level="body-xs">
                              Fund Cluster :
                            </Typography>
                            {selectedPo?.fund_cluster}
                          </Box>
                          <Box>
                            <Typography level="body-xs">
                              Funds Available :
                            </Typography>
                            {selectedPo?.funds_available}
                          </Box>
                        </Grid>
                        <Grid xs={6}>
                          <Box>
                            <Typography level="body-xs">
                              ORS/BURS No.:
                            </Typography>
                            {selectedPo?.ors_burs_no}
                          </Box>
                          <Box>
                            <Typography level="body-xs">
                              Date of ORS/BURS :
                            </Typography>
                            {selectedPo?.ors_burs_date}
                          </Box>
                          <Box>
                            <Typography level="body-xs">Amount:</Typography>
                            {selectedPo?.amount}
                          </Box>
                        </Grid>

                        <Grid xs={12}>
                          <Box>
                            <Typography level="body-xs">Remarks :</Typography>
                            {selectedPo?.remarks}
                          </Box>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <Card>
                        {/* <Stack direction={"row"} justifyContent={"space-between"}>
                        <Typography level="body-xs">TAGGING</Typography>
                        <Chip color="primary">
                          {data?.length ?? 0}
                          <span style={{ fontSize: "11px" }}>
                            {" "}
                            Record's found
                          </span>
                        </Chip>
                      </Stack> */}

                        <Grid container spacing={2}>
                          <Grid xs={6}>
                            <Box>
                              <Typography>CAF No :</Typography>

                              <Input
                                sx={{ mb: 1 }}
                                fullWidth
                                isRequired
                                name={"caf_no"}
                                readOnly={CAFRecords ? true : false}
                                value={inputs?.caf_no}
                                startDecorator={
                                  CAFRecords && (
                                    <Typography
                                      level="body-xs"
                                      variant="soft"
                                      color="warning"
                                      textTransform={"uppercase"}
                                      fontSize={9}
                                    >
                                      Generated by Budget :
                                      <br />
                                      <span style={{ color: "#EA2F14" }}>
                                        {moment(CAFRecords?.created_at).format(
                                          "MMMM DD, YYYY [|] h:mm A"
                                        )}
                                      </span>
                                    </Typography>
                                  )
                                }
                                onChange={(e) =>
                                  handleChange("caf_no", e.target.value)
                                }
                              />
                            </Box>
                            <Box>
                              <Typography>Mode of Procurement :</Typography>
                              <InputComponent
                                fullWidth
                                isRequired
                                name={"mode_of_procurement"}
                                value={inputs?.mode_of_procurement}
                                onChange={(e) =>
                                  handleChange(
                                    "mode_of_procurement",
                                    e.target.value
                                  )
                                }
                              />
                            </Box>
                          </Grid>

                          <Grid xs={6}>
                            <Box>
                              <Typography>Delivery Term :</Typography>
                              <InputComponent
                                fullWidth
                                isRequired
                                name={"delivery_term"}
                                value={inputs?.delivery_term}
                                onChange={(e) =>
                                  handleChange("delivery_term", e.target.value)
                                }
                              />
                            </Box>
                            <Box>
                              <Typography>Payment Term :</Typography>
                              <InputComponent
                                fullWidth
                                isRequired
                                name={"payment_term"}
                                value={inputs?.payment_term}
                                onChange={(e) =>
                                  handleChange("payment_term", e.target.value)
                                }
                              />
                            </Box>
                          </Grid>

                          <Grid xs={6}>
                            <Box>
                              <Typography>Fund Cluster :</Typography>
                              <Input
                                fullWidth
                                isRequired
                                name={"fund_cluster"}
                                value={inputs?.fund_cluster}
                                readOnly={CAFRecords ? true : false}
                                startDecorator={
                                  CAFRecords && (
                                    <Typography
                                      level="body-xs"
                                      variant="soft"
                                      color="warning"
                                      textTransform={"uppercase"}
                                      fontSize={9}
                                    >
                                      Generated by Budget :
                                      <br />
                                      <span style={{ color: "#EA2F14" }}>
                                        {moment(CAFRecords?.created_at).format(
                                          "MMMM DD, YYYY [|] h:mm A"
                                        )}
                                      </span>
                                    </Typography>
                                  )
                                }
                                onChange={(e) =>
                                  handleChange("fund_cluster", e.target.value)
                                }
                              />
                            </Box>
                            <Box>
                              <Typography>Funds Available :</Typography>
                              <InputComponent
                                type={"number"}
                                fullWidth
                                isRequired
                                name={"fund_available"}
                                value={inputs?.fund_available}
                                onChange={(e) =>
                                  handleChange("fund_available", e.target.value)
                                }
                              />
                            </Box>
                          </Grid>
                          <Grid xs={6}>
                            <Box>
                              <Typography>ORS/BURS No.:</Typography>
                              <InputComponent
                                fullWidth
                                isRequired
                                name={"ors_burs_no"}
                                value={inputs?.ors_burs_no}
                                onChange={(e) =>
                                  handleChange("ors_burs_no", e.target.value)
                                }
                              />
                            </Box>
                            <Box>
                              <Typography>Date of ORS/BURS :</Typography>
                              <InputComponent
                                fullWidth
                                type={"date"}
                                isRequired
                                name={"ors_burs_date"}
                                value={inputs?.ors_burs_date}
                                onChange={(e) =>
                                  handleChange("ors_burs_date", e.target.value)
                                }
                              />
                            </Box>

                            <Box>
                              <Typography>Amount:</Typography>
                              <InputComponent
                                type={"number"}
                                fullWidth
                                isRequired
                                name={"amount"}
                                value={inputs?.amount}
                                onChange={(e) =>
                                  handleChange("amount", e.target.value)
                                }
                              />
                            </Box>
                          </Grid>

                          <Grid xs={12}>
                            <Typography>Remarks :</Typography>
                            <Textarea
                              minRows={3}
                              name="remarks"
                              value={inputs?.remarks}
                              onChange={(e) =>
                                handleChange("remarks", e.target.value)
                              }
                            />
                          </Grid>
                        </Grid>
                        <ButtonComponent
                          type={"submit"}
                          label={"Submit"}
                          loading={submit}
                        />
                      </Card>
                    </form>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          </CardContent>
        </Card>
      </ContainerComponent>
      <SnackbarComponent
        open={open}
        onClose={closeSnackbar}
        anchor={anchor}
        color={color}
        variant={variant}
        message={message}
      />
    </div>
  );
}

export default TaggingPurchasedOrder;
