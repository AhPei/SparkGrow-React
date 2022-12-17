import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { delete_cookie } from "../utils/Cookies";
import api from "./axios";

// ME
export const useUser = () => {
  return useQuery(["me"], () => api.get("auth/users/me/"), {
    select: (data) => data.data,
  });
};

// Login
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation((body) => api.post(`auth/jwt/create/`, body), {
    onSuccess: async () => {
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

// Logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(() => api.get("auth/users/logout/"), {
    onMutate: async () => {
      delete_cookie("login_token");
      await queryClient.setQueryData(["me"], () => null);
      localStorage.removeItem("open");
      localStorage.removeItem("start");
      navigate("/login");
    },
    onSuccess: () => {
      toast.success("Your account is activated");
      queryClient.invalidateQueries(["me"]);
    },
  });
};
