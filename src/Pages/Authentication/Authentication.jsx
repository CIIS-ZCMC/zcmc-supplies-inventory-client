import React, { useEffect } from "react";
import { BASE_URL, ROOT_PATH } from "../../services/Config";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/joy";
import useUserHook from "../../hooks/UserHook";
import styled from "@emotion/styled";
import axios from "axios";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
});

/**
 * Authentication Loader
 *
 * This will authenticate user from umis server via pr monitoring server
 *
 * Done Mock Testing status : [PASSED]
 *
 * @returns {functional component}
 */
const Authentication = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authenticate } = useUserHook();

  /**
   * Initialize Client
   *
   * retrieve the session_id (id) in parameters as unique id
   * to verify user authenticity.
   *
   * trigger authenticate request with param session_id
   *
   * @param {any} token : Token to allow cancelation of request in case the user remove the current tab
   */
  function init(token) {
    const params = { session_id: id };

    authenticate(token, params, (status, feedback) => {
      // On failed request navigate the user back to signing page of zcmc.online or localhost:3001
      if (!(status >= 200 && status < 300)) {
        /**
         * Comment this if you want to prevent return to landing page when session expire
         */
        // window.location.href = BASE_URL.development_landing_page;
        console.log(feedback);

        return null;
      }

      //
      return navigate(ROOT_PATH);
    });
  }

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    init(cancelToken.token);

    return () => cancelToken.cancel();
  }, []);

  return (
    <Container>
      <CircularProgress size="lg" color="success" />
      <Typography level="h6" color="neutral.300" sx={{ mt: 3 }}>
        Signing in might take a few seconds...
      </Typography>
    </Container>
  );
};

export default Authentication;
