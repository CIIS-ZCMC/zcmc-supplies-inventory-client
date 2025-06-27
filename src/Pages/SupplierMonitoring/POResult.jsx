import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Input,
  Select,
  Option,
  Textarea,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  Sheet,
  Divider,
  Stack,
  Grid,
  Box,
} from "@mui/joy";
import useSuppliersHook from "../../Hooks/SuppliersHook";
import { use } from "react";
import { GlobalSetting } from "./GlobalSetting";
import { useEffect } from "react";

export const POResult = ({ searchedPo }) => {
  const { fetchPOs, clearPOResult, UpdatePos, PO_result } = useSuppliersHook();
  const [form, setForm] = useState(PO_result.data);
  const [fetch, setFetch] = useState(false);
  const handleChange = (key, value, id) => {
    setForm((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
    UpdatePos(id, {
      [key]: value,
    });
    setTimeout(() => {
      fetchPOs(searchedPo);
    }, 4000);
  };

  useEffect(() => {
    if (fetch) {
      clearPOResult();
      swal("Changes Saved", "Changes saved successfully", "success");
      fetchPOs(searchedPo);
      setFetch(false);
    }
  }, [fetch]);

  return (
    <Card variant="outlined">
      <Card variant="soft">
        <Button
          variant="soft"
          color="danger"
          //  endDecorator={<IoMdCloseCircleOutline />}
          onClick={clearPOResult}
        >
          Clear Results
        </Button>
        <CardContent>
          <Box>
            <GlobalSetting PO_result={PO_result} setFetch={setFetch} />
          </Box>

          <Stack
            direction={"row"}
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography level="title-sm" mb={1}>
              PO Items (Compact)
            </Typography>
          </Stack>
          {PO_result?.data?.map((item, index) => (
            <Sheet key={1} variant="outlined" sx={{ p: 1, fontSize: "xs" }}>
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Typography level="body-xs">Row #: {index + 1} </Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid xs={6}>
                  <Grid xs={6}>
                    <Typography level="body-xs" color="primary">
                      PO #: {item.docno}
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography level="body-xs" color="danger">
                      <span style={{ color: "gray" }}> Supplier :</span>{" "}
                      {item.supplier}
                    </Typography>
                  </Grid>

                  <Typography level="body-xs" fontWeight="md" color="warning">
                    {item.itemabbrev}
                  </Typography>
                  <Grid xs={6}>
                    <Typography level="body-xs">
                      Qty: {item.qty} | {item.unit}
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography level="body-xs">
                      Exp: {item.expdate.split(" ")[0]}
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography level="body-xs">
                      TRXNO: {item.PK_TRXNO}
                    </Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Typography level="body-xs">
                      Remarks: {item.remarks}
                    </Typography>
                  </Grid>
                  <Box>
                    <Divider sx={{ my: 1 }} />
                    <Grid container spacing={1}>
                      <Grid xs={12} md={6}>
                        <FormControl>
                          <FormLabel sx={{ fontSize: "11px" }}>
                            is Disbursment Voucher processed?
                          </FormLabel>
                          <Checkbox
                            color="success"
                            key={item.id}
                            size="sm"
                            checked={
                              form?.filter((x) => x.id === item.id)[0]
                                ?.isDVprocessed
                            }
                            onChange={(e) =>
                              handleChange(
                                "isDVprocessed",
                                e.target.checked,
                                item.id
                              )
                            }
                            label="Yes"
                          />
                        </FormControl>
                      </Grid>

                      <Grid xs={12} md={6}>
                        <FormControl>
                          <FormLabel sx={{ fontSize: "11px" }}>
                            Delivery Terms
                          </FormLabel>
                          <Input
                            size="sm"
                            type="number"
                            inputProps={{ max: 1 }}
                            value={
                              form?.filter((x) => x.id === item.id)[0]
                                ?.delivery_terms ?? 1
                            }
                            sx={{ input: { textAlign: "center" } }}
                            onChange={(e) =>
                              handleChange(
                                "delivery_terms",
                                e.target.value,
                                item.id
                              )
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid xs={12} md={6}>
                        <FormControl>
                          <FormLabel sx={{ fontSize: "11px" }}>
                            Delivered/Received
                          </FormLabel>

                          <Checkbox
                            key={item.id}
                            size="sm"
                            checked={
                              form?.filter((x) => x.id === item.id)[0]
                                ?.delivered
                            }
                            onChange={(e) =>
                              handleChange(
                                "delivered",
                                e.target.checked,
                                item.id
                              )
                            }
                            label="Yes"
                          />
                        </FormControl>
                      </Grid>
                      <Grid xs={12} md={6}>
                        <FormControl>
                          <FormLabel sx={{ fontSize: "11px" }}>
                            Extended
                          </FormLabel>
                          <Checkbox
                            color="danger"
                            key={item.id}
                            size="sm"
                            checked={
                              form?.filter((x) => x.id === item.id)[0]?.extended
                            }
                            onChange={(e) =>
                              handleChange(
                                "extended",
                                e.target.checked,
                                item.id
                              )
                            }
                            label="Yes"
                          />
                        </FormControl>
                      </Grid>

                      <Grid xs={12} md={6}>
                        <FormControl>
                          <FormLabel sx={{ fontSize: "11px" }}>
                            Emailed Date
                          </FormLabel>
                          <Input
                            type="date"
                            size="sm"
                            value={
                              form?.filter((x) => x.id === item.id)[0]
                                ?.emailed_date
                            }
                            onChange={(e) =>
                              handleChange(
                                "emailed_date",
                                e.target.value,
                                item.id
                              )
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid xs={12} md={6}>
                        <FormControl>
                          <FormLabel sx={{ fontSize: "11px" }}>
                            Delivered Date
                          </FormLabel>
                          <Input
                            size="sm"
                            type="date"
                            value={
                              form?.filter((x) => x.id === item.id)[0]
                                ?.delivered_date
                            }
                            onChange={(e) =>
                              handleChange(
                                "delivered_date",
                                e.target.value,
                                item.id
                              )
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid md={6}>
                        <FormControl sx={{ mt: 2 }}>
                          <FormLabel sx={{ fontSize: "11px" }}>IAR</FormLabel>
                          <Input
                            size="sm"
                            value={
                              form?.filter((x) => x.id === item.id)[0]?.IAR
                            }
                            onChange={(e) =>
                              handleChange("IAR", e.target.value, item.id)
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid md={6}>
                        <FormControl sx={{ mt: 2 }}>
                          <FormLabel sx={{ fontSize: "11px" }}>
                            Quantity Delivered
                          </FormLabel>
                          <Input
                            size="sm"
                            type="number"
                            value={
                              form?.filter((x) => x.id === item.id)[0]
                                ?.quantity_delivered
                            }
                            onChange={(e) =>
                              handleChange(
                                "quantity_delivered",
                                e.target.value,
                                item.id
                              )
                            }
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                <Grid xs={6}>
                  <Box p={2}>
                    <Grid container spacing={1}>
                      <Grid xs={12}>
                        <FormControl>
                          <FormLabel sx={{ fontSize: "11px" }}>
                            Remarks
                          </FormLabel>
                          <Textarea
                            size="sm"
                            minRows={2}
                            value={
                              form?.filter((x) => x.id === item.id)[0]
                                ?.response_remarks
                            }
                            onChange={(e) =>
                              handleChange(
                                "response_remarks",
                                e.target.value,
                                item.id
                              )
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid xs={12}>
                        <Typography level="body-xs">
                          Product Complaint
                        </Typography>
                      </Grid>

                      <Grid xs={12} md={6}>
                        <FormControl>
                          <FormLabel sx={{ fontSize: "11px" }}>
                            Reason
                          </FormLabel>
                          <Textarea
                            size="sm"
                            minRows={2}
                            value={
                              form?.filter((x) => x.id === item.id)[0]
                                ?.product_complain_reason
                            }
                            onChange={(e) =>
                              handleChange(
                                "product_complain_reason",
                                e.target.value,
                                item.id
                              )
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid xs={12} md={6}>
                        <FormControl>
                          <FormLabel sx={{ fontSize: "11px" }}>
                            Response Remarks
                          </FormLabel>
                          <Textarea
                            size="sm"
                            minRows={2}
                            value={
                              form?.filter((x) => x.id === item.id)[0]
                                ?.product_complain_response
                            }
                            onChange={(e) =>
                              handleChange(
                                "product_complain_response",
                                e.target.value,
                                item.id
                              )
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid xs={12}>
                        <FormControl>
                          <FormLabel sx={{ fontSize: "11px" }}>
                            Status
                          </FormLabel>
                          <Select
                            size="sm"
                            value={
                              form?.filter((x) => x.id === item.id)[0]?.status
                            }
                            onChange={(_, value) =>
                              handleChange("status", value, item.id)
                            }
                            placeholder="Select status"
                          >
                            <Option value="Supplier Cancelled">
                              Supplier Cancelled
                            </Option>
                            <Option value="ZCMC Cancelled">
                              ZCMC Cancelled
                            </Option>
                            <Option value="Specs Not Compliant">
                              Specs Not Compliant
                            </Option>
                            <Option value="DB Processed">
                              Disbursement Voucher Processed
                            </Option>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Sheet>
          ))}
        </CardContent>
      </Card>
    </Card>
  );
};
