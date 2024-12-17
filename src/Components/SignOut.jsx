import React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import { BsChevronRight } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai"; // Logout Icon

import useUserHook from "../hooks/UserHook";
import { BASE_URL } from "../Services/Config";

const SignOut = () => {
  const { signOut } = useUserHook();

  function onSignOut() {
    signOut((status, feedback) => {
      if (!(status >= 200 && status < 300)) {
        return console.log(feedback);
      }

      window.location.href = BASE_URL.development_landing_page;
    });
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
      <BsChevronRight />
      <IconButton
        aria-label="Sign out"
        variant="outlined" // You can use 'soft', 'solid', etc.
        color="danger" // Adjust color based on your design
        onClick={onSignOut}
        sx={{ ml: 2 }} // Add spacing between the icons
      >
        <AiOutlineLogout />
      </IconButton>
    </Box>
  );
};

export default SignOut;
