import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLogout } from "./auth";
import api from "./axios";

// Change Password
export const useChangePassword = () => {
  return useMutation((body) => api.post("auth/users/set_password/", body), {
    onSuccess: () => {
      toast.success("Your new password has been saved.");
    },
  });
};

// Send Email for Reset Password
export const useSendResetPassword = () =>
  useMutation((body) => api.post("auth/users/reset_password/", body), {
    onSuccess: () => {
      toast.success(
        "Reset Password Email has been sent, please check in your SPAM"
      );
    },
  });

// Reset Password
export const useResetPassword = () =>
  useMutation((body) => api.post("auth/users/reset_password_confirm/", body), {
    onSuccess: () => {
      toast.success("Successfully Reset Password");
    },
  });

// Resend Activate Email
export const useSendResetActivation = () =>
  useMutation((body) => api.post("auth/users/resend_activation/", body), {
    onSuccess: () => {
      toast.success("Active Email has been sent, please check in your SPAM");
    },
  });

// Update User
export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation((body) => api.patch(`auth/users/me/`, body), {
    onMutate: (variables) => {
      const key = Object.keys(variables);
      const value = Object.values(variables);

      queryClient.setQueryData(["me"], (old) => ({
        ...old,
        data: { ...old.data, [key[0] !== "password"]: value[0] },
      }));
      return toast.loading("Updating...");
    },
    onSuccess: (results, variables, context) => {
      toast.success("Updated", { id: context });
      queryClient.invalidateQueries(["me"]);
    },
  });
};

// Delete Acccount
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const {mutate: logout } = useLogout()

  return useMutation(
    (data) =>
      api.delete("auth/users/me/", {
        data, // Must use data
      }),
    {
      onSuccess: logout,
      // retry: 5,
      // retryDelay: 3000, // 3 seconds
    }
  );
};
