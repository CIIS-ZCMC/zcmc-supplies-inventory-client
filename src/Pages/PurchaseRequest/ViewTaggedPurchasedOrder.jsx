import React, { useState } from "react";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import { PurchaseOrderHeaderView } from "../../Data/TableHeader";
import usePOTaggingHooks from "../../Hooks/POTaggingHook";
import { useQuery } from "@tanstack/react-query";
import ButtonComponent from "../../Components/ButtonComponent";
import { SquareArrowOutUpRight } from "lucide-react";
import useSelectedRow from "../../Store/SelectedRowStore";
import { useNavigate } from "react-router-dom";
import InputComponent from "../../Components/Form/InputComponent";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import usePrintHooks from "../../Hooks/PrintHooks";
import { BASE_URL } from "../../Services/Config";
import { Box, Button, Input, Stack, Typography } from "@mui/joy";
import { RefreshCcwDot } from "lucide-react";

function ViewTaggedPurchasedOrder(props) {
  const { getPOTagged, resyncCAFRecords, taggedRecords } = usePOTaggingHooks();
  const { setSelectedPO } = useSelectedRow();
  const [load, setLoad] = useState([]);
  const [tableData, setTableData] = useState(taggedRecords);
  const navigate = useNavigate();
  const [search, setSearch] = useState(null);
  const { PrintPurchaseOrders, OpenSmallWindow } = usePrintHooks();
  const { data, isLoading, error } = useQuery({
    queryKey: ["purchased_tagged"],
    queryFn: getPOTagged,
  });

  const purchaseORderData = search
    ? tableData.filter((x) => {
        return x.po_number.toLowerCase().includes(search.toLowerCase());
      })
    : tableData;
  return (
    <div>
      <PaginatedTable
        customAction={true}
        handleCustomAction={(perRow) => {
          return (
            <Stack direction={"row"} spacing={1}>
              <ButtonComponent
                label={<SquareArrowOutUpRight size={"1rem"} />}
                variant={"plain"}
                size="sm"
                onClick={() => {
                  setSelectedPO(perRow);
                  navigate(`${perRow.po_number}?viewingOnly=true`);
                }}
              />

              <ButtonComponent
                label={<MdOutlineLocalPrintshop size={"18px"} />}
                variant={"plain"}
                size="sm"
                color={"warning"}
                onClick={() => {
                  OpenSmallWindow(PrintPurchaseOrders(perRow.po_number));
                }}
              />
              <Button
                startDecorator={<RefreshCcwDot size={16} />}
                variant={"plain"}
                size="sm"
                color={"danger"}
                loading={load?.includes(perRow.id)}
                loadingPosition="start"
                onClick={() => {
                  setLoad((prev) => [...prev, perRow.id]);
                  resyncCAFRecords(perRow.id).then((res) => {
                    if (res.status === 200) {
                      console.log(res.data.data);
                      swal("Success", "Resynced Successfully", "success");
                      setTableData((prev) =>
                        prev.map((item) =>
                          item.id === perRow.id
                            ? { ...item, ...res.data.data }
                            : item
                        )
                      );
                      setLoad((prev) => prev.filter((id) => id !== perRow.id));
                    } else {
                      swal(
                        "Up to Date",
                        "Fund Cluster and CAF Number are already up to date.",
                        "info"
                      );

                      setLoad((prev) => prev.filter((id) => id !== perRow.id));
                    }
                  });
                }}
              >
                <Typography
                  color={"danger"}
                  level="body-xs"
                  textTransform={"uppercase"}
                  fontSize={11}
                >
                  Resync ( Fund Cluster & CAF-no )
                </Typography>
              </Button>
            </Stack>
          );
        }}
        // viewable={true}
        // loading={isLoading}

        columns={PurchaseOrderHeaderView}
        rows={purchaseORderData}
        //actions={<ViewIcon />}
        btnLabel={"Add new item name"}
        actionBtns={
          <Box mt={1}>
            <Input
              placeholder={"Search for PO#"}
              value={search}
              setValue={setSearch}
            />
          </Box>
        }

        // label={"Fill-up your inventory by creating a New item"}
        // desc={`Your inventory is currently empty. To manage it, you’ll need to add items. You can use
        //     inventory items in filling-up IARs and RIS requests.`}
        // btn={<ButtonComponent label={"Create new item"} onClick={"/"} />}
      />
    </div>
  );
}

export default ViewTaggedPurchasedOrder;
