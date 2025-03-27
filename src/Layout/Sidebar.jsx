import { Box, Stack, styled, Typography, useTheme, Sheet } from "@mui/joy";
import { sidebarRoutes } from "../Routes/PageRoutes";
import { isActive } from "../Utils/PathChecker";
import { Link, useLocation } from "react-router-dom";

import { BookCopy, ExternalLink, MessageCircleQuestion } from "lucide-react";

import BrandLogo from "../Components/Sidebar/BrandLogo";

function Sidebar() {
  const theme = useTheme();
  const color = theme.palette.custom;

  const location = useLocation();
  const currentPath = location.pathname;

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
      sx={{ height: "95%", overflowY: "auto" }} // Ensure it scrolls if needed
    >
      <BrandLogo />
      <Stack mt={4} gap={1} flexGrow={1}>
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

      <Sheet
        sx={{
          p: 1.5,
          borderRadius: "10px",
          backgroundColor: "#0A223E",
          mt: 2,
        }}
      >
        <Typography
          level="title-sm"
          sx={{
            color: "#E6E6E6",
            mb: 1,
          }}
        >
          System libraries
        </Typography>
        <Typography
          level="body-sm"
          fontSize={12}
          sx={{
            color: "#E6E6E6",
          }}
        >
          Manage reusable values on filling forms with product names,
          categories, suppliers, sources, brands, areas and units with dynamic
          system libraries.
        </Typography>

        <Stack mt={2} direction={"row"} alignItems={"center"}>
          {/* render only if not in the path '/libraries' */}
          {currentPath !== "/libraries" && (
            <Box mr={2}>
              <Link to={"/libraries"}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography mr={1} fontSize={12} sx={{ color: "#E6E6E6" }}>
                    Go to my libraries
                  </Typography>
                  <BookCopy color="#E6E6E6" size={16} />
                </Stack>
              </Link>
            </Box>
          )}

          <Link>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography mr={1} fontSize={12} sx={{ color: "#E6E6E6" }}>
                Need help?
              </Typography>
              <ExternalLink color="#E6E6E6" size={16} />
            </Stack>
          </Link>
        </Stack>
      </Sheet>

      <Sheet
        sx={{
          p: 1.5,
          borderRadius: "10px",
          backgroundColor: "#0A223E",
          mt: 2,
        }}
      >
        <Typography
          level="title-sm"
          sx={{
            color: "#E6E6E6",
            mb: 1,
          }}
        >
          Help and Support
        </Typography>
        <Typography
          level="body-sm"
          fontSize={12}
          sx={{
            color: "#E6E6E6",
          }}
        >
          Let us know about your experience. Your feedback is invaluable in
          ensuring the stability of the new Inventory Management System.
        </Typography>

        <Stack mt={2} direction={"row"} alignItems={"center"}>
          <Link>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography mr={1} fontSize={12} sx={{ color: "#E6E6E6" }}>
                Report an issue?
              </Typography>
              <MessageCircleQuestion color="#E6E6E6" size={16} />
            </Stack>
          </Link>
        </Stack>
      </Sheet>
    </Stack>
  );
}

export default Sidebar;
