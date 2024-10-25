import "./App.css";
import AnimatedRoutes from "./Routes/AnimatedRoutes";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        custom: {
          main: "#061323",
          light: "#0A223E",
          lighter: "#E5FBF5",
          lightBg: "#F2F8F6",
          buttonBg: "#0E5844",
          active: "rgba(249, 250, 251, 0.12)",
        },
      },
    },
  },
  components: {
    JoyButton: {
      defaultProps: {
        variant: "solid",
        color: "primary",
      },
    },
  },
  fontFamily: {
    display: "Poppins", // applies to `h1`–`h4`
    body: "Poppins", // applies to `title-*` and `body-*`
  },
});
function App() {
  return (
    <CssVarsProvider theme={theme}>
      <AnimatedRoutes />
    </CssVarsProvider>
  );
}

export default App;
