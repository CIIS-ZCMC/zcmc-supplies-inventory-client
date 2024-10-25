import { BiFile, BiMoney } from "react-icons/bi";
import { BsViewStacked } from "react-icons/bs";
import { FcDocument } from "react-icons/fc";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { TbDownload } from "react-icons/tb";

const iconStyles = {
  fontSize: 20,
};

export const approvalActions = [
  {
    label: "Receive",
    color: "success",
    icon: (
      <TbDownload
        style={{ ...iconStyles, color: "var(--joy-palette-success-500)" }}
      />
    ),
  },
  {
    label: "Return",
    color: "warning",
    icon: (
      <IoReturnUpBackOutline
        style={{ ...iconStyles, color: "var(--joy-palette-warning-500)" }}
      />
    ),
  },
  {
    label: "Cancel",
    color: "danger",
    icon: (
      <MdOutlineCancel
        style={{ ...iconStyles, color: "var(--joy-palette-danger-500)" }}
      />
    ),
  },
];

export const procurementModes = [
  {
    label: "Competitive bidding",
    icon: (
      <BiMoney
        style={{ ...iconStyles, color: "var(--joy-palette-success-500)" }}
      />
    ),
    color: "success",
  },
  {
    label: "Alternative mode",
    icon: (
      <BiFile
        style={{ ...iconStyles, color: "var(--joy-palette-primary-500)" }}
      />
    ),
    color: "primary",
  },
];
