import { Box, Stack, Typography } from "@mui/joy";
import { ChevronRight } from "lucide-react";

import BreadcrumbsComponent from "../../Components/BreadcrumbsComponent";
import AvatarComponent from "../../Components/AvatarComponent";
import SheetComponent from "../../Components/SheetComponent";
import ButtonComponent from "../../Components/ButtonComponent";

const FlexContainer = ({ children, direction = "row", alignItems = "center", justifyContent = "start", ...props }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: direction,
            alignItems,
            justifyContent,
            ...props.sx,
        }}
        {...props}
    >
        {children}
    </Box>
);

const Header = ({ pageDetails, data }) => {
    return (
        <FlexContainer direction="row" alignItems="start" justifyContent="space-between">
            <Box>
                <FlexContainer direction="row" alignItems="center">
                    {data ? (
                        <AvatarComponent alt={data.name} src={data.src} />
                    ) : (
                        <AvatarComponent />
                    )}
                    <BreadcrumbsComponent name={data.name} pageTitle={pageDetails.title} />
                </FlexContainer>

                <Stack mt={3}>
                    <Typography level="h2" gutterBottom>{pageDetails.title}</Typography>
                    <Typography level="body-lg" gutterBottom>{pageDetails.description}</Typography>
                </Stack>
            </Box>

            <FlexContainer direction="column" alignItems="end" justifyContent="center">
                <SheetComponent variant="outlined" width={275}>
                    <FlexContainer direction="row" alignItems="center" justifyContent="start">
                        <Box mr={2}>
                            {data ? (
                                <AvatarComponent alt={data.name} src={data.src} />
                            ) : (
                                <AvatarComponent />
                            )}
                        </Box>

                        <Stack mr={2}>
                            <Typography level="body-lg" gutterBottom>{data.name}</Typography>
                            <Typography level="body-" gutterBottom>{data.email}</Typography>
                        </Stack>

                        <Box>
                            <ChevronRight />
                        </Box>
                    </FlexContainer>
                </SheetComponent>

                <Box mt={2}>
                    <ButtonComponent label="Generate report" size="lg" />
                </Box>
            </FlexContainer>
        </FlexContainer>
    );
};

export default Header;
