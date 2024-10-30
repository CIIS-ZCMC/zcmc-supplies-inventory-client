import * as React from "react";
import { Table } from "@mui/joy";

import { SquareArrowOutUpRight } from "lucide-react";
import ButtonComponent from "../ButtonComponent";

export default function TableComponent({ tableHeader, tableData, onClick }) {
  return (
    <Table hoverRow borderAxis="both">
      <thead>
        <tr>
          {tableHeader.map(({ id, label }) => (
            <th key={id}>{label}</th>
          ))}
          <th style={{ textAlign: "center" }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <tr key={row.id}>
            {tableHeader.map(({ id }) => (
              <td key={id}>{row[id]}</td>
            ))}
            <td align="center">
              <ButtonComponent
                size={"sm"}
                onClick={onClick}
                startDecorator={<SquareArrowOutUpRight size={'1rem'} />}
                label={'View'}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}