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
import { IoMdCloseCircleOutline } from "react-icons/io";
export const POResult = ({ data }) => {
  const [form, setForm] = useState({
    emailedDate: "",
    delivered: false,
    extended: false,
    deliveredDate: "",
    iar: "",
    qtyDelivered: "",
    remarks: "",
    complaintReason: "",
    complaintResponse: "",
    status: "",
  });

  const { clearPOResult } = useSuppliersHook();

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card variant="outlined">
      <Card variant="soft">
        <CardContent>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography level="title-sm" mb={1}>
              PO Items (Compact)
            </Typography>
            <Button
              variant="soft"
              color="danger"
              endDecorator={<IoMdCloseCircleOutline />}
              onClick={clearPOResult}
            >
              Clear Results
            </Button>
          </Stack>
          {data.map((item, index) => (
            <Sheet key={1} variant="outlined" sx={{ p: 1, fontSize: "xs" }}>
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
                            Delivered/Received
                          </FormLabel>
                          <Checkbox
                            size="sm"
                            checked={form.delivered}
                            onChange={(e) =>
                              handleChange("delivered", e.target.checked)
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
                            size="sm"
                            checked={form.extended}
                            onChange={(e) =>
                              handleChange("extended", e.target.checked)
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
                          <Input type="date" size="sm" />
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
                            value={form.deliveredDate}
                            onChange={(e) =>
                              handleChange("deliveredDate", e.target.value)
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid md={6}>
                        <FormControl sx={{ mt: 2 }}>
                          <FormLabel sx={{ fontSize: "11px" }}>IAR</FormLabel>
                          <Input
                            size="sm"
                            value={form.iar}
                            onChange={(e) =>
                              handleChange("iar", e.target.value)
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
                            value={form.qtyDelivered}
                            onChange={(e) =>
                              handleChange("qtyDelivered", e.target.value)
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
                            value={form.remarks}
                            onChange={(e) =>
                              handleChange("remarks", e.target.value)
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
                            value={form.complaintReason}
                            onChange={(e) =>
                              handleChange("complaintReason", e.target.value)
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
                            value={form.complaintResponse}
                            onChange={(e) =>
                              handleChange("complaintResponse", e.target.value)
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
                            value={form.status}
                            onChange={(_, value) =>
                              handleChange("status", value)
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
