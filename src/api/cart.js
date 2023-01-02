import {
  useInfiniteQuery,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import useSyncLocalStorage from "../hooks/useSyncLocalStorage";
import api from "./axios";
import useMutation from "./useMutation";


// Cart Length
export const useCartLength = () => {
  const queryClient = useQueryClient();
  const { data: user } = queryClient.getQueryData(["me"]) || {};
  const uid = user?.id;
  const name = `cartLength,${uid}`;

  const [length, setLength] = useSyncLocalStorage(
    name,
    localStorage.getItem(name) || 0
  );

  useQuery(["cartLength", uid], () => api.get("order/cart"), {
    onSuccess: (results) => setLength(results),
    onError: () => setLength(0),
    select: (data) =>
      data.data.filter(({ stock }) => stock !== 0 && stock).length,
    enabled: !!uid,
  });
  return { length };
};

// Cart
export const useCart = () => {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(["me"]);
  const id = data?.id;

  return useInfiniteQuery(["cart", id], () => api.get("order/cart"), {
    getNextPageParam: (_lastPage, pages) => {
      if (_lastPage.data.next) return pages.length + 1;
      else return undefined;
    },
    select: (data) => data.pages[0].data,
    enabled: !!id,
  });
};

// Add Cart
export const useAddCart = () => {
  const queryClient = useQueryClient();
  const { data: user } = queryClient.getQueryData(["me"]);
  const uid = user?.id;

  return useMutation(
    (product) => api.post("order/cart/add", { product, quantity: 1 }),
    {
      onMutate: (variables) =>
        queryClient.setQueryData(["cartLength", uid], (old) => ({
          ...old,
          data: old.data.filter((prev) => !variables.includes(prev.id)),
        })),
      onSuccess: () => {
        queryClient.invalidateQueries(["cartLength", uid]);
        queryClient.invalidateQueries(["cart", uid]);
      },
    }
  );
};

// Update Cart
export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const { data: user } = queryClient.getQueryData(["me"]);
  const uid = user?.id;

  return useMutation(
    ({ id, value }) => api.patch(`order/cart/${id}`, { quantity: value }),
    {
      onMutate: (variables) => {
        const { id, value } = variables;
        queryClient.setQueryData(["cart", uid], (old) => ({
          ...old,
          pages: old?.pages.map((page) => ({
            ...page,
            data: page.data.map((prev) =>
              prev.id === id ? { ...prev, quantity: value } : prev
            ),
          })),
        }));
      },
    }
  );
};

// Remove Cart
export const useRemoveCart = () => {
  const queryClient = useQueryClient();
  const { data: user } = queryClient.getQueryData(["me"]);
  const uid = user?.id;

  return useMutation((product) => api.post(`order/cart/remove`, { product }), {
    onMutate: (variables) => {
      queryClient.setQueryData(["cart", uid], (old) => ({
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          data: page.data.filter((prev) => !variables.includes(prev.id)),
        })),
      }));
      queryClient.setQueryData(["cartLength", uid], (old) => ({
        ...old,
        data: old.data.filter((prev) => !variables.includes(prev.id)),
      }));
    },
    onSuccess: (result, variables, context) => {
      // HERE
      queryClient.invalidateQueries(["cart", uid]);
      queryClient.invalidateQueries(["cartLength", uid]);
    },
  });
};
