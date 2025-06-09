import React, { useEffect, useState } from "react";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import { Typography, Box, Input, Stack, Button } from "@mui/joy";
import { Search } from "lucide-react";
import useSuppliersHook from "../../Hooks/SuppliersHook";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import { PRresults } from "./PRresults";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import { Printer } from "lucide-react";
import usePrintHooks from "../../Hooks/PrintHooks";
export const CAF = () => {
  const [searchPR, setSearchPR] = useState("");
  const [prresult, setprresult] = useState(false);
  const [load, setLoad] = useState(false);
  const { getPRrecords, getCAF, CAF_list } = useSuppliersHook();
  const { printCaf, OpenSmallWindow } = usePrintHooks();
  const columns = [
    {
      id: "id",
      label: "#",
      width: "5%",
      render: (row, index) => {
        return index + 1;
      },
    },
    { id: "details", label: "Details" },
    { id: "prno", label: "PR No.", width: "30%" },
    { id: "fundsource", label: "Fund Source" },
    {
      id: "csutom",
      label: "Action",
      render: (row) => {
        return (
          <Button
            variant="soft"
            size="sm"
            color="warning"
            onClick={() => {
              OpenSmallWindow(printCaf(row));
              console.log(row);
            }}
          >
            <Printer size={17} />
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    getCAF();
  }, []);

  return (
    <div>
      <Typography level="body-lg">Generate CAF</Typography>
      <Typography level="body-xs">
        ( Certification as to availability of fund )
      </Typography>

      <Box mt={1} width={"40%"}>
        <ContainerComponent>
          <Typography>Search PR No:</Typography>
          <Stack direction={"row"} spacing={1}>
            <Input
              placeholder="Type here ..."
              value={searchPR}
              onChange={(e) => {
                const val = e.target.value;
                setSearchPR(val);
              }}
            />
            <Button
              endDecorator={<Search size={16} />}
              loading={load}
              loadingPosition="end"
              onClick={() => {
                if (searchPR) {
                  setLoad(true);
                  getPRrecords(searchPR).then((res) => {
                    if (res.data.length == 0) {
                      setLoad(false);
                      swal(
                        "No Data",
                        `no records found for searched PR : ${searchPR}`,
                        "error"
                      );
                      return;
                    }
                    setprresult(true);
                    setLoad(false);
                  });
                }
              }}
            >
              Find PR
            </Button>
          </Stack>
        </ContainerComponent>
      </Box>
      <Box mt={2}>
        <PaginatedTable columns={columns} rows={CAF_list} />
      </Box>
      <ModalComponent
        isOpen={prresult}
        title="GENERATE CAF ( Certification as to availability of fund )"
        handleClose={() => setprresult(false)}
        content={<PRresults setprresult={setprresult} />}
      />
    </div>
  );
};
