import React, { useEffect, useState } from "react";
import useSuppliesHook from "../../Hooks/SuppliesHook";
import { Input, Table } from "@mui/joy";
import { PencilLine } from "lucide-react";
export const ManageMastlistSelection = ({
  selection,
  openManage,
  from,
  to,
}) => {
  const getStocksNos = useSuppliesHook((state) => state.getStocksNos);
  const Stock_Numbers = useSuppliesHook((state) => state.Stock_Numbers);
  const updateItemStockNo = useSuppliesHook((state) => state.updateItemStockNo);
  const [stockNumbers, setStockNumbers] = useState();
  useEffect(() => {
    if (openManage) {
      getStocksNos({
        data: Array.from(selection),
        from: from,
        to: to,
      }).then((res) => setStockNumbers(res.data.data));
    }
  }, [openManage]);

  const handleUpdateStock = (id, value) => {
    updateItemStockNo({
      id: id,
      update: {
        stock_no: value,
      },
    }).then((res) => {
      if (res.status !== 200) {
        swal(
          "Update failed",
          "Stock no already exists in our records.",
          "error"
        );
      }
      getStocksNos({
        data: Array.from(selection),
        from: from,
        to: to,
      }).then((res) => setStockNumbers(res.data.data));
    });
  };

  const handleChange = (id, value) => {
    setStockNumbers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock_no: value } : item))
    );
  };

  return (
    <div>
      <Table
        size="sm"
        variant="soft"
        color="default"
        stripe={"odd"}
        borderAxis="x"
        sx={{
          "& thead th:nth-child(1)": { width: "40%" },
          fontSize: "11px",
        }}
      >
        <thead>
          <tr>
            <th>ITEM NAME</th>
            <th>Unit</th>
            <th>Stock No</th>
          </tr>
        </thead>
        <tbody>
          {stockNumbers?.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.itemdesc}</td>
                <td>{row.unit}</td>

                <td>
                  <Input
                    fullWidth
                    sx={{ "--Input-decoratorChildHeight": "100%" }} // Optional: adjusts decorator height if needed
                    slotProps={{
                      input: {
                        style: { textAlign: "center", fontSize: "12px" }, // Properly target the input element
                      },
                    }}
                    value={row.stock_no}
                    placeholder={
                      row.PK_iwItems === row.stock_no
                        ? `System Default : ${row.stock_no}`
                        : row.stock_no
                    }
                    // value={row.stock_no}
                    startDecorator={
                      <PencilLine
                        size={17}
                        style={{
                          padding: "5px",
                          borderRadius: "2px",
                        }}
                      />
                    }
                    onChange={(e) => handleChange(row.id, e.target.value)}
                    onBlur={(e) => {
                      handleUpdateStock(row.id, e.target.value);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
