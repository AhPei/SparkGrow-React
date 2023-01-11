import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useSyncLocalStorage } from "../hooks";
import api from "./axios";
import useQuery from "./useQuery";

// ME
export const useUser = () => {
  const [success, setSuccess] = useSyncLocalStorage("me", false);
  const { ...others } = useQuery(["me"], () => api.get("auth/users/me/"), {
    onSuccess: () => setSuccess(true),
    onError: () => setSuccess(false),
    select: (data) => data?.data,
  });
  return { success, ...others };
};

// Login
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation((body) => api.post(`auth/jwt/create/`, body), {
    onSuccess: async () => {
      toast.success("Successfully Login!", { id: "Login" });
      await queryClient.invalidateQueries(["me"]);
    },
    onError: (err) => toast.error(err.response.data.detail, { id: "Login" }),
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

// Send Email for Reset Password
export const useSendResetPassword = () =>
  useMutation((body) => api.post("auth/users/reset_password/", body), {
    onSuccess: () =>
      toast.success(
        "Reset Password Email has been sent, please check in your SPAM"
      ),
  });

// Reset Password
export const useResetPassword = () =>
  useMutation((body) => api.post("auth/users/reset_password_confirm/", body), {
    onSuccess: () => toast.success("Successfully Reset Password"),
  });

// Resend Activate Email
export const useSendResetActivation = () =>
  useMutation((body) => api.post("auth/users/resend_activation/", body), {
    onSuccess: () =>
      toast.success("Active Email has been sent, please check in your SPAM"),
  });

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
  return useMutation(() => api.post("auth/users/logout/", null), {
    onMutate: () => {
      Cookies.remove("login_token");
      localStorage.clear();
    },
    onSuccess: () => toast.success("Your account is Logout", { id: "Login" }),
    onSettled: () => {
      queryClient.setQueryData(["me"], () => undefined);
      queryClient.invalidateQueries(["me"]);
    },
  });
};
