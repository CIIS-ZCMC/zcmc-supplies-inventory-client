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
function ViewTaggedPurchasedOrder(props) {
  const { getPOTagged } = usePOTaggingHooks();
  const { setSelectedPO } = useSelectedRow();
  const navigate = useNavigate();
  const [search, setSearch] = useState(null);
  const { PrintPurchaseOrders, OpenSmallWindow } = usePrintHooks();
  const { data, isLoading, error } = useQuery({
    queryKey: ["purchased_tagged"],
    queryFn: getPOTagged,
  });

  const purchaseORderData = search
    ? data.filter((x) => {
        return x.po_number.toLowerCase().includes(search.toLowerCase());
      })
    : data;
  return (
    <div>
      <PaginatedTable
        customAction={true}
        handleCustomAction={(perRow) => {
          return (
            <>
              <ButtonComponent
                startDecorator={<SquareArrowOutUpRight size={"1rem"} />}
                variant={"plain"}
                size="sm"
                onClick={() => {
                  setSelectedPO(perRow);
                  navigate(`${perRow.po_number}?viewingOnly=true`);
                }}
              />
              <ButtonComponent
                startDecorator={<MdOutlineLocalPrintshop size={"18px"} />}
                variant={"plain"}
                size="sm"
                color={"warning"}
                onClick={() => {
                  OpenSmallWindow(PrintPurchaseOrders(perRow.po_number));
                }}
              />
            </>
          );
        }}
        // viewable={true}
        // loading={isLoading}

        columns={PurchaseOrderHeaderView}
        rows={purchaseORderData}
        //actions={<ViewIcon />}
        btnLabel={"Add new item name"}
        actionBtns={
          <InputComponent
            placeholder={"Search for PO#"}
            value={search}
            setValue={setSearch}
          />
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
