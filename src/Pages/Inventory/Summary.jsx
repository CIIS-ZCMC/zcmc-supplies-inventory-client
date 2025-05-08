import React from "react";

export const Summary = ({ data }) => {
  if (!data || typeof data !== "object") return null;

  const entries = Object.entries(data);
  const midpoint = Math.ceil(entries.length / 2);
  const firstHalf = entries.slice(0, midpoint);
  const secondHalf = entries.slice(midpoint);

  const renderRows = (pairs) =>
    pairs.map(([key, value]) => (
      <tr key={key}>
        <td style={{ padding: "5px", fontWeight: "500" }}>
          <strong>{key}:</strong>
        </td>
        <td
          style={{
            padding: "5px",
            textAlign: "left",
            borderBottom: "1px solid #ccc",
          }}
        >
          {value === null || value === "" ? "—" : value}
        </td>
      </tr>
    ));

  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        {/* Left Column */}
        <div style={{ flex: "1 1 48%" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11px",
            }}
          >
            <tbody>{renderRows(firstHalf)}</tbody>
          </table>
        </div>

        {/* Right Column */}
        <div style={{ flex: "1 1 48%" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11px",
            }}
          >
            <tbody>{renderRows(secondHalf)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
