import * as React from "react";
import Button from "@mui/joy/Button";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";

function ToggleGroupComponent({ options = [], defaultValue }) {
  const [value, setValue] = React.useState(defaultValue);
  const [variant] = React.useState("outlined");
  const [color] = React.useState("neutral");

  return (
    <ToggleButtonGroup
      variant={variant || undefined}
      color={color || undefined}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      {options?.map(({ name, key }, index) => (
        <Button
          value={key}
          key={index}
          sx={{ fontWeight: 400, py: 1, fontSize: 13 }}
        >
          {name}
        </Button>
      ))}
    </ToggleButtonGroup>
  );
}
export default ToggleGroupComponent;
