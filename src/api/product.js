import api from "./axios";
import useInfiniteQuery from "./useInfiniteQuery";
import useQuery from "./useQuery";

// Products
// page=2& ordering=-unitprice& categories=shoes& limit=1
export const useProducts = (category="", search="", ordering="" ) => {
  return useInfiniteQuery(
    ["products",category,search,ordering],
    ({ pageParam = 1 }) => api.get(`product/?page=${pageParam}&limit=12&ordering=${ordering}&category=${category}&search=${search}`),
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
    api.get(`product?page=${pageParam}`);

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
