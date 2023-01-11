import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { useAllAddress, useCheckout } from "../../api";
import Button from "../../components/Button";
import { OrderForm } from "../Order";
import { AddressForm } from "../UserAddress";

// Hooks
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function Checkout({ title }) {
  useDocumentTitle(title);

  const { state } = useLocation();

  const { items, total } = state ?? {};

  const { data: address, isLoading: addressLoading } = useAllAddress();
  const { mutate: checkout, isLoading: checkoutLoading } = useCheckout();
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

    checkout(body);
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
                state,
                postcode,
                country,
              }) => (
                <option
                  key={id}
                  value={id}
                  style={{ whiteSpace: "pre-line" }}
                  defaultValue={id}
                >
                  {consignee} | {contact} {address}, {state}, {postcode},{" "}
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
          loading={addressLoading}
        >
          Add address
        </Button>
        <AddressForm show={show} setShow={setShow} />
        <Button
          className="w-100 my-4"
          loading={checkoutLoading || addressLoading}
          onClick={createSession}
          disabled={select === ""}
        >
          Check Out
        </Button>
      </OrderForm>
    </>
  );
}
