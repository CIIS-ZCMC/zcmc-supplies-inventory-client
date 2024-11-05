import { Box, Stack, styled, Typography, useTheme } from "@mui/joy";
import { sidebarRoutes } from "../Routes/PageRoutes";
import { isActive } from "../Utils/PathChecker";
import { Link } from "react-router-dom";
import BrandLogo from "../Components/Sidebar/BrandLogo";

function Sidebar() {
  const theme = useTheme();
  const color = theme.palette.custom;

  const CustomLink = styled(({ ...props }) => <Link {...props} />)(
    ({ theme, path }) => ({
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(2), // Adjusted for better spacing
      padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
      textDecoration: "none",
      color: "white",
      // fontWeight: isActive(path.replace("/", "")) ? 600 : 400,
      // backgroundColor: isActive(path.replace("/", ""))
      //   ? color.active
      //   : "transparent",
      borderRadius: 10,
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: color.hover || "rgba(255, 255, 255, 0.1)",
      },
    })
  );

  return (
    <Stack
      p={{ xs: 1.5, sm: 2.5 }} // Responsive padding
      sx={{ height: "100%", overflowY: "auto" }} // Ensure it scrolls if needed
    >
      <BrandLogo />
      <Stack mt={4} gap={1}>
        {sidebarRoutes?.map(({ path, name, icon }, key) => (
          <CustomLink to={path} path={path} key={key}>
            <Box
              sx={{
                fontSize: { xs: 16, md: 20 }, // Responsive font size
                display: "flex",
                alignItems: "center",
              }}
            >
              {icon}
            </Box>
            <Typography color="white" fontSize={{ xs: 12, md: 14 }}>
              {name}
            </Typography>
          </CustomLink>
        ))}
      </Stack>
    </Stack>
  );
}

export default Sidebar;
