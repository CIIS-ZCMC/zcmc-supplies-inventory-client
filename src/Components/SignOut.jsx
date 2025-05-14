import React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import { BsChevronRight } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai"; // Logout Icon

import useUserHook from "../hooks/UserHook";
import { BASE_URL } from "../Services/Config";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SignOut = () => {
  const { signOut, logOut } = useUserHook();
  const navigate = useNavigate();

  function onSignOut() {
    swal({
      title: " Are you sure?",
      text: "You have unsaved changes. Please save them before leaving.",
      icon: "warning",
      buttons: {
        cancel: "Stay Logged In",
        confirm: {
          text: "Log Out Anyway",
          value: true,
          visible: true,
          className: "",
          closeModal: true,
        },
      },
      dangerMode: true,
    }).then((logout) => {
      if (logout) {
        logOut().then(() => navigate("/signin"));
      }
    });

    // signOut((status, feedback) => {
    //   if (!(status >= 200 && status < 300)) {
    //     return console.log(feedback);
    //   }

    //   window.location.href = BASE_URL.production_landing_page;
    // });
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
