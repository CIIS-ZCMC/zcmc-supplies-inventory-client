import { Typography } from "@mui/joy";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import Radio, { radioClasses } from "@mui/joy/Radio";
import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { TbDownload } from "react-icons/tb";

function RadioButtonComponent({ actions }) {
  return (
    <RadioGroup
      aria-label="platform"
      defaultValue="Website"
      overlay
      name="platform"
      sx={{
        flexDirection: "row",
        gap: 2,
        [`& .${radioClasses.checked}`]: {
          [`& .${radioClasses.action}`]: {
            inset: -1,
            border: "3px solid",
          },
        },
      }}
    >
      {actions.map(({ label, color, icon }, key) => (
        <Sheet
          key={key}
          variant="outlined"
          sx={{
            borderRadius: "md",
            boxShadow: "sm",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            width: "100%",

            [`&.${radioClasses.checked}`]: {
              backgroundColor: `var(--joy-palette-${color}-100)`, // Light background color
            },
          }}
        >
          <Radio
            color={color}
            value={label}
            checkedIcon={<MdCheckCircleOutline />}
            sx={{
              [`& .${radioClasses.checked}`]: {
                [`& .${radioClasses.action}`]: {
                  borderColor: `var(--joy-palette-${color}-500)`, // Set dynamic border color for checked state
                },
              },
              [`& .${radioClasses.radio}`]: {
                display: "contents",
                "& > svg": {
                  display: "none",
                },
              },
            }}
          />
          {icon}
          <Typography
            color={color}
            level="title-sm"
            mt={1}
            textAlign={"center"}
          >
            {label}
          </Typography>
        </Sheet>
      ))}
    </RadioGroup>
  );
}

export default RadioButtonComponent;
