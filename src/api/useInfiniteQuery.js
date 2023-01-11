import { useInfiniteQuery as useInfiniteQueryOriginal } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLogout } from "./auth";
import api from "./axios";

export default function useInfiniteQuery(queryKey, queryFn, fn) {
  const { refetch, error, isLoading, failureCount, ...mutationResult } =
    useInfiniteQueryOriginal(queryKey, queryFn, fn);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { mutate: logout } = useLogout();

  useEffect(() => {
    // Only Unathorized will refetch
    // console.log("UseInfiniteQuery>>>",error?.response, queryKey);
    if (!error) return;
    if (error?.response.status === 401 && failureCount === 1) {
      // The access token is expired
      // Refresh the access token and retry the mutate operation
      // Update the access token in the axios instance

      async function refreshTokenAndRetry() {
        // setRefreshing(true);
        try {
          setLoading(true)
          // Retry the mutate operation
          await api.post("auth/jwt/refresh/");
          await refetch();
        } catch (err) {
          // Failed to refresh the access token
          // Stop the retry loop
          // Force user Logout
          toast.error("Your session are expired.");
          logout();
        } finally {
          setLoading(false)
        }
        // setRefreshing(false);
      }
      refreshTokenAndRetry();
    }
  }, [error]);

  // useEffect(() => {
  //   if (!error && !refreshing) setLoading(false);
  // }, [error, refreshing]);

  return {
    error,
    isLoading: loading || isLoading,
    ...mutationResult,
  };
}
