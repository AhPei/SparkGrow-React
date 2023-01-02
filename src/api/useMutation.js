import { useMutation as useMutationOriginal } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLogout } from "./auth";
import api from "./axios";

export default function useMutation(mutateFn, fn) {
  const { mutate, error, ...mutationResult } = useMutationOriginal(
    mutateFn,
    fn
  );
  const [previousData, setPreviousData] = useState(null);
  const { mutate: logout } = useLogout();

  useEffect(() => {
    // Only Unathorized will refetch
    if (error && error?.response && error?.response.status === 401) {
      // The access token is expired
      // Refresh the access token and retry the mutate operation
      // Update the access token in the axios instance

      api
        .post("auth/jwt/refresh/")
        .then(async () => {
          // Retry the mutate operation
          toast.success("Refreshed");
          await mutate(previousData);
        })
        .catch((err) => {
          // Failed to refresh the access token
          // Stop the retry loop
          // Force user Logout
          toast.error("Your session are expired.")
          logout();
        });
    }
  }, [error, mutate]);

  return {
    mutate: (data) => {
      setPreviousData(data);
      mutate(data);
    },
    error,
    ...mutationResult,
  };
}
