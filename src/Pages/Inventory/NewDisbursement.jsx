import {
  Box,
  Button,
  Checkbox,
  Divider,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { Delete } from "lucide-react";
import usePrintHooks from "../../Hooks/PrintHooks";
export const NewDisbursement = () => {
  const [inputs, setInputs] = useState([]);
  const [Deductions, setDeductions] = useState([]);
  const { printDisbursementVoucher, OpenSmallWindow } = usePrintHooks();

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
    <div>
      <Typography>Enter PR Number:</Typography>
      <Input
        placeholder="Type here ..."
        sx={{ mb: 2 }}
        onChange={(e) => {
          handleChange("pr_number", e.target.value);
        }}
      />

      <Stack direction={"row"} justifyContent={"space-between"} sx={{ mb: 1 }}>
        <Typography>ORS/BURS No:</Typography>
        <Button
          variant="soft"
          sx={{
            fontSize: "11px",
            fontWeight: "normal",
            textTransform: "uppercase",
          }}
          size="sm"
        >
          Fetch ORS/BURS if theres any.
        </Button>
      </Stack>

      <Input
        placeholder="eg.123456-789"
        onChange={(e) => {
          handleChange("orsbursno", e.target.value);
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
              onChange={(e) =>
                handleDeductionChange(index, "name", e.target.value)
              }
              sx={{ mb: 0.5 }}
            />
            <Checkbox
              label="Is Percentage"
              checked={row.isPercentage}
              onChange={(e) =>
                handleDeductionChange(index, "isPercentage", e.target.checked)
              }
              sx={{ mb: 0.5 }}
            />
            <Input
              placeholder="Value (e.g. 1%)"
              value={row.value}
              onChange={(e) =>
                handleDeductionChange(index, "value", e.target.value)
              }
            />
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
            OpenSmallWindow(
              printDisbursementVoucher({
                input: inputs,
                deductions: Deductions,
              })
            );
          }}
        >
          Generate
        </Button>
      </Box>
    </div>
  );
};
