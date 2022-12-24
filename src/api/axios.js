import axios from "axios";
import { get_cookie } from "../utils/Cookies";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: "https://sparkgrow.azurewebsites.net/",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  config.headers["X-CSRFTOKEN"] = get_cookie("csrftoken");
  console.log(get_cookie("csrftoken"))
  return config;
});

export default instance;
