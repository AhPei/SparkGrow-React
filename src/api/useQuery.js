import { useQuery as useQueryOriginal } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLogout } from "./auth";
import api from "./axios";

export default function useQuery(queryKey, queryFn, fn) {
  const { refetch, error, isLoading, failureCount, ...mutationResult } =
    useQueryOriginal(queryKey, queryFn, fn);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { mutate: logout } = useLogout();

  useEffect(() => {
    if (!error) return;
    // console.log(error)
    // Only Unathorized will refetch
    // 1 is retry 1 times
    if (error?.response.status === 401 && failureCount === 1) {
      if (queryKey[0] === "me") return;
      // The access token is expired
      // Refresh the access token and retry the mutate operation
      // Update the access token in the axios instance

      // toast.loading("Refreshing Token", { id: "refresh" });
      async function refreshTokenAndRetry() {
        // setRefreshing(true);
        try {
          setLoading(true);
          // Retry the mutate operation
          await api.post("auth/jwt/refresh/");
          await refetch();
          // toast.success("Refreshed", { id: "refresh" });
        } catch (err) {
          // Failed to refresh the access token
          // Stop the retry loop
          // Force user Logout
          console.log("==============FAILED REFRESH================");
          console.log(err);
          console.log("============================================");
          toast.error("Your session are expired.", { id: "refresh" });
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
  //   console.log(queryKey, ">>>", error, !error, !refreshing, !isLoading);
  //   if (!error && !refreshing && !isLoading) {
  //     console.log("stop loading...")
  //     setLoading(false);}
  // }, [error, refreshing, isLoading]);
  // useEffect(() => {
  //   console.log(queryKey, ">>>", error, !error, !refreshing, !isLoading);
  //   if (!error && !refreshing && !isLoading) setLoading(false);
  // }, [error, isLoading]);

  return {
    failureCount,
    refetch,
    error,
    isLoading: loading || isLoading,
    ...mutationResult,
  };
}
