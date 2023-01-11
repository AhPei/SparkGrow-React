import { loadStripe } from "@stripe/stripe-js";
import api from "./axios";
import useMutation from "./useMutation";

export const useCheckout = () => {
  return useMutation((body) => api.post("payment/checkout/", body), {
    onSuccess: async ({ data }) => {
      const stripe = await loadStripe(data.stripe_public_key);
      await stripe.redirectToCheckout({
        sessionId: data.session_id,
      });
    },
  });
};
