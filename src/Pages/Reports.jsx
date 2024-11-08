import React, { Fragment, useEffect } from "react";
import { user } from "../Data/index";
import Header from "../Layout/Header/Header";
import ContainerComponent from "../Components/Container/ContainerComponent";
import PaginatedTable from "../Components/Table/PaginatedTable";
import {
  Box,
  Divider,
  Stack,
  TabList,
  Tabs,
  Typography,
  useTheme,
} from "@mui/joy";
import ButtonComponent from "../Components/ButtonComponent";
import TabComponent from "../Components/TabComponent";
import TableComponent from "../Components/Table/TableComponent";
import {
  consumedHeader,
  disposalHeader,
  itemHeader,
  nearExpHeader,
  reorderHeader,
  startingBalHeader,
  sufficientHeader,
  unconsumedHeader,
  zeroStocksHeader,
} from "../Data/TableHeader";
import useReportsHook from "../Hooks/ReportsHook";

function Reports(props) {
  const theme = useTheme();
  const {
    item_count,
    starting_bal,
    near_exp,
    zero_stocks,
    consumed,
    sufficient_sup,
    unconsumed,
    reorder,
    disposal,
    getItemCount,
    getStartingBal,
    getNearExp,
    getZeroStocks,
    getConsumed,
    getSufficient,
    getUnconsumed,
    getReorder,
    getDisposal,
  } = useReportsHook();
  const pageDetails = {
    title: "Reports",
    description:
      "Generate different types of reports here on-demand to fit your data-intensive requirements.",
    pagePath: "/reports",
  };

  const tabsData = [
    {
      label: "Item count",
      content: <TableComponent columns={itemHeader} rows={item_count} />,
      desc: "the number of balances and consumption.",
    },
    {
      label: "Starting balance",
      content: (
        <TableComponent columns={startingBalHeader} rows={starting_bal} />
      ),
      desc: "starting balance of 0 upon start of the year.",
    },
    {
      label: "Near expiration date",
      content: <TableComponent columns={nearExpHeader} rows={near_exp} />,
      desc: "less than 4 months remaining prior date of expiry.",
    },
    {
      label: "Zero stocks",
      content: <TableComponent columns={zeroStocksHeader} rows={zero_stocks} />,
      desc: "zero starting balance, no IAR up to this moment and with zero current balance.",
    },
    {
      label: "Most consumed items",
      content: <TableComponent columns={consumedHeader} rows={consumed} />,
      desc: "its number of average monthly consumption",
    },
    {
      label: "Items with sufficient stocks",
      content: (
        <TableComponent columns={sufficientHeader} rows={sufficient_sup} />
      ),
      desc: "those with sufficient stocks having months left to consume of greater than 5 months",
    },
    {
      label: "Unconsumed without RIS",
      content: <TableComponent columns={unconsumedHeader} rows={unconsumed} />,
      desc: "those with sufficient stocks having months left to consume of greater than 5 months but with no RIS requests",
    },
    {
      label: "Reorder items",
      content: <TableComponent columns={reorderHeader} rows={reorder} />,
      desc: "those below the 7-month threshold (number of months left to consume)",
    },
    {
      label: "For disposal",
      content: <TableComponent columns={disposalHeader} rows={disposal} />,
      desc: "those marked on RIS requests with assigned office to WMR.",
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      getItemCount();
      getStartingBal();
      getNearExp();
      getZeroStocks();
      getConsumed();
      getSufficient();
      getUnconsumed();
      getReorder();
      getDisposal();
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [
    getItemCount,
    getStartingBal,
    getNearExp,
    getZeroStocks,
    getConsumed,
    getSufficient,
    getUnconsumed,
    getReorder,
    getDisposal,
  ]);
  return (
    <Fragment>
      <Header pageDetails={pageDetails} data={user} />
      <ContainerComponent
        marginTop={30}
        title={"System-generated reports"}
        description={`See how resource supplies were accumulated, consumed and moved in
              your organization’s inventory.`}
        actions={
          <Stack direction="row" spacing={1}>
            <ButtonComponent
              variant={"outlined"}
              label={"View report sumamry"}
            />
            <ButtonComponent label={"Generate report"} />
          </Stack>
        }
      >
        <TabComponent tabs={tabsData} withTabDesc />
      </ContainerComponent>
    </Fragment>
  );
}

export default Reports;
