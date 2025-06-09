import React, { useEffect, useState } from "react";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import {
  Typography,
  Box,
  Input,
  Stack,
  Button,
  Divider,
  Table,
} from "@mui/joy";
import { Search } from "lucide-react";
import useSuppliesHook from "../../Hooks/SuppliesHook";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import { X, Printer } from "lucide-react";
import moment from "moment";
export const SearchPOForIAR = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState("");
  const getIAR = useSuppliesHook((state) => state.getIAR);
  const IARResult = useSuppliesHook((state) => state.IARResult);
  const clearIARResult = useSuppliesHook((state) => state.clearIARResult);

  const handleChange = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const columns = [
    {
      id: "key", // or any field name
      label: "#",
      width: "5%",
      render: (row, index) => {
        return index + 1;
      },
    },
    { id: "RequestingOffice", label: "Requesting Office", width: "20%" },
    { id: "DocumentNo", label: "Doc No", width: "15%" },
    { id: "invoice", label: "Invoice", width: "20%" },
    {
      id: "deliveredQty",
      label: "Qty and Expdate",
      width: "30%",
      render: (row) => {
        return (
          <Stack direction={"column"}>
            <Typography>{row.deliveredQty}</Typography>
            <Divider />
            <Typography>{moment(row.expdate).format("YYYY-MM-DD")}</Typography>
          </Stack>
        );
      },
    },
    { id: "lotno", label: "Lot no/Serial", width: "40%" },
    { id: "itemdesc", label: "Item", width: "50%" },
    { id: "actions", label: "Actions", width: "20%" },
  ];

  return (
    <div>
      <Box mt={1}>
        {/* <ContainerComponent> */}
        <Typography>PO No:</Typography>
        <Stack direction={"column"} spacing={1}>
          <Input
            placeholder="Type here ..."
            value={data?.poNo}
            onChange={(e) => {
              const val = e.target.value;
              handleChange("poNo", val);
            }}
          />
          <Typography>Invoice Date:</Typography>
          <Input
            type="date"
            value={data?.invoice_date}
            onChange={(e) => handleChange("invoice_date", e.target.value)}
          />
          <Button
            endDecorator={<Search size={16} />}
            loading={load}
            loadingPosition="end"
            onClick={() => {
              setLoad(true);
              if (!data?.poNo && !data?.invoice_date) {
                swal(
                  "action failed",
                  "Please input PO No and invoice date before proceeding",
                  "warning"
                );
                setLoad(false);
                return;
              }

              getIAR(data).then(() => {
                setLoad(false);
                return;
              });
            }}
          >
            Find PO
          </Button>
        </Stack>
        {/* </ContainerComponent> */}
        <Divider sx={{ marginTop: "10px" }} />
        <Box mt={1}>
          {IARResult.length >= 1 && (
            <PaginatedTable
              size={"sm"}
              actionBtns={
                <Button
                  sx={{
                    marginTop: "10px",
                    float: "right",
                    fontWeight: "normal",
                  }}
                  size="sm"
                  variant="outlined"
                  color="danger"
                  endDecorator={<X size={15} />}
                  onClick={clearIARResult}
                >
                  Clear Filter
                </Button>
              }
              rows={IARResult}
              columns={columns}
              customAction={true}
              viewable={false}
              handleCustomAction={(row) => {
                return (
                  <Stack direction={"row"} justifyContent={"center"}>
                    <Button
                      size="sm"
                      color="warning"
                      variant="soft"
                      onClick={() => {
                        console.log(row);
                      }}
                    >
                      <Printer size={17} />
                    </Button>
                  </Stack>
                );
              }}
            />
          )}
        </Box>
      </Box>
    </div>
  );
};
