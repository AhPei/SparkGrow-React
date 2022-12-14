import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { delete_cookie } from "../utils/Cookies";
import api from "./axios";


// ME
export const useUser = () => {
  return useQuery(["me"], () => api.get("auth/users/me/"), {
    select: (data) => data.data,
    // onError: () => setLogin(0),
    // onSuccess: () => setLogin(1),
  });
};

// Login
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation((body) => api.post(`auth/jwt/create/`, body), {
    onSuccess: async() => {
      toast.success("Successfully Login!");
      await queryClient.invalidateQueries(["me"]);
    },
  });
};

// Register
export const useRegister = () => {
  return useMutation((body) => api.post(`auth/users/`, body), {
    onSuccess: () => {
      toast.success("Successfully Register!");
    },
  });
};

// Activate Account
export const useActivation = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => api.post("auth/users/activation/", data), {
    onSuccess: () => {
      toast.success("Your account is activated");
      queryClient.invalidateQueries(["me"]);
    },
  });
};

export const Logout = (queryClient) => {
  const fetch = api.get("auth/users/logout/").finally(() => {
    delete_cookie("login_token");
    queryClient.setQueryData(["me"], () => null);  
    queryClient.invalidateQueries(["me"]);
  });
  toast.promise(fetch, {
    id: "logout",
    loading: "Please wait...",
    success: "Successfully Logout",
    error: (err) => console.warn("Fail to logout: ", err),
  });
  
  localStorage.removeItem("open");
  localStorage.removeItem("start");
  // queryClient.clear();
};
