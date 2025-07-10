import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Input,
  Option,
  Select,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import React, { useEffect, useRef, useState } from "react";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import useUserHook from "../../hooks/UserHook";
import { Save, Trash } from "lucide-react";
export const Accounts = ({
  userInfo,
  setRefresh,
  newAccount,
  setopenManage,
}) => {
  const { userRoles, manageRole, usersList, updateUser, saveUser } =
    useUserHook();
  const [inputs, setInputs] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const formRef = useRef(null);

  const [newSelectedRole, setNewselectedRole] = useState([]);

  const [updater, setUpdater] = useState("");

  useEffect(() => {
    if (!newAccount) {
      const User = usersList.filter((x) => x.id === userInfo)[0];
      setSelectedUser(User);
      setInputs(User?.name);
      setRoles(User?.assign_roles);
    }

    setNewselectedRole([]);
    formRef.current.reset();
  }, [userInfo, usersList]);

  const handleChange = (key, value = updater) => {
    if (!value && key !== "status") {
      swal("No entry", "changes not saved", "warning");
      return;
    }
    updateUser({
      userID: userInfo,
      key: key,
      value: value,
    }).then((response) => {
      setRefresh(true);
      swal("Saved", "changes saved successfully!", "success");
    });
  };
  const handleRole = (Action, id = selectedRole) => {
    manageRole({
      userID: userInfo,
      id: id,
      Action: Action,
    }).then((response) => {
      setRefresh(true);
      swal("Saved", "changes saved successfully!", "success");
    });
  };

  const handleChangeCheckbox = (event) => {
    const value = event.target.value;
    setNewselectedRole((prev) =>
      prev.includes(value)
        ? prev.filter((id) => id !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(newSelectedRole);
    console.log(data);

    saveUser({
      selectedRoles: newSelectedRole,
      data: data,
    }).then((res) => {
      setRefresh(true);
      swal("Saved", res?.data.message, "info");
      setopenManage(null);
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
        {" "}
        <Box width={500}>
          {newAccount ? (
            <>
              <Typography level="body-xs">Email</Typography>
              <Input required name="email" type="email" sx={{ mb: 1 }} />
              <Typography level="body-xs">Username</Typography>
              <Input name="name" required type="text" sx={{ mb: 1 }} />
              <Typography level="body-xs">Password</Typography>
              <Input name="password" required type="password" sx={{ mb: 1 }} />
            </>
          ) : (
            <>
              <Typography level="body-xs">Username</Typography>
              <Input
                value={inputs}
                sx={{ mb: 1 }}
                onChange={(e) => setInputs(e.target.value)}
                endDecorator={
                  <Button
                    type="button"
                    variant="soft"
                    sx={{ fontSize: 11, textTransform: "uppercase" }}
                    endDecorator={<Save size={16} />}
                    onClick={() => handleChange("name", inputs)}
                  >
                    Save changes
                  </Button>
                }
              />
              <Typography level="body-xs">New Password</Typography>
              <Input
                placeholder=""
                type="password"
                sx={{ mb: 2 }}
                onChange={(e) => {
                  setUpdater(e.target.value);
                }}
                endDecorator={
                  <Button
                    type="button"
                    variant="soft"
                    sx={{ fontSize: 11, textTransform: "uppercase" }}
                    endDecorator={<Save size={16} />}
                    onClick={() => handleChange("password")}
                  >
                    Save changes
                  </Button>
                }
              />
            </>
          )}

          <Divider />

          {newAccount ? (
            <>
              <Typography level="body-xs" mt={1}>
                Select Role :
              </Typography>
              <Stack spacing={1} mt={2} mb={2}>
                {userRoles?.map((row) => {
                  return (
                    <Checkbox
                      label={row.name}
                      value={row.id}
                      checked={newSelectedRole.includes(row.id.toString())}
                      onChange={handleChangeCheckbox}
                    />
                  );
                })}
              </Stack>
            </>
          ) : (
            <>
              <Typography
                level="body-xs"
                mt={2}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                Change Role :{" "}
              </Typography>
              <Box mb={2}>
                <Stack direction={"row"} spacing={1}>
                  <Select
                    sx={{ width: "200px" }}
                    onChange={(e, newValue) => setSelectedRole(newValue)}
                  >
                    {userRoles?.map((row) => {
                      return (
                        <Option key={row.id} value={row.id}>
                          {row.name}
                        </Option>
                      );
                    })}
                  </Select>
                  <Button
                    type="button"
                    size="sm"
                    sx={{ fontSize: "13px" }}
                    onClick={() => {
                      handleRole("Added");
                    }}
                  >
                    Add Role
                  </Button>
                </Stack>

                <Box>
                  <span
                    style={{ fontSize: "10px", textTransform: "uppercase" }}
                  >
                    current Role(s) :{" "}
                  </span>{" "}
                </Box>
                <Table size="sm" stripe={"odd"}>
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!newAccount &&
                      roles?.map((row, index) => {
                        return (
                          <tr
                            style={{ fontSize: "11px", fontWeight: "normal" }}
                          >
                            <td>{row.get_roles?.name}</td>
                            <td>{row.get_roles?.description}</td>
                            <td>
                              <Button
                                size="sm"
                                sx={{
                                  fontSize: "11px",
                                  textTransform: "uppercase",
                                }}
                                color="danger"
                                variant="soft"
                                endDecorator={<Trash size={16} />}
                                onClick={() => {
                                  handleRole("Deleted", row.id);
                                }}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Box>
            </>
          )}

          <Divider />
          {!newAccount && (
            <>
              <Typography level="body-xs" mt={2}>
                Status :
                <Chip
                  size="sm"
                  variant="outlined"
                  color={selectedUser?.status ? "success" : "danger"}
                  sx={{ cursor: "normal", fontSize: 10, marginLeft: 1 }}
                >
                  {selectedUser?.status ? "ACTIVE" : "BLOCKED"}
                </Chip>
              </Typography>

              <Stack direction={"row"} spacing={1} mt={2} mb={2}>
                <Button
                  type="button"
                  variant="solid"
                  color="neutral"
                  onClick={() => handleChange("status", 0)}
                >
                  Block
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="neutral"
                  onClick={() => handleChange("status", 1)}
                >
                  Unblock
                </Button>
              </Stack>
            </>
          )}

          {newAccount && (
            <Box display={"flex"} justifyContent={"flex-end"}>
              <Button type="submit" sx={{ mt: 2 }}>
                Save Account
              </Button>
            </Box>
          )}
        </Box>
      </form>
    </div>
  );
};
