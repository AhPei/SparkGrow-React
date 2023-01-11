import { useQueryClient } from "@tanstack/react-query";
import api from "./axios";
import useQuery from "./useQuery";

// Get All
export const useAllOrder = () => {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(["me"]);
  const uid = data?.id;

  return useQuery(["order", uid], () => api.get("order/"), {
    enabled: !!uid,
    select: (data) => data.data,
  });
};

// Get Specific Order
export const useGetOrder = (id) => {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(["me"]);
  const uid = data?.id;

  return useQuery(["order", uid, id], () => api.get(`order/${id}`), {
    select: (data) => data.data,
    enabled: !!id,
  });
};
