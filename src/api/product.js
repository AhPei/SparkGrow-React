import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

import api from "./axios";

// Products
export const useProducts = () => {
  return useInfiniteQuery(
    ["products"],
    ({ pageParam = 1 }) => api.get(`product/?page=${pageParam}&limit=12`),
    {
      getNextPageParam: (_lastPage, pages) => {
        if (_lastPage.data.next) return pages.length + 1;
        else return undefined;
      },
      select: (data) => ({
        pages: data.pages.flatMap((x) => x.data.results),
        pageParams: data.pageParams,
      }),
    }
  );
};

// Get Specific Product
export const useSpecificProducts = (pid) => {
  return useQuery(["product", pid], () => api.get(`product/${pid}`), {
    select: (data) => data.data,
    enabled: !!pid,
  });
};

// Search
export const useSearch = (search) => {
  return useQuery(
    ["products", search],
    () => api.get(`product/?search=${search}`),
    {
      enabled: Boolean(search),
      select: (data) => data.data.results,
    }
  );
};

// Can Remove
export const useProductsPage = (page) => {
  const fetchData = (pageParam) =>
    api.get(`${process.env.REACT_APP_BASE_URL}product?page=${pageParam}`);

  // Queries
  return useQuery(["productsPage", page], () => fetchData(page), {
    keepPreviousData: true,
    select: (data) => data.data,
    enabled: !!page,
  });
};

// Category
export const useProductCategory = () => {
  return useQuery(["category"], () => api.get("product/category/"), {
    select: (data) => data.data,
  });
};

// Category
export const useSearchCategory = (id) => {
  return useQuery(["category", id], () => api.get(`product/category/${id}`), {
    enabled: !!id,
    select: (data) => data.data,
  });
};
