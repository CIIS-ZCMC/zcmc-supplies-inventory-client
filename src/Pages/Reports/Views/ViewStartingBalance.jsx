import React, { useEffect } from "react";
import Header from "../../../Layout/Header/Header";
import { user } from "../../../Data/index";
import useSelectedRow from "../../../Store/SelectedRowStore";
import ContainerComponent from "../../../Components/Container/ContainerComponent";
import PaginatedTable from "../../../Components/Table/PaginatedTable";
import { Stack, Typography, Box, Divider, Input } from "@mui/joy";
import ButtonComponent from "../../../Components/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import useStartingBalanceHook from "../../../Hooks/StartingBalanceHooks";
import StartingBalanceStepper from "./StartingBalStepper";
import useReportsHook from "../../../Hooks/ReportsHook";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
function ViewStartingBalance(props) {
  const { selectedRow, selectedItem } = useSelectedRow();
  const { getSupplyBalances, updateStartingBalance, deleteStartingBalance } =
    useStartingBalanceHook();
  const { generateReport } = useReportsHook();

  const pageDetails = {
    pageTitle: `Viewing "${selectedRow?.supply_name}"`,
    title: "Reports",
    description: "Starting balance per year.",
    pagePath: "/reports/starting-balance",
    subTitle: "Viewing Starting Balance",
    subPath: null,
  };

  const startingBalancesHeader = [
    // {
    //   // id: "id",
    //   label: "#",
    //   width: "5%",
    // },
    { id: "is_IAR", label: "Receiving (IAR)" },
    { id: "balance_date", label: "Year" },
    { id: "month", label: "Month" },
    { id: "source_name", label: "Source" },
    {
      id: "key",
      label: "History ( RIS )",
      render: (row, index) => {
        return (
          <>
            {row.inventoryTransactionLog.length ? (
              <StartingBalanceStepper row={row} />
            ) : (
              <Divider>
                {" "}
                <Typography level="body-xs" fontSize={9} textColor={"#94B4C1"}>
                  NO RECORDS FOUND
                </Typography>
              </Divider>
            )}
          </>
        );
      },
    },
    {
      id: "quantity",
      label: "Starting Balance",
      render: (row, index) => {
        return (
          <>
            <Input
              type="number"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  const value = event.target.value;
                  swal({
                    title: "Are you sure?",
                    text: "Please confirm if you want to update the starting balance.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  }).then((Update) => {
                    if (Update) {
                      updateStartingBalance(
                        {
                          quantity: value,
                        },
                        row.id
                      ).then((response) => {
                        if (response?.status === 200) {
                          swal(
                            "Changes Saved",
                            "Starting balance updated successfully!",
                            "success"
                          );
                        }
                      });
                    }
                  });
                }
              }}
              startDecorator={<CiEdit />}
              sx={{
                fontWeight: "bold",
                color: "#7E99A3",
                fontSize: "25px",
                "--Input-radius": "0px",
                borderBottom: "2px solid",
                borderColor: "neutral.outlinedBorder",
                "&:hover": {
                  borderColor: "neutral.outlinedHoverBorder",
                },
                "&::before": {
                  border: "1px solid var(--Input-focusedHighlight)",
                  transform: "scaleX(0)",
                  left: 0,
                  right: 0,
                  bottom: "-2px",
                  top: "unset",
                  transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                  borderRadius: 0,
                },
                "&:focus-within::before": {
                  transform: "scaleX(1)",
                },
              }}
              slotProps={{
                input: {
                  style: {
                    textAlign: "center",
                    textTransform: "uppercase",
                  },
                },
              }}
              placeholder={row.quantity}
            />
          </>
        );
      },
    },
    // { id: "actions", label: "Actions", width: "10%" },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["suppliesStartingBal", selectedRow?.id],
    queryFn: () => getSupplyBalances(selectedRow?.id),
  });

  useEffect(() => {
    getSupplyBalances(selectedRow?.id);
  }, []);

  return (
    <div>
      <Header pageDetails={pageDetails} data={user} />

      <ContainerComponent>
        <PaginatedTable
          viewable={false}
          tableTitle={
            <>
              <Typography level="body-lg" fontWeight={"bold"}>
                Starting Balance
              </Typography>
            </>
          }
          //tableDesc={"A single item can have multiple brands, suppliers, expiry dates and more."}
          loading={isLoading}
          columns={startingBalancesHeader}
          rows={data}
          actionBtns={
            <Stack direction="row" spacing={1} mt={2}>
              <ButtonComponent
                variant={"outlined"}
                label="Generate report"
                size="lg"
                onClick={() =>
                  generateReport(
                    selectedRow?.supply_name,
                    data.map((x) => {
                      return {
                        Month: x.month,
                        Year: x.balance_date,
                        "Supply Name": x.supply_name,
                        Source: x.source_name,
                        "Starting Balance": x.TotalQty,
                      };
                    })
                  )
                }
              />

              {/* <ButtonComponent
                endDecorator={
                  <IoAddCircleOutline style={{ fontSize: "17px" }} />
                }
                variant={"solid"}
                label="New"
                size="lg"
                onClick={() => {}}
              /> */}
            </Stack>
          }
          customAction={true}
          handleCustomAction={(row) => {
            return (
              <ButtonComponent
                variant={"plain"}
                color="danger"
                size="sm"
                label={<RiDeleteBin5Line style={{ fontSize: "18px" }} />}
                onClick={() => {
                  swal({
                    title: "Are you sure?",
                    text: "Please confirm if you want to delete this starting balance.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  }).then((Delete) => {
                    if (Delete) {
                      deleteStartingBalance(row.id).then((response) => {
                        if (response?.status === 204) {
                          getSupplyBalances(selectedRow?.id);
                          swal(
                            "Changes Saved",
                            "Starting balance deleted successfully!",
                            "success"
                          );
                        }
                      });
                    }
                  });
                }}
              />
            );
          }}
        />
        <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
          <Stack direction={"column"}>
            <Typography level="body-xs">
              Overall quantity in records :
            </Typography>
            <Typography
              level="body-lg"
              fontWeight={"bold"}
              sx={{ color: "#273F4F", borderRadius: "10px", padding: "6px" }}
              textAlign={"center"}
            >
              {data && data[0]?.TotalQty}
            </Typography>
          </Stack>
        </Box>
      </ContainerComponent>
    </div>
  );
}

export default ViewStartingBalance;
