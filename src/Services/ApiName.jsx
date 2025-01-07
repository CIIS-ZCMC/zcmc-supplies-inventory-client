import axios from "axios";
import { BASE_URL } from "./Config";

/**
 * For better code structure rename the api_name with your system server name and also the directory name
 *
 * ex.
 *
 * UMIS System
 *
 * Directory [Umis.jsx]
 * File [umis_api]
 */
const inventory_api = new axios.create({
  baseURL: BASE_URL.production,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export default inventory_api;
