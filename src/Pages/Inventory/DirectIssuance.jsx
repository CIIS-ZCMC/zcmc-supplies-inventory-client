import React, { useState, useEffect } from "react";
import Header from "../../Layout/Header/Header";
import { user } from "../../Data";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import {
  Autocomplete,
  Box,
  Button,
  Input,
  Stack,
  Table,
  Textarea,
  Typography,
} from "@mui/joy";
import {
  CirclePlus,
  Delete,
  FileDown,
  FolderDown,
  RefreshCcwDot,
  RotateCw,
} from "lucide-react";
import useAreasHook from "../../Hooks/AreasHook";
import useSuppliersHook from "../../Hooks/SuppliersHook";
import moment from "moment";
import usePrintHooks from "../../Hooks/PrintHooks";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import PaginatedTable from "../../Components/Table/PaginatedTable";
export const DirectIssuance = () => {
  const {
    suppliersList,
    getSuppliers,
    getGeneratedDirectIssuance,
    issuanceList,
    getDataDI,
  } = useSuppliersHook();
  const { Arealist, getAreas } = useAreasHook();
  const { OpenSmallWindow, postPrint } = usePrintHooks();
  const [openLoad, setOpenLoad] = useState(false);

  const emptyList = {
    key: 0,
    obligation: "",
    risno: "",
    creditor: "",
    pono: "",
    amount: "",
    transferto: "",
  };
  const [title, setTitle] = useState(() => {
    const saved = localStorage.getItem("issuanceTitle");
    return saved ? saved : ``;
  });
  const [tableData, setTableData] = useState(() => {
    const saved = localStorage.getItem("directIssuanceData");
    return saved ? JSON.parse(saved) : [emptyList];
  });
  useEffect(() => {
    getSuppliers();
    getAreas();
  }, []);

  useEffect(() => {
    if (openLoad) {
      getGeneratedDirectIssuance();
    }
  }, [openLoad]);
  useEffect(() => {
    localStorage.setItem("issuanceTitle", title);
  }, [title]);
  useEffect(() => {
    localStorage.setItem("directIssuanceData", JSON.stringify(tableData));
  }, [tableData]);
  const handleAddRow = () => {
    setTableData((prev) => [
      ...prev,
      {
        ...emptyList,
        key: prev?.length > 0 ? prev[prev?.length - 1].key + 1 : 0, // unique key
      },
    ]);
  };
  const handleReset = () => {
    setTableData([emptyList]);
    localStorage.setItem("directIssuanceData", JSON.stringify(emptyList));
  };
  const handleChange = (key, entity, value) => {
    setTableData((prev) => {
      const index = prev.findIndex((row) => row.key === key);
      if (index !== -1) {
        return prev.map((row) =>
          row.key === key ? { ...row, [entity]: value } : row
        );
      } else {
        return [...prev, { key, [entity]: value }];
      }
    });
  };

  const handleDeleteRow = (keyToDelete) => {
    console.log(keyToDelete);
    setTableData((prev) => prev.filter((row) => row.key !== keyToDelete));
  };

  const handleGenerate = () => {
    if (title == "") {
      swal("Please add title", "title description is required", "warning");
      return;
    }

    if (issuanceList.some((x) => x.title == title)) {
      console.log(tableData.some((x) => x.title == title));
      if (!tableData.some((x) => x.title == title)) {
        swal(
          "Duplicate Title Detected",
          "The title you entered already exists. Please create a new and unique title to save these records.",
          "warning"
        );
        return;
      }
    }

    postPrint("printDirectIssuances", {
      tableData: tableData,
      title: title,
    }).then((printPath) => {
      OpenSmallWindow(printPath);
    });
  };

  const pageDetails = {
    title: "Direct Issuance Generation",
    description: "See the list of items.",
    pagePath: "/inventory",
  };
  return (
    <div>
      <Header pageDetails={pageDetails} data={user} />
      <Box mt={2}>
        <ContainerComponent>
          <Typography></Typography>
          <Box mt={2} mb={2}>
            <Textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minRows={2}
              placeholder="During the month of June"
            />
          </Box>

          <Stack direction={"row"} justifyContent={"space-between"} spacing={1}>
            <Stack direction={"row"} spacing={1}>
              <Button
                variant="soft"
                endDecorator={<CirclePlus size={17} />}
                sx={{ fontWeight: "normal" }}
                onClick={() => handleAddRow()}
              >
                Add row
              </Button>
              <Button
                variant="soft"
                color="danger"
                endDecorator={<RefreshCcwDot size={17} />}
                sx={{ fontWeight: "normal" }}
                onClick={() => handleReset()}
              >
                Reset
              </Button>
            </Stack>

            <Box>
              <Button
                variant="soft"
                color="success"
                endDecorator={<FolderDown size={17} />}
                sx={{
                  fontWeight: "normal",
                }}
                onClick={() => {
                  setOpenLoad(true);
                }}
              >
                Load Saved report
              </Button>
            </Box>
          </Stack>

          <Table size="sm" sx={{ mt: 2 }}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Obligation</th>
                <th style={{ width: "10%" }}>RIS No.</th>
                <th style={{ width: "30%" }}>Name of Creditors</th>
                <th style={{ width: "10%" }}>P.O No.</th>
                <th style={{ width: "10%" }}>Amount</th>
                <th style={{ width: "25%" }}>Transfer to</th>
                <th style={{ width: "5%" }}></th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Input
                      fullWidth
                      placeholder="Type value ..."
                      sx={{ fontSize: 14 }}
                      value={row.obligation}
                      onChange={(e) =>
                        handleChange(row.key, "obligation", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Input
                      fullWidth
                      placeholder="Type value ..."
                      sx={{ fontSize: 14 }}
                      value={row.risno}
                      onChange={(e) =>
                        handleChange(row.key, "risno", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Autocomplete
                      options={suppliersList?.map((row) => row.supplier_name)}
                      value={row.creditor}
                      onChange={(_, newValue) =>
                        handleChange(row.key, "creditor", newValue)
                      }
                    />
                  </td>
                  <td>
                    <Input
                      fullWidth
                      placeholder="__-__-____"
                      sx={{ fontSize: 14 }}
                      value={row.pono}
                      onChange={(e) =>
                        handleChange(row.key, "pono", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Input
                      fullWidth
                      type="number"
                      placeholder="0.00"
                      sx={{ fontSize: 14 }}
                      value={row.amount}
                      onChange={(e) =>
                        handleChange(row.key, "amount", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Autocomplete
                      options={Arealist?.map((row) => row.area_name)}
                      value={row.transferto}
                      onChange={(_, newValue) =>
                        handleChange(row.key, "transferto", newValue)
                      }
                    />
                  </td>
                  <td>
                    {tableData?.length > 1 && (
                      <Delete
                        color="#DC3C22"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteRow(row.key)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: 2 }}>
            {" "}
            <Button
              endDecorator={<FileDown size={18} />}
              onClick={handleGenerate}
            >
              Save & Generate
            </Button>
          </Box>
        </ContainerComponent>

        <ModalComponent
          isOpen={openLoad}
          handleClose={() => setOpenLoad(false)}
          title="Load saved reports"
          description={"Reload previous generated reports"}
          content={
            <>
              <PaginatedTable
                columns={[
                  {
                    id: "key", // or any field name
                    label: "#",
                    width: "5%",
                    render: (row, index) => {
                      return index + 1;
                    },
                  },
                  { id: "title", label: "Item Name", width: "30%" },
                  { id: "actions", label: "Actions", width: "20%" },
                ]}
                rows={issuanceList}
                customAction={true}
                handleCustomAction={(row) => {
                  return (
                    <Button
                      variant="soft"
                      color="warning"
                      sx={{
                        fontSize: 12,
                        fontWeight: "normal",
                        textTransform: "uppercase",
                      }}
                      fullWidth
                      endDecorator={<RotateCw size={15} />}
                      onClick={() => {
                        getDataDI(row).then((res) => {
                          setTableData(res.data);
                          setOpenLoad(false);
                        });
                      }}
                    >
                      Load data
                    </Button>
                  );
                }}
              />
            </>
          }
        />
      </Box>
    </div>
  );
};
