import React, { useEffect, useState } from "react";
import useInventoryHook from "../../Hooks/InventoryHook";
import { Box, Button, Card, Grid, Input, Typography } from "@mui/joy";
import { ScrollText } from "lucide-react";

import Table from "@mui/joy/Table";
export const BalanceCardSeparation = ({
  selectedItem,
  managemodal,
  setRefresh,
}) => {
  const [Setting, setSetting] = useState([]);
  const [balance, setBalance] = useState();
  const [addbtn, setAddbtn] = useState(false);
  const [sessionBalance, setSessionBalance] = useState(0);
  const [input, setInput] = useState([]);
  const [error, setError] = useState(null);
  const [saveRecordLoad, setSaveRecordLoad] = useState(false);
  const [defaultBalance, setDefaultBalance] = useState();
  const updateBalanceCard = useInventoryHook(
    (state) => state.updateBalanceCard
  );

  useEffect(() => {
    if (managemodal) {
      let defaultBal = selectedItem?.remainingBalance;
      let RecordedBalance =
        selectedItem?.customBalance && JSON.parse(selectedItem?.customBalance);
      let RemainingBal = 0;

      if (RecordedBalance && RecordedBalance?.length >= 1) {
        setSetting(RecordedBalance);
        const TotalRecordedQty = parseFloat(
          RecordedBalance.reduce(
            (sum, x) => parseFloat(sum) + parseFloat(x.qty),
            0
          )
        );
        const RemainingBal = parseFloat(
          parseFloat(defaultBal) - TotalRecordedQty
        );

        setSessionBalance(RemainingBal);
        setBalance(RemainingBal);

        setDefaultBalance(RemainingBal);

        //
      } else {
        if (sessionBalance == 0) {
          setBalance(selectedItem?.remainingBalance);
          setDefaultBalance(selectedItem?.remainingBalance);
        }
      }
    }
  }, [managemodal]);

  useEffect(() => {
    if (!managemodal) {
      setSessionBalance(0);
      setSetting([]);
      setInput([]);
    }
  }, [managemodal]);

  const handleChange = (key, value) => {
    if (key == "qty") {
      if (value <= 0) {
        return;
      }
      let DefaultBalance = defaultBalance;
      if (Setting?.length >= 1) {
        DefaultBalance = sessionBalance;
      }

      if (value == "") {
        setBalance(DefaultBalance);
      } else if (parseFloat(value) >= DefaultBalance) {
        setBalance(0);
      } else {
        setBalance(DefaultBalance - value);
      }

      if (DefaultBalance < parseFloat(value)) {
        setAddbtn(true);
      } else {
        setAddbtn(false);
      }
    }
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectAll = () => {
    const key = "qty";
    let value = 0;
    if (key == "qty") {
      let DefaultBalance = selectedItem?.remainingBalance;
      if (Setting?.length >= 1) {
        DefaultBalance = sessionBalance;
      }

      value = DefaultBalance;

      if (value <= 0) {
        return;
      }
      if (value == "") {
        setBalance(DefaultBalance);
      } else if (parseFloat(value) >= DefaultBalance) {
        setBalance(0);
      } else {
        setBalance(DefaultBalance - value);
      }

      if (DefaultBalance < parseFloat(value)) {
        setAddbtn(true);
      } else {
        setAddbtn(false);
      }
    }
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAdd = () => {
    if (!input.qty || !input.source) {
      return; // Prevent adding if qty is missing or source is empty
    }
    setSetting((prev) => [...prev, input]);

    setSessionBalance(balance);
    setInput([]);
  };

  const handleSaveRecords = () => {
    setSaveRecordLoad(true);
    updateBalanceCard({
      selected: selectedItem,
      setting: Setting,
    }).then((res) => {
      console.log(res);
      setSaveRecordLoad(false);
      setRefresh(true);
    });
  };

  return (
    <div>
      <Typography>
        <Box>Current Balance : </Box>
        <Typography level="h2" color="primary">
          {balance}
        </Typography>
      </Typography>

      <Grid container spacing={1} mt={2}>
        <Grid xs={12} md={5}>
          <Card mt={1}>
            <Typography>Enter Quantity</Typography>
            <Input
              type="number"
              value={input?.qty ?? ""}
              onChange={(e) => handleChange("qty", e.target.value)}
              endDecorator={
                <Button
                  variant="soft"
                  color="neutral"
                  onClick={handleSelectAll}
                >
                  {" "}
                  Select All
                </Button>
              }
            />

            <Typography>Enter Source</Typography>
            <Input
              value={input?.source ?? ""}
              onChange={(e) => handleChange("source", e.target.value)}
            />
            <Button onClick={handleAdd} disabled={addbtn} variant="outlined">
              Add{" "}
            </Button>
          </Card>
        </Grid>
        <Grid xs={12} md={7}>
          <Card mt={1}>
            <Table size="sm">
              <caption>
                Showing separated records
                <ScrollText style={{ marginLeft: "10px" }} />
              </caption>
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Source</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Setting.map((row, index) => (
                  <tr key={index}>
                    <td>{row.qty}</td>
                    <td>{row.source}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="soft"
                        color="danger"
                        sx={{ fontSize: "10px", textTransform: "uppercase" }}
                        onClick={() => {
                          const newSet = Setting.filter(
                            (x) => x.source !== row.source && x.qty !== row.qty
                          );
                          setBalance(
                            parseFloat(sessionBalance) + parseFloat(row.qty)
                          );
                          setSessionBalance(
                            parseFloat(sessionBalance) + parseFloat(row.qty)
                          );
                          setSetting(newSet);
                        }}
                      >
                        ReCompute
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
              loading={saveRecordLoad}
              loadingPosition="right"
              onClick={handleSaveRecords}
            >
              Save Records
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
