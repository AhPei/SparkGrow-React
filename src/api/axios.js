import axios from "axios";

function getCookie(name) {
  var cookieValue = null;

  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: 'https://sparkgrow.azurewebsites.net/',
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

// Add a request interceptor
instance.interceptors.request.use((config) => {
  // if (localStorage.getItem("access"))
  //   config.headers.Authorization = `JWT ${localStorage.getItem("access")}`;
  config.headers["X-CSRFTOKEN"] = getCookie("csrftoken");
  return config;
});

export default instance;
