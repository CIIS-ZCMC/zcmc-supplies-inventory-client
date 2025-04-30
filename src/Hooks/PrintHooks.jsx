import { create } from "zustand";
import * as XLSX from "xlsx";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";
import moment from "moment";
import { BASE_URL } from "../Services/Config";
import swal from "sweetalert";
const BasedAddress = BASE_URL.production.replace(/\/api$/, "");
const usePrintHooks = create((set) => ({
  OpenSmallWindow: (url) => {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const screenHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    const newWindow = window.open(
      url,
      "_blank",
      `width=${screenWidth},height=${screenHeight},top=0,left=0,resizable=yes,scrollbars=yes`
    );
    if (newWindow) {
      newWindow.focus();
    } else {
      swal(
        "Print Failed",
        "Pop up was blocked or Something really went wrong",
        "error"
      );
    }
  },
  PrintPurchaseOrders: (po_number) => {
    return `${BASE_URL.production}/${API.PRINT_GUARD}/purchased_orders/${po_number}`;
  },
  PrintIARTransmittal: (selectedIARs) => {
    return `${BASE_URL.production}/${API.PRINT_GUARD}/IAR_transmittal/${selectedIARs}`;
  },
  printStockCard: (stockID) => {
    return `${BASE_URL.production}/${API.PRINT_GUARD}/stockCard/${stockID}`;
  },
  printStockCardBulk: () => {
    return `${BASE_URL.production}/${API.PRINT_GUARD}/stockCardBulk/1`;
  },
  printMonthlyDistReport: () => {
    return `${BASE_URL.production}/${API.PRINT_GUARD}/monthlyDistReport/1`;
  },
}));
export default usePrintHooks;
