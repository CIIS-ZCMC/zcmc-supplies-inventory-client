import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";
import {
  Card,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
} from "@mui/joy";
import { RiLoginCircleFill } from "react-icons/ri";
import useUserHook from "../../hooks/UserHook";
import { useNavigate } from "react-router-dom";
export default function CustomAuth() {
  const [loginLoad, setLoginLoad] = React.useState(false);

  // Create refs for inputs
  const usernameRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const navigate = useNavigate();
  const { signIn, reAuthenticate } = useUserHook();

  React.useEffect(() => {
    reAuthenticate().then((res) => {
      if (res.status !== 451) {
        navigate(-1);
      }
    });
  }, []);

  // Prevent auto-fill on component mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (usernameRef.current) {
        usernameRef.current.autocomplete = "new-username";
        usernameRef.current.setAttribute("readonly", "readonly");
      }
      if (passwordRef.current) {
        passwordRef.current.autocomplete = "new-password";
        passwordRef.current.setAttribute("readonly", "readonly");
      }

      // Remove readonly after a short delay
      setTimeout(() => {
        if (usernameRef.current)
          usernameRef.current.removeAttribute("readonly");
        if (passwordRef.current)
          passwordRef.current.removeAttribute("readonly");
      }, 100);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    setLoginLoad(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    signIn({
      username: data.username,
      password: data.password,
    }).then((res) => {
      setTimeout(() => {
        setLoginLoad(false);
        navigate("/dashboard");
      }, 1500);
    });
  };

  return (
    <CssVarsProvider>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          padding: "1rem",
        }}
      >
        <Card
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: "100%",
            maxWidth: 400,
            boxShadow: "lg",
            p: 3,
          }}
        >
          <Stack gap={2} mb={1}>
            <Typography
              level="body-sm"
              component="h2"
              textAlign="center"
              sx={{ textTransform: "uppercase", marginBottom: "-15px" }}
            >
              Supplies inventory system
            </Typography>
            <Typography
              level="h4"
              component="h4"
              textAlign="center"
              sx={{ textTransform: "uppercase", color: "#273F4F" }}
            >
              Sign in
            </Typography>
          </Stack>

          <Stack gap={2}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                inputRef={usernameRef}
                required
                placeholder="mms.zcmc@gmail.com"
                autoComplete="off"
                // Additional anti-autofill techniques
                data-lpignore="true"
                data-form-type="other"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                inputRef={passwordRef}
                required
                placeholder="•••••••"
                autoComplete="new-password"
                // Additional anti-autofill techniques
                data-lpignore="true"
                data-form-type="other"
              />
            </FormControl>
          </Stack>

          {/* Hidden inputs as decoys */}
          <input
            type="text"
            name="prevent_autofill"
            style={{ display: "none" }}
            tabIndex="-1"
          />
          <input
            type="password"
            name="password_fake"
            style={{ display: "none" }}
            tabIndex="-1"
          />

          <Stack gap={1} mt={3}>
            <Button
              sx={{
                padding: "10px",
                letterSpacing: loginLoad ? "1px" : "5px",
                fontWeight: "900",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "md",
                },
              }}
              fullWidth
              color="primary"
              endDecorator={<RiLoginCircleFill fontSize={20} />}
              type="submit"
              loading={loginLoad}
              loadingPosition="end"
            >
              {loginLoad ? "LOGGING IN" : "LOGIN"}
            </Button>
          </Stack>
        </Card>
      </div>
    </CssVarsProvider>
  );
}
