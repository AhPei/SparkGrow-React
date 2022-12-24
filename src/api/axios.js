import axios from "axios";

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "https://sparkgrow.azurewebsites.net/",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
