import { Grid, Stack, Box, Typography } from "@mui/joy";

import BreadcrumbsComponent from "../Components/BreadcrumbsComponent";
import AvatarComponent from "../Components/AvatarComponent";

import SheetComponent from "../Components/SheetComponent";
import ButtonComponent from "../Components/ButtonComponent";

import InputComponent from "../Components/Form/InputComponent";
import DatePickerComponent from "../Components/Form/DatePickerComponent";
import SelectComponent from "../Components/Form/SelectComponent";
import TableComponent from "../Components/Table/TableComponent";

import { ChevronRight } from "lucide-react";

const user = {
    name: "Remy Sharp",
    email: "email@domain.com",
    src: "https://mui.com/static/images/avatar/1.jpg"
};

const categoryFilter = [
    { name: 'Option 1', value: 'option 1' },
    { name: 'Option 2', value: 'option 2' },
    { name: 'Option 3', value: 'option 3' }
]

const sortFilter = [
    { name: 'sort option 1', value: 'sort option 1' },
    { name: 'sort option 2', value: 'sort option 2' },
    { name: 'sort option 3', value: 'sort option 3' }
]

const Releasing = () => {

    const pageTitle = { title: "Requisition and issue slip", description: "this is a sample description" }

    const tableHeader = {

    }

    return (
        <>
            <Grid
                container
                spacing={2}
                sx={{ flexGrow: 1, justifyContent: 'space-between' }}
            >
                <Grid item md={5}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: "start"
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems='center'
                        >
                            {user ? <AvatarComponent
                                alt={user.name}
                                src={user.src}
                            />
                                :
                                <AvatarComponent />
                            }

                            <BreadcrumbsComponent
                                name="Steve Dela Cerna"
                                pageTitle={pageTitle.title}
                            />
                        </Stack>

                        <Stack
                            mt={3}
                        >
                            <Typography level="h2" gutterBottom>{pageTitle.title}</Typography>
                            <Typography level="body-lg" gutterBottom>{pageTitle.description}</Typography>
                        </Stack>
                    </Box>
                </Grid>

                <Grid item md={5}>
                    <SheetComponent
                        variant={"outlined"}
                    >

                        <Stack
                            alignItems='center'
                            direction='row'
                            justifyContent='start'
                        >
                            <Box
                                mr={2}
                            >
                                {user ? <AvatarComponent
                                    alt={user.name}
                                    src={user.src}
                                />
                                    :
                                    <AvatarComponent />
                                }
                            </Box>

                            <Stack mr={2}>
                                <Typography level="body-lg" gutterBottom>{user.name}</Typography>
                                <Typography level="body-" gutterBottom>{user.email}</Typography>
                            </Stack>

                            <Box >
                                <ChevronRight />
                            </Box>
                        </Stack>
                    </SheetComponent>

                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <ButtonComponent label="Generate report" size="lg" />
                    </Box>
                </Grid>

                {/* search and filter */}
                <Grid item md={12}>
                    <SheetComponent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >

                            <InputComponent />

                            <Stack
                                direction='row'
                            >

                                <Box mr={2}>
                                    <DatePickerComponent />
                                </Box>

                                <Box mr={2}>
                                    <DatePickerComponent />
                                </Box>

                                <Box mr={2}>
                                    <SelectComponent
                                        placeholder={"Select Category"}
                                        options={categoryFilter}
                                    />
                                </Box>

                                <Box>
                                    <SelectComponent
                                        placeholder={"Sort By"}
                                        options={sortFilter}
                                    />
                                </Box>
                            </Stack>
                        </Box>

                        <hr />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography variant="body-lg">
                                Showing 6 records as filtered from 08-01-2023 - Present
                            </Typography>

                            <Stack
                                direction='row'
                            >
                                <ButtonComponent
                                    size="sm"
                                    variant="outlined"
                                    label='Clear Filters'
                                />
                            </Stack>
                        </Box>
                    </SheetComponent>
                </Grid>

                <Grid item md={12}>
                    <SheetComponent>
                        <TableComponent />
                    </SheetComponent>
                </Grid>
            </Grid>
        </>
    )
}

export default Releasing