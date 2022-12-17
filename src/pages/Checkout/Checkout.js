import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import api, { useAllAddress } from "../../api";
import Button from "../../components/Button";
import { OrderForm } from "../Order";
import { AddressForm } from "../UserAddress";

// Hooks
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function Checkout({ title }) {
  useDocumentTitle(title);

  const { state } = useLocation();

  const { items, total } = state ?? {};

  const { data: address, isLoading } = useAllAddress();
  const [select, setSelect] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (address?.length > 0) {
      var ad = address.filter((isDefault) => isDefault);
      setSelect(ad[0].id);
    }
  }, [address]);

  const createSession = async () => {
    // Create the order in pending...
    const item = items.map(({ product, quantity }) => ({
      product,
      quantity,
    }));

    const body = {
      items: item,
      address_id: select,
    };

    api.post("payment/checkout/", body).then(async ({ data }) => {
      var stripe = await loadStripe(data.stripe_public_key);
      await stripe
        .redirectToCheckout({
          sessionId: data.session_id,
        })
        .then((res) => {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        });
    });
  };

  if (!state) return <Navigate to="/cart" replace />;

  return (
    <>
      <OrderForm items={items} total={total}>
        <FloatingLabel label="Select Address" className="my-3">
          <Form.Select
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            style={{ whiteSpace: "pre-wrap", height: "80px" }}
          >
            {address?.map(
              ({
                id,
                consignee,
                contact,
                address,
                city,
                postcode,
                country,
              }) => (
                <option
                  key={id}
                  value={id}
                  style={{ whiteSpace: "pre-line" }}
                  defaultValue={id}
                >
                  {consignee} | {contact} {address}, {city}, {postcode},{" "}
                  {country}.
                </option>
              )
            )}
          </Form.Select>
        </FloatingLabel>
        <Button
          onClick={() => {
            setShow((prev) => !prev);
          }}
          className="w-100"
        >
          Add address
        </Button>
        <AddressForm show={show} setShow={setShow} />
        <Button
          className="w-100 my-4"
          loading={isLoading}
          onClick={createSession}
          disabled={select === ""}
        >
          Check Out
        </Button>
      </OrderForm>
    </>
  );
}
