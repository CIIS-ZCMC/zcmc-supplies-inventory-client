import React from "react";
import Header from "../../../Layout/Header/Header";
import { user } from "../../../Data/index";
import useSelectedRow from "../../../Store/SelectedRowStore";
import ContainerComponent from "../../../Components/Container/ContainerComponent";
import PaginatedTable from "../../../Components/Table/PaginatedTable";
import { Stack, Typography, Box } from "@mui/joy";
import ButtonComponent from "../../../Components/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import useStartingBalanceHook from "../../../Hooks/StartingBalanceHooks";
import { startingBalancesHeader } from "../../../Data/TableHeader";
import useReportsHook from "../../../Hooks/ReportsHook";
function ViewStartingBalance(props) {
  const { selectedRow, selectedItem } = useSelectedRow();
  const { getSupplyBalances } = useStartingBalanceHook();
  const { generateReport } = useReportsHook();

  const pageDetails = {
    pageTitle: `Viewing "${selectedRow?.supply_name}"`,
    title: "Reports",
    description: "Starting balance per year.",
    pagePath: "/reports/starting-balance",
    subTitle: "Viewing Starting Balance",
    subPath: null,
  };

  console.log(selectedRow);

  const { data, isLoading, error } = useQuery({
    queryKey: ["suppliesStartingBal", selectedRow?.id],
    queryFn: () => getSupplyBalances(selectedRow?.id),
  });

  console.log(data);
  return (
    <div>
      <Header pageDetails={pageDetails} data={user} />

      <ContainerComponent>
        <PaginatedTable
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
            </Stack>
          }
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
