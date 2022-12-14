import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLogout } from "./auth";
import api from "./axios";
import useMutation from "./useMutation";

// Change Password
export const useChangePassword = () => {
  return useMutation((body) => api.post("auth/users/set_password/", body), {
    onSuccess: () => {
      toast.success("Your new password has been saved.");
    },
  });
};

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
      queryClient.refetchQueries(["me"]);
      return context;
    },
    onSettle: (context) => {
      toast.dismiss(context);
    },
  });
};

// Delete Acccount
export const useDeleteAccount = () => {
  const { mutate: logout } = useLogout();

  return useMutation((data) => api.delete("auth/users/me/", { data }), {
    onSuccess: logout,
  });
};
