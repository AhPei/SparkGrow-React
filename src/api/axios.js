import axios from "axios";
// import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

// instance.interceptors.request.use((config) => {
//   config.headers["X-CSRFTOKEN"] = Cookies.get('csrftoken');
//   return config;
// });

instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
instance.defaults.xsrfCookieName = "csrftoken";

export default instance;
