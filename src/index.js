import React from "react";
import ReactDOM from "react-dom/client";
import toast, { Toaster } from "react-hot-toast";
import App from "./App";

// utils
// import "./utils/currency";

// React Query
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Importing the Bootstrap CSS
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
// Styles
import "./App.css";

// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


function isNetworkError(err) {
  // return !!err.isAxiosError && err.code == "ERR_NETWORK";
  return !!err.isAxiosError && !err.response.status;
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      // cacheTime: 24 * 60 * 60 * 1000, // 24 hours
      // staleTime: 5 * 60 * 1000, // 5mins only refetch when data too old
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: async (error, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (isNetworkError(error))
        return toast.error(`${error.message}`, {
          id: "Network_Error",
        });
      if (query.queryKey[0] !== "me") {
        try {
          await queryClient.invalidateQueries(["me"]);
          queryClient.refetchQueries([query.queryKey[0]]);
          console.log("Refreshed");
        } catch {}
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: async (error, variables, context, mutation) => {
      if (error.response?.data?.detail) {
        await queryClient.invalidateQueries(["me"]);
        // Refetch mutate after get new token
        await mutation.options
          .mutationFn(variables)
          .then(() => mutation.options.onSuccess())
          // .catch((err) => mutation.options?.onError());
        toast.error(error.response.data.detail, {
          id: "errorOnCache",
        });
        return;
      }
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (error.response?.status >= 500 || error.response?.status == 0) {
        toast.error(`Mutation Cache: ${error.message}`, {
          id: "Mutation_Error",
        });
        toast.dismiss(context);
      }
    },
  }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <Toaster />
    <App />
  </QueryClientProvider>
  // </React.StrictMode>
);
