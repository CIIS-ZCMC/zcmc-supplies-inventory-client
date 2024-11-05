import "./App.css";
import AnimatedRoutes from "./Routes/AnimatedRoutes";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        custom: {
          main: "#061323",
          light: "#0A223E",
          lighter: "#E5FBF5",
          lightBg: "#F2F8F6",
          buttonBg: "#1D70BC",
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
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider theme={theme}>
        <AnimatedRoutes />
      </CssVarsProvider>
    </QueryClientProvider>

  );
}

export default App;
