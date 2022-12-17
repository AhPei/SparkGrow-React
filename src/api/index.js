import { useActivation, useLogin, useLogout, useRegister, useUser } from "./auth";
import axios from "./axios";
import {
  useAddCart, useCart, useCartLength, useRemoveCart, useUpdateCart
} from "./cart";
import { useAllOrder, useGetOrder } from "./order";
import {
  useProductCategory, useProducts, useProductsPage, useSearch, useSearchCategory, useSpecificProducts
} from "./product";
import {
  useChangePassword, useDeleteAccount, useResetPassword,
  useSendResetActivation, useSendResetPassword, useUpdate
} from "./user";
import {
  useAddAddress, useAllAddress, useRemoveAddress, useUpdateAddress
} from "./userAddress";

export default axios;

export {
  useUser,
  useLogin,
  useRegister,
  useActivation,
  useLogout,
  useCartLength,
  useCart,
  useAddCart,
  useUpdateCart,
  useRemoveCart,
  useAllOrder,
  useGetOrder,
  useProducts,
  useSpecificProducts,
  useSearch,
  useProductsPage,
  useProductCategory,
  useSearchCategory,
  useChangePassword,
  useSendResetPassword,
  useResetPassword,
  useSendResetActivation,
  useUpdate,
  useDeleteAccount,
  useAllAddress,
  useAddAddress,
  useUpdateAddress,
  useRemoveAddress,
};

