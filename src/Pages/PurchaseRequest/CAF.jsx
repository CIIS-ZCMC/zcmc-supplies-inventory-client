import React, { useEffect, useState } from "react";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import { Typography, Box, Input, Stack, Button, Badge, Chip } from "@mui/joy";
import { Search } from "lucide-react";
import useSuppliersHook from "../../Hooks/SuppliersHook";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import { PRresults } from "./PRresults";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import { Printer } from "lucide-react";
import usePrintHooks from "../../Hooks/PrintHooks";
import { CircleX } from "lucide-react";
import usePOTaggingHooks from "../../Hooks/POTaggingHook";
export const CAF = () => {
  const [searchPR, setSearchPR] = useState("");
  const [prresult, setprresult] = useState(false);
  const [load, setLoad] = useState(false);
  const { getPRrecords, getCAF, CAF_list } = useSuppliersHook();
  const { printCaf, OpenSmallWindow } = usePrintHooks();
  const [searchCAFinRecords, setSearchCAFinRecords] = useState("");
  const deleteCaf = usePOTaggingHooks((state) => state.deleteCaf);
  const [refresh, setRefresh] = useState(false);
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
    { id: "prno", label: "PR No." },
    { id: "fundsource", label: "Fund Source" },
    { id: "cafno", label: "CAF no" },
    { id: "remarks", label: "Remarks", width: "25%" },
    {
      id: "id",
      label: "Status",
      render: (row, index) => {
        return (
          <Box textAlign={"center"}>
            {row.deleted_at ? (
              <Chip variant="soft" size="sm" color="danger">
                <Typography fontSize={10} textTransform={"uppercase"}>
                  Inactive
                </Typography>
              </Chip>
            ) : (
              <Chip variant="soft" size="sm" color="success">
                <Typography fontSize={10} textTransform={"uppercase"}>
                  Active
                </Typography>
              </Chip>
            )}
          </Box>
        );
      },
    },
    {
      id: "csutom",
      label: "Action",
      width: "15%",
      render: (row) => {
        return (
          <Box>
            {row.deleted_at ? (
              <Typography
                level="body-xs"
                textTransform={"uppercase"}
                fontSize={9}
                textAlign={"center"}
              >
                No action required
              </Typography>
            ) : (
              <Stack direction={"row"} spacing={1} justifyContent={"center"}>
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
                <Button
                  variant="outlined"
                  size="sm"
                  color="danger"
                  onClick={() => {
                    swal({
                      title: "Are you sure?",
                      text: "Once deleted, you will not be able to recover this data!",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    }).then((willDelete) => {
                      if (willDelete) {
                        deleteCaf(row.id).then((res) => {
                          setRefresh(true);
                        });
                      }
                    });
                  }}
                >
                  <CircleX size={17} />
                </Button>
              </Stack>
            )}
          </Box>
        );
      },
    },
  ];

  const displayCaf = () => {
    if (searchCAFinRecords) {
      return CAF_list.filter(
        (x) =>
          x.prno.toLowerCase().includes(searchCAFinRecords.toLowerCase()) ||
          x.details.toLowerCase().includes(searchCAFinRecords.toLowerCase()) ||
          x.cafno.toLowerCase().includes(searchCAFinRecords.toLowerCase())
      );
    }

    return CAF_list;
  };

  useEffect(() => {
    getCAF();
    setRefresh(false);
  }, [refresh]);

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
        <PaginatedTable
          columns={columns}
          rows={displayCaf()}
          actionBtns={
            <>
              <Box mt={1}>
                <Input
                  placeholder="Find in Records : PR No, Details ..."
                  startDecorator={<Search size={16} />}
                  value={searchCAFinRecords}
                  onChange={(e) => setSearchCAFinRecords(e.target.value)}
                />
              </Box>
            </>
          }
        />
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
