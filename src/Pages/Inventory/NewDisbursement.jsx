import {
  Box,
  Button,
  Checkbox,
  Divider,
  Input,
  Radio,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { Delete } from "lucide-react";
import usePrintHooks from "../../Hooks/PrintHooks";
import usePOTaggingHooks from "../../Hooks/POTaggingHook";
import { ScanSearch } from "lucide-react";
export const NewDisbursement = () => {
  const [inputs, setInputs] = useState([]);
  const [Deductions, setDeductions] = useState([]);
  const [orsburs, setOrsburs] = useState();
  const { printDisbursementVoucher, OpenSmallWindow, postPrint } =
    usePrintHooks();
  const [load, setLoad] = useState(false);
  const { fetchORSBurs } = usePOTaggingHooks();
  const handleAddDeduction = () => {
    setDeductions((prev) => [
      ...prev,
      { name: "", value: "", isPercentage: false },
    ]);
  };
  const handleChange = (key, value) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRemoveDeduction = (index) => {
    setDeductions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleDeductionChange = (index, field, newValue) => {
    const updated = Deductions.map((deduction, idx) =>
      idx === index ? { ...deduction, [field]: newValue } : deduction
    );
    setDeductions(updated);
  };
  return (
    <div style={{ width: "500px" }}>
      <Typography>Enter PO Number:</Typography>
      <Input
        value={inputs?.po_number}
        placeholder="Type here ..."
        sx={{ mb: 2 }}
        onChange={(e) => {
          handleChange("po_number", e.target.value);
        }}
      />

      <Stack direction={"row"} justifyContent={"space-between"} sx={{ mb: 1 }}>
        <Typography>ORS/BURS No:</Typography>

        <Button
          variant="soft"
          color="danger"
          disabled={inputs?.po_number ? false : true}
          sx={{
            fontSize: "11px",
            fontWeight: "normal",
            textTransform: "uppercase",
          }}
          size="sm"
          loading={load}
          onClick={() => {
            setLoad(true);
            fetchORSBurs(inputs?.po_number).then((response) => {
              handleChange("orsbursno", response.data.orsburs);
              handleChange("fundcluster", response.data.fundcluster);
              setLoad(false);
            });
          }}
          endDecorator={<ScanSearch />}
        >
          Fetch ORS/BURS
        </Button>
      </Stack>

      <Input
        value={inputs?.orsbursno}
        placeholder="eg.123456-789"
        onChange={(e) => {
          handleChange("orsbursno", e.target.value);
        }}
      />
      <Typography sx={{ mt: 1 }}>Invoice No:</Typography>
      <Input
        placeholder="eg.0012,0013"
        onChange={(e) => {
          handleChange("invoiceno", e.target.value);
        }}
      />

      <Box>
        <Button
          variant="outlined"
          sx={{ mt: 1, mb: 2 }}
          size="sm"
          onClick={handleAddDeduction}
        >
          Add Deductions
        </Button>

        {Deductions.map((row, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Stack direction={"row"} justifyContent={"space-between"} mb={1}>
              <Typography level="body-sm" sx={{ mb: 0.5 }}>
                Deduction {index + 1}
              </Typography>
              <Button
                variant="plain"
                sx={{
                  fontSize: "11px",
                  fontWeight: "normal",
                  textTransform: "uppercase",
                }}
                size="sm"
                color="danger"
                onClick={() => handleRemoveDeduction(index)}
              >
                <Delete />
              </Button>
            </Stack>
            <Input
              placeholder="Deduction Name e.g. Less 1% Holding Tax"
              value={row.name}
              onChange={(e) => {
                handleDeductionChange(index, "name", e.target.value);
              }}
              sx={{ mb: 0.5 }}
            />
            <Stack sx={{ mb: 2, mt: 2 }}>
              <Checkbox
                label={<>Is Percentage</>}
                checked={row.isPercentage}
                onChange={(e) => {
                  const updated = Deductions.map((deduction, idx) =>
                    idx === index
                      ? {
                          ...deduction,
                          isPercentage: e.target.checked,
                          baseType: "total",
                        }
                      : deduction
                  );
                  setDeductions(updated);
                }}
                sx={{ mb: 0.5 }}
              />
            </Stack>

            <Divider />

            <Typography level="body-sm" sx={{ mb: 0.5, mt: 1 }}>
              Value / Percentage
            </Typography>
            <Input
              placeholder="Value (e.g. 1%) or 12345"
              value={row.value}
              onChange={(e) =>
                handleDeductionChange(
                  index,
                  "value",
                  String(e.target.value).trim()
                )
              }
            />

            {/* <Typography level="body-sm" sx={{ mb: 0.5, mt: 1 }}>
              Display value
            </Typography>
            <Input
              placeholder="Display Value : eg. 298650"
              value={row.displayValue}
              sx={{ mb: 1 }}
              onChange={(e) =>
                handleDeductionChange(
                  index,
                  "displayValue",
                  String(e.target.value).trim()
                )
              }
            /> */}
            <Divider sx={{ mt: 2, mb: 2 }} />
          </Box>
        ))}
      </Box>
      {Deductions.length == 0 && <Divider sx={{ mt: 2, mb: 2 }} />}

      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button
          variant="solid"
          sx={{ mt: 1 }}
          size="md"
          onClick={() => {
            // const safeDeductions = Deductions.map((d) => ({
            //   ...d,
            //   name: String(d.name).trim().replace(/\//g, "^"),
            // }));

            postPrint("printdv", {
              input: inputs,
              deductions: Deductions,
            }).then((pathResponse) => {
              OpenSmallWindow(pathResponse);
            });

            // OpenSmallWindow(
            //   printDisbursementVoucher({
            //     input: inputs,
            //     deductions: safeDeductions,
            //   })
            // );
          }}
        >
          Generate
        </Button>
      </Box>
    </div>
  );
};
