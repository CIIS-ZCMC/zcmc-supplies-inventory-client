import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
  Checkbox,
  Radio,
  Button,
  Grid,
  Sheet,
  Input,
  Card,
} from "@mui/joy";
import { useLocation } from "react-router-dom";
import { user } from "../../Data";
import Header from "../../Layout/Header/Header";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import useSuppliesHook from "../../Hooks/SuppliesHook";
import Table from "@mui/joy/Table";
import { CloudDownload } from "lucide-react";
import usePOTaggingHooks from "../../Hooks/POTaggingHook";
import usePrintHooks from "../../Hooks/PrintHooks";
import LinearProgress from "@mui/joy/LinearProgress";
import { ClipboardPenLine } from "lucide-react";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import { ManageMastlistSelection } from "./ManageMastlistSelection";
export const MaterialsIssuanceReport = () => {
  const getIssued = useSuppliesHook((state) => state.getIssued);
  const RSMIResult = useSuppliesHook((state) => state.RSMIResult);
  const [fundcluster, setFundCluster] = useState("");
  const [openManage, setOpenManage] = useState(false);
  const [selection, setSelection] = useState(new Set());
  const [selectall, setSelectall] = useState(new Set());
  const { OpenSmallWindow, printSuppliesIssuance } = usePrintHooks();
  const fetchTagItemsFundClusters = usePOTaggingHooks(
    (state) => state.fetchTagItemsFundClusters
  );
  const [load, setLoad] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [search, setSearch] = useState("");
  const pageDetails = {
    title: "Report of supplies and masterlist issued",
    description: "See the list of items.",
    pagePath: "/inventory",
  };
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const [dataDates, setDataDates] = useState(data);

  const displayRow = () => {
    if (search) {
      return RSMIResult.filter((x) =>
        x.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return RSMIResult;
  };

  useEffect(() => {
    setFetching(true);
    setSelection(new Set());
    getIssued(dataDates).then(() => setFetching(false));
  }, [dataDates]);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  const handleSelection = (name, item, poNo) => {
    const rowID = `${item.id}-${name}-${poNo}`; // Keep this format if you want, but be consistent
    const newSelection = new Set(selection);

    if (newSelection.has(rowID)) {
      newSelection.delete(rowID);
    } else {
      newSelection.add(rowID);
    }

    // ✅ This ensures React detects the change
    setSelection(new Set(newSelection));
  };

  const handlePrintRSMI = () => {
    OpenSmallWindow(
      printSuppliesIssuance({
        fundcluster: fundcluster,
        selection: Array.from(selection),
        from: dataDates.from,
        to: dataDates.to,
      })
    );
  };

  const IssuanceColumn = [
    {
      id: "key", // or any field name
      label: "#",
      width: "5%",
      render: (row, index) => {
        return index + 1;
      },
    },
    { id: "name", label: "Area", width: "20%" },
    {
      id: "risNo",
      label: "ITEMS",
      width: "60%",
      render: (row, index) => {
        return (
          <Box padding={2}>
            <Checkbox
              label="Select All"
              sx={{ fontSize: "12px", float: "right", mb: 2, color: "#FF6F3C" }}
              color="neutral"
              checked={row.items.every((item) =>
                selection.has(`${item.id}-${row.name}-${row.po_number}`)
              )} // Check if all are selected
              onChange={(e) => {
                const newSelection = new Set(selection);
                if (e.target.checked) {
                  // Select all
                  row.items?.forEach((item) => {
                    const rowID = `${item.id}-${row.name}-${row.po_number}`;
                    newSelection.add(rowID);
                  });
                } else {
                  // Deselect all
                  row.items?.forEach((item) => {
                    const rowID = `${item.id}-${row.name}-${row.po_number}`;
                    newSelection.delete(rowID);
                  });
                }
                setSelection(newSelection);
              }}
            />

            <Table
              size="sm"
              variant="soft"
              color="default"
              stripe={"odd"}
              borderAxis="x"
              sx={{
                "& thead th:nth-child(1)": { width: "40%" },
                fontSize: "10px",
              }}
            >
              <thead>
                <tr>
                  <th>ITEM NAME</th>
                  <th>Unit</th>
                  <th>Qty Issued</th>
                  <th style={{ width: "60px" }}></th>
                </tr>
              </thead>
              <tbody>
                {row.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.item}</td>
                    <td>{item.unit}</td>
                    <td>{item.quantityIssued}</td>
                    <td style={{ textAlign: "center" }}>
                      {/* `${item.id}-${row.name}` */}
                      <Checkbox
                        checked={selection.has(
                          `${item.id}-${row.name}-${row.po_number}`
                        )}
                        props
                        onChange={() => {
                          handleSelection(row.name, item, row.po_number);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {row.releasedRemarks && (
              <Box mt={1}>
                <Typography>REMARKS :</Typography>
                <Card>
                  <Typography level="body-xs">{row.releasedRemarks}</Typography>
                </Card>
              </Box>
            )}
          </Box>
        );
      },
    },
  ];
  function extractLastNumberSet(selection) {
    // Convert Set to array and process each entry
    const results = Array.from(selection)
      .map((item) => {
        const matches = item.match(
          /(\d{2}-\d{2}-\d{3,4})(?!.*\d{2}-\d{2}-\d{3,4})/
        );
        return matches ? matches[0] : null;
      })
      .filter(Boolean); // Remove null entries

    return results.length > 0 ? results : null;
  }

  return (
    <div>
      <Header pageDetails={pageDetails} data={user} />

      <Box mt={2}>
        <ContainerComponent>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <Button
                size="sm"
                variant="soft"
                sx={{
                  fontWeight: "normal",
                  textTransform: "uppercase",
                  fontSize: "11px",
                }}
                onClick={() => {
                  navigate(-1);
                }}
                startDecorator={<ArrowLeft size={14} />}
              >
                Back
              </Button>
              <Typography mt={2} sx={{ fontWeight: "bold", color: "maroon" }}>
                Choose which data to include in the report.
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography>Filter :</Typography>
              <Stack direction={"row"}>
                <Input
                  type="date"
                  size="sm"
                  value={dataDates?.from}
                  color="primary"
                  onChange={(e) => {
                    setDataDates((prev) => ({
                      ...prev,
                      from: e.target.value,
                    }));
                  }}
                />
                <Typography
                  level="body-xs"
                  sx={{
                    padding: "7px 0 0 0",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                >
                  to
                </Typography>
                <Input
                  type="date"
                  size="sm"
                  color="warning"
                  value={dataDates?.to}
                  onChange={(e) => {
                    setDataDates((prev) => ({
                      ...prev,
                      to: e.target.value,
                    }));
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </ContainerComponent>
      </Box>

      <Box mt={1}>
        <ContainerComponent>
          <Box mt={1} mb={2}>
            <Typography level="body-md" fontWeight={"bold"}>
              Set Fund cluster :
            </Typography>{" "}
            <Stack direction={"row"} spacing={1}>
              <Input
                sx={{ width: "400px" }}
                value={fundcluster}
                onFocus={() => {
                  if (fundcluster) {
                    setFundCluster("");
                  }
                }}
                onChange={(e) => {
                  setFundCluster(e.target.value);
                }}
                startDecorator={
                  <Button
                    color="warning"
                    startDecorator={<CloudDownload size={16} />}
                    size="sm"
                    sx={{ fontSize: "11px" }}
                    variant="outlined"
                    loading={load}
                    disabled={selection.size == 0}
                    loadingPosition="end"
                    onClick={() => {
                      const numberSets = extractLastNumberSet(selection);
                      const uniquePos = [...new Set(numberSets)];
                      setLoad(true);
                      fetchTagItemsFundClusters(uniquePos).then(
                        (FundCluster) => {
                          if (!FundCluster) {
                            swal(
                              "No Fund Cluster Found",
                              "Accounting/Budget hasn't assigned a fund cluster to this PO. You may: \n\n• Try again later \n• Manually enter the fund cluster if available",
                              "info"
                            );
                            setLoad(false);
                            return;
                          }
                          setFundCluster(FundCluster);

                          setLoad(false);
                        }
                      );
                    }}
                  >
                    Fetch from tagging
                  </Button>
                }
              />

              <Button
                sx={{
                  paddingX: "10px",
                  mt: 1,
                  fontSize: "11px",
                  textTransform: "uppercase",
                }}
                startDecorator={<ClipboardPenLine size={15} />}
                variant="outlined"
                disabled={selection.size == 0}
                onClick={() => setOpenManage(true)}
              >
                {" "}
                Manage Stock-No({selection.size})
              </Button>
              <Button
                sx={{
                  paddingX: "40px",
                  mt: 1,
                  fontSize: "11px",
                  textTransform: "uppercase",
                }}
                disabled={selection.size == 0}
                onClick={handlePrintRSMI}
              >
                {" "}
                Print {selection.size >= 1 && `Selection(${selection.size})`}
              </Button>

              {selection.size >= 1 && (
                <Button
                  sx={{
                    paddingX: "40px",
                    mt: 1,
                    fontSize: "11px",
                    textTransform: "uppercase",
                  }}
                  variant="soft"
                  color="danger"
                  onClick={() => {
                    setSelection(new Set());
                    setFundCluster("");
                  }}
                >
                  {" "}
                  Clear Selection
                </Button>
              )}
            </Stack>
          </Box>

          <PaginatedTable
            stripes="none"
            columns={IssuanceColumn}
            rows={displayRow()}
            actionBtns={
              <Box mt={1}>
                <Typography fontWeight={"bold"}>Find Area :</Typography>
                <Stack direction={"row"} spacing={2}>
                  <Input
                    placeholder="Search .."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Stack>
                {fetching && <LinearProgress sx={{ mt: 1 }} thickness={1} />}
              </Box>
            }
          />
        </ContainerComponent>
      </Box>
      <ModalComponent
        isOpen={openManage}
        handleClose={() => setOpenManage(false)}
        title={`Manage Stock-No`}
        description={"Manage masterlist stock no's"}
        content={
          <ManageMastlistSelection
            selection={selection}
            openManage={openManage}
            from={dataDates.from}
            to={dataDates.to}
          />
        }
        layout="fullscreen"
      />
    </div>
  );
};
