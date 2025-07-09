import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header/Header";
import { user } from "../../Data";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import { Box, Button, Chip, Input, Modal, Stack, Typography } from "@mui/joy";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import useUserHook from "../../hooks/UserHook";
import { ExternalLink, Search } from "lucide-react";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import { Accounts } from "./Accounts";
export const Accountmanagement = () => {
  const { getUsers, usersList } = useUserHook();
  const [openManage, setopenManage] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getUsers();
    setRefresh(false);
  }, [refresh]);

  const pageDetails = {
    title: "Account Management",
    description: "See the users account access and information",
    pagePath: "/inventory",
  };

  const columns = [
    {
      id: "key", // or any field name
      label: "#",
      width: "5%",
      render: (row, index) => {
        return index + 1;
      },
    },
    { id: "email", label: "Email", width: "30%" },
    { id: "name", label: "Username" },
    {
      id: "Roles",
      label: "Roles",
      render: (row, index) => {
        return row.assign_roles.map((x) => {
          return (
            <Stack direction={"row"} spacing={2} mb={1}>
              <Box>
                <Chip size="sm" variant="soft" sx={{ cursor: "normal" }}>
                  {x.get_roles?.name ?? ""}
                </Chip>{" "}
              </Box>
              <Typography level="body-xs" fontSize={9}>
                {x.get_roles?.description}
              </Typography>
            </Stack>
          );
        });
      },
    },
    {
      id: "status",
      label: "Status",
      render: (row, index) => {
        return (
          <Box sx={{ textAlign: "center" }}>
            <Chip
              size="sm"
              variant="outlined"
              color={row.status ? "success" : "danger"}
              sx={{ cursor: "normal", fontSize: 10 }}
            >
              {row.status ? "ACTIVE" : "BLOCKED"}
            </Chip>
          </Box>
        );
      },
    },
    { id: "actions", label: "Actions", width: "20%" },
  ];

  const displayRow = () => {
    if (search) {
      return usersList.filter(
        (x) =>
          x.name.toLowerCase().includes(search.toLowerCase()) ||
          x.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    return usersList;
  };
  return (
    <div>
      <Header pageDetails={pageDetails} data={user} />
      <Box mt={2}>
        <ContainerComponent>
          <PaginatedTable
            columns={columns}
            rows={displayRow()}
            customAction={true}
            actionBtns={
              <Box mt={2}>
                <Input
                  sx={{ width: "300px" }}
                  placeholder="Search ..."
                  startDecorator={<Search />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
            }
            handleCustomAction={(row) => {
              return (
                <Stack>
                  <Button
                    size="sm"
                    variant="soft"
                    color="neutral"
                    sx={{
                      fontWeight: "normal",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      color: "#3674B5",
                    }}
                    onClick={() => setopenManage(row.id)}
                    endDecorator={<ExternalLink size={14} />}
                  >
                    Manage
                  </Button>
                </Stack>
              );
            }}
          />
        </ContainerComponent>
        <ModalComponent
          isOpen={openManage ? true : false}
          handleClose={() => setopenManage(null)}
          title="Manage User Account"
          description={"user access management"}
          content={<Accounts userInfo={openManage} setRefresh={setRefresh} />}
        />
      </Box>
    </div>
  );
};
