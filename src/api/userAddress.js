import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import api from "./axios";

// Address
export const useAllAddress = () => {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(["me"]);
  const uid = data?.id;

  return useQuery(["address", uid], () => api.get("account/address/"), {
    select: (data) => data.data,
    enabled: !!uid,
  });
};

// Add User Address
export const useAddAddress = () => {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(["me"]);
  const uid = data?.id;
  return useMutation((body) => api.post(`account/address/`, body), {
    onMutate: (variables) => {
      queryClient.setQueryData(["address", uid], (old) => ({
        ...old,
        data: old?.data.map((prev) => ({ ...prev, variables })),
      }));
    },
    onSuccess: (results, variables, context) => {
      queryClient.invalidateQueries(["address", uid]);
    },
  });
};
// Update User Address
export const updateAddress = (aid) => {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(["me"]);
  const uid = data?.id;
  return useMutation((body) => api.patch(`account/address/${aid}`, body), {
    onMutate: (variables) => {
      queryClient.setQueryData(["address", uid], (old) => ({
        ...old,
        data: old.data.map((address) =>
          address.id === aid ? Object.assign(address, variables) : address
        ),
      }));
    },
    onSuccess: (results, variables, context) => {
      queryClient.invalidateQueries(["address", uid]);
    },
  });
};

// Delete User Address
export const removeAddress = () => {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(["me"]);
  const uid = data?.id;
  return useMutation((aid) => api.delete(`account/address/${aid}`), {
    onMutate: (variables) => {
      queryClient.setQueryData(["address", uid], (old) => ({
        ...old,
        data: old.data.filter((address) => address.id !== variables),
      }));
    },
    onSuccess: (results, variables, context) => {
      queryClient.invalidateQueries(["address", uid]);
    },
  });
};
