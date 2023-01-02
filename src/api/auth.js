import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
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
      toast.success("Successfully Login!", { id: "Login" });
      await queryClient.invalidateQueries(["me"]);
    },
    onError: (err) =>
      toast.error(err.response.data.detail, { id: "Login" }),
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
  return useMutation(() => api.get("auth/users/logout/"), {
    onMutate: () => {
      Cookies.remove("login_token");
      localStorage.clear();
    },
    onSuccess: () => {
      toast.success("Your account is Logout", { id: "Login" });
      queryClient.invalidateQueries(["me"]);
    },
    onSettled: () => {},
  });
};
