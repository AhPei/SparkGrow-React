import axios from "./axios";
import { useUser, useLogin, useRegister, useActivation, Logout } from "./auth";
import {
  useCartLength,
  useCart,
  useAddCart,
  useUpdateCart,
  useRemoveCart,
} from "./cart";
import { useAllOrder, useGetOrder } from "./order";
import {
  useProducts,
  useSpecificProducts,
  useSearch,
  useProductsPage,
  useProductCategory,
  useSearchCategory,
} from "./product";
import {
  useChangePassword,
  useSendResetPassword,
  useResetPassword,
  useSendResetActivation,
  useUpdate,
  useDeleteAccount,
} from "./user";
import {
  useAllAddress,
  useAddAddress,
  updateAddress,
  removeAddress,
} from "./userAddress";

export default axios;

export {
  useUser,
  useLogin,
  useRegister,
  useActivation,
  Logout,
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
  updateAddress,
  removeAddress,
};
