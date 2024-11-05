// App.js

import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL, ROOT_PATH, SSO_SIGNING_PATH } from "../services/Config";
import useUserHook from "../hooks/UserHook";
import { useEffect, useState } from "react";
import axios from "axios";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionValidation } = useUserHook();
  const [loading, setLoading] = useState(true);

  function initialize(token) {
    if (location.pathname.includes(SSO_SIGNING_PATH)) {
      const regenerateSigningSessionURL = `${location.pathname}${location.search}`;
      navigate(regenerateSigningSessionURL);
      return;
    }

    sessionValidation(token, (status, feedback) => {
      if (!(status >= 200 && status < 300)) {
        /**
         * Comment this if you want to prevent return to landing page when session expire
         */
        window.location.href = BASE_URL.development_landing_page;

        setLoading(false);
        return;
      }
      navigate(ROOT_PATH);
      setLoading(false);
    });
  }

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    initialize(cancelToken.token);

    return () => cancelToken.cancel();
  }, []);

  return children;
}

export default ProtectedRoutes;
