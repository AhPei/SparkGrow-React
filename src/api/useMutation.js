import { useMutation as useMutationOriginal } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLogout } from "./auth";
import api from "./axios";

export default function useMutation(mutateFn, fn) {
  const { mutate, error, isLoading, failureCount,  ...mutationResult } =
    useMutationOriginal(mutateFn, fn);
  const [previousData, setPreviousData] = useState(null);
  const [previousFn, setPreviousFn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { mutate: logout } = useLogout();

  useEffect(() => {
    // Only Unathorized will refetch
    if (!error) return;
    console.log("useMutation: ",error)
    if (error?.response.status === 401 && failureCount === 1) {
      // The access token is expired
      // Refresh the access token and retry the mutate operation
      // Update the access token in the axios instance

      async function refreshTokenAndRetry() {
        // setRefreshing(true);
        try {
          setLoading(true);
          // Retry the mutate operation
          await api.post("auth/jwt/refresh/");
          await mutate(previousData, previousFn);
        } catch (err) {
          // Failed to refresh the access token
          // Stop the retry loop
          // Force user Logout
          toast.error("Your session are expired.");
          logout();
        } finally {
          setLoading(false);
          // setRefreshing(false);
        }
      }
      refreshTokenAndRetry();
    }
  }, [error]);

  // useEffect(() => {
  //   if (!error && !refreshing) setLoading(false);
  // }, [error, refreshing]);

  return {
    mutate: (data, fn) => {
      setPreviousData(data);
      setPreviousFn(fn);
      mutate(data, fn);
    },
    error,
    isLoading: loading || isLoading,
    ...mutationResult,
  };
}
