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
import { Save } from "lucide-react";
import useSuppliersHook from "../../Hooks/SuppliersHook";
export const GlobalSetting = ({ PO_result, setFetch }) => {
  const [input, setInputs] = useState({});
  const [load, setLoad] = useState(false);
  const { setToAll } = useSuppliersHook();
  const handleChanges = (key, value) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <Sheet
        key={1}
        variant="outlined"
        sx={{
          p: 1,
          fontSize: "xs",
          mb: 1,
          borderLeft: "8px solid #FF6F3C",
        }}
      >
        <Typography color="danger">Apply this settings to all</Typography>
        <Box>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={1}>
            <Grid xs={12} md={12}>
              <FormControl>
                <FormLabel sx={{ fontSize: "11px" }}>
                  is Disbursment Voucher processed?
                </FormLabel>
                <Checkbox
                  color="success"
                  size="sm"
                  checked={!!input.isDVprocessed}
                  onChange={(e) =>
                    handleChanges("isDVprocessed", e.target.checked)
                  }
                  label="Yes"
                />
              </FormControl>
            </Grid>
            <Grid xs={12} md={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: "11px" }}>
                  Delivered/Received
                </FormLabel>
                <Checkbox
                  size="sm"
                  checked={!!input.delivered}
                  onChange={(e) => handleChanges("delivered", e.target.checked)}
                  label="Yes"
                />
              </FormControl>
            </Grid>
            <Grid xs={12} md={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: "11px" }}>Extended</FormLabel>
                <Checkbox
                  color="danger"
                  size="sm"
                  checked={!!input.extended}
                  onChange={(e) => handleChanges("extended", e.target.checked)}
                  label="Yes"
                />
              </FormControl>
            </Grid>

            <Grid xs={12} md={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: "11px" }}>Emailed Date</FormLabel>
                <Input
                  type="date"
                  size="sm"
                  value={input.emailed_date || ""}
                  onChange={(e) =>
                    handleChanges("emailed_date", e.target.value)
                  }
                />
              </FormControl>
            </Grid>

            <Grid xs={12} md={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: "11px" }}>Delivered Date</FormLabel>
                <Input
                  size="sm"
                  type="date"
                  value={input.delivered_date || ""}
                  onChange={(e) =>
                    handleChanges("delivered_date", e.target.value)
                  }
                />
              </FormControl>
            </Grid>

            <Grid md={6}>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel sx={{ fontSize: "11px" }}>IAR</FormLabel>
                <Input
                  size="sm"
                  value={input.IAR || ""}
                  onChange={(e) => handleChanges("IAR", e.target.value)}
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
                  value={input.quantity_delivered || ""}
                  onChange={(e) =>
                    handleChanges("quantity_delivered", e.target.value)
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={1}>
          <Grid xs={12}>
            <FormControl>
              <FormLabel sx={{ fontSize: "11px" }}>Remarks</FormLabel>
              <Textarea
                size="sm"
                minRows={2}
                value={input.response_remarks || ""}
                onChange={(e) =>
                  handleChanges("response_remarks", e.target.value)
                }
              />
            </FormControl>
          </Grid>

          <Grid xs={12}>
            <Typography level="body-xs">Product Complaint</Typography>
          </Grid>

          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: "11px" }}>Reason</FormLabel>
              <Textarea
                size="sm"
                minRows={2}
                value={input.product_complain_reason || ""}
                onChange={(e) =>
                  handleChanges("product_complain_reason", e.target.value)
                }
              />
            </FormControl>
          </Grid>

          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: "11px" }}>Response Remarks</FormLabel>
              <Textarea
                size="sm"
                minRows={2}
                value={input.product_complain_response || ""}
                onChange={(e) =>
                  handleChanges("product_complain_response", e.target.value)
                }
              />
            </FormControl>
          </Grid>

          <Grid xs={12}>
            <FormControl>
              <FormLabel sx={{ fontSize: "11px" }}>Status</FormLabel>
              <Select
                size="sm"
                value={input.status || ""}
                onChange={(_, value) => handleChanges("status", value)}
                placeholder="Select status"
              >
                <Option value="Supplier Cancelled">Supplier Cancelled</Option>
                <Option value="ZCMC Cancelled">ZCMC Cancelled</Option>
                <Option value="Specs Not Compliant">Specs Not Compliant</Option>
                <Option value="DB Processed">
                  Disbursement Voucher Processed
                </Option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box display={"flex"} justifyContent={"flex-end"} sx={{ mb: 1 }}>
          <Button
            variant="solid"
            sx={{
              mt: 2,
              fontWeight: "normal",
              textTransform: "uppercase",
              fontSize: "13px",
            }}
            loading={load}
            loadingPosition="end"
            endDecorator={<Save size={16} />}
            onClick={() => {
              const hasValidValue = Object.values(input).some(
                (v) => v !== null && v !== "" && v !== undefined
              );

              if (!hasValidValue) {
                swal(
                  "Validation failed",
                  "Please fill in at least one field before applying changes.",
                  "warning"
                );
                return;
              }

              setLoad(true);
              setToAll({
                PoResult: PO_result.data,
                Input: input,
              }).then((res) => {
                setLoad(false);
                setFetch(true);
              });
            }}
          >
            Apply Changes
          </Button>
        </Box>
      </Sheet>
    </div>
  );
};
