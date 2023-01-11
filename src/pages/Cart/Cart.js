import { useRef, useState } from "react";
import { Card, Col, Container, Form, Ratio, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";
import { MDBBadge } from "mdb-react-ui-kit";

// Components
import Button from "../../components/Button";
import ComfirmModel from "../../components/ComfirmModel";
import Loading from "../../components/Loading";

// Hooks
import { useCart, useRemoveCart, useUpdateCart } from "../../api";
import useDidUpdateEffect from "../../hooks/useDidUpdateEffect";
import useDocumentTitle from "../../hooks/useDocumentTitle";

// Icon
import { toast } from "react-hot-toast";
import { ImBin } from "react-icons/im";
import NoProductFound from "../../assets/no-product-found.png";
import EmptyCart from "./EmptyCart";

export default function Cart({ title }) {
  const [selectedList, setSelectedList] = useState([]);
  const [selectedSingle, setSelectedSingle] = useState("");
  const [show, setShow] = useState(false);
  const [subtotal, setSubtotal] = useState(null);
  const preValue = useRef(null);

  // Mutations
  const queryClient = useQueryClient();

  const { isLoading: cartLoading, data: cart, isSuccess } = useCart();
  const { mutate: removeCart, isLoading: removeLoading } = useRemoveCart();
  const { mutate: updateCart, isLoading: updateLoading } = useUpdateCart();

  useDocumentTitle(title, isSuccess);

  // Select All
  const selectAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      cart.map(({ id, stock, quantity }) => {
        if (!selectedList.includes(id) && stock > 0 && stock >= quantity)
          return setSelectedList((prev) => [...prev, id]);
        return;
      });
    } else {
      setSelectedList([]);
    }
  };

  // Select
  const select = (e) => {
    let { value, checked } = e.target;
    value = parseInt(value);
    const exist = selectedList.includes(value);
    if (checked) {
      if (!exist) {
        setSelectedList((prev) => [...prev, value]);
      }
    } else {
      if (exist) {
        setSelectedList(selectedList.filter((prev) => prev !== value));
      }
    }
  };

  // Remove
  const remove = () => {
    setShow(false);
    removeCart([selectedSingle]);
    setSelectedSingle("");
  };

  // Show Comfirm Model
  const handleShow = () => setShow(true);

  // Navigate to the product
  const navigate = useNavigate();

  // Handle onblur
  const handleOnBlur = (id) => (e) => {
    const { value } = e.target;
    let preV = preValue.current;

    if (preV === "" || preV == null) preV = 1;

    if (!e.target.validity.valid || value === "" || value === null) {
      return queryClient.setQueryData(["cart", uid], (old) => ({
        ...old,
        pages: old?.pages.map((page) => ({
          ...page,
          data: page.data.map((prev) =>
            prev.id === id ? { ...prev, quantity: preV } : prev
          ),
        })),
      }));
    }

    // if (value > stock) return (e.target.value = stock);

    if (value === preV) return;

    updateCart({ id, value });
  };

  const { data: user } = queryClient.getQueryData(["me"]);
  const uid = user.id;

  // Handle Change
  const handleChange = (id, stock) => (e) => {
    let { value } = e.target;
    if (value > 99 || parseInt(value) <= 0 || !e.target.validity.valid) return;

    if (value > stock) return (e.target.value = stock);

    queryClient.setQueryData(["cart", uid], (old) => ({
      ...old,
      pages: old?.pages.map((page) => ({
        ...page,
        data: page.data.map((prev) =>
          prev.id === id ? { ...prev, quantity: value } : prev
        ),
      })),
    }));
  };

  // Handle Click
  const handleClick = (id) => (e) => {
    let { name, value } = e.target;
    if (name === "increase") value = parseInt(value) + 1;
    if (name === "decrease") value = parseInt(value) - 1;

    updateCart({ id, value });
  };

  const calculate = () => {
    const items = cart?.filter((data) => selectedList.includes(data.id));
    let sub = 0;
    items?.map(({ unitprice, quantity }) => (sub += unitprice * quantity));
    setSubtotal(sub.toFixed(2));
  };

  useDidUpdateEffect(calculate, [selectedList, cart]);

  // Handle checkout
  const checkout = () => {
    if (subtotal < 2) return toast.error("Must be over RM 2");

    const items = cart.filter((data) => selectedList.includes(data.id));
    let sub = 0;
    items.map(({ unitprice, quantity }) => (sub += unitprice * quantity));
    sub = sub.toFixed(2);
    setSubtotal(sub);
    navigate("/checkout", { state: { items, total: sub } });
  };

  if ((cartLoading || !isSuccess) && !cart) return <Loading />;

  if (cart?.length === 0) return <EmptyCart />;

  return (
    <>
      <ComfirmModel
        type="danger"
        title="Remove Product"
        body="Are you sure to remove this product?"
        confirm="Remove"
        onClick={remove}
        show={show}
        setShow={setShow}
        cancel
      />
      <Container
      // className="d-flex justify-content-between"
      // style={{ backgroundColor: "red" }}
      >
        <Row className="d-flex justify-content-between">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <Form.Check
                  inline
                  id="select all"
                  label="Select All"
                  name="group1"
                  type="checkbox"
                  onClick={selectAll}
                />
                {selectedList.length > 0 && (
                  <Button
                    variant="danger"
                    onClick={handleShow}
                    loading={removeLoading}
                  >
                    Remove
                  </Button>
                )}
              </div>
              {selectedList.length > 0 && (
                <div className="d-flex align-items-center">
                  <h4 className="text-truncate d-inline">{"RM " + subtotal}</h4>
                  <Button variant="primary ms-2" onClick={checkout}>
                    CheckOut
                  </Button>
                </div>
              )}
            </div>
            {cart?.map(
              ({ id, name, desc, stock, image, unitprice, quantity }, idx) => (
                <Card
                  className={`${stock <= 0 && "unavailable"} mx-auto mb-3`}
                  key={idx}
                >
                  <Card.Body>
                    <Row className="text-center d-flex justify-content-betweeen align-items-center">
                      <Col sm={1} className="p-0">
                        {stock > 0 && quantity <= stock ? (
                          <Form.Check
                            inline
                            name="group1"
                            type="checkbox"
                            onChange={select}
                            checked={selectedList.includes(id)}
                            className="ps-4"
                            value={id}
                          />
                        ) : stock > 0 ? (
                          <MDBBadge
                            color="dark"
                            notification
                            pill
                            className="d-block"
                          >
                            Over Quantity
                          </MDBBadge>
                        ) : (
                          <MDBBadge
                            color="dark"
                            notification
                            pill
                            className="d-block"
                          >
                            Sold Out
                          </MDBBadge>
                        )}
                      </Col>
                      <Col sm={2} className="p-0">
                        <Ratio aspectRatio="4x3">
                          <img
                            src={image ?? NoProductFound}
                            alt="product"
                            className="pointer"
                            onClick={() => navigate(`/products/${name}`)}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = NoProductFound;
                            }}
                          />
                        </Ratio>
                      </Col>
                      <Col sm={3} md={2} className="p-0 text-start">
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle
                          className="d-none d-md-block"
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            // whiteSpace: "nowrap",
                            lineHeight: "1.5em",
                            height: "3em", // lineHeight * 2 = height
                          }}
                        >
                          {desc}
                        </Card.Subtitle>
                      </Col>
                      <Col sm={2} className="d-flex justify-content-center">
                        RM{unitprice.toFixed(2)}
                      </Col>
                      <Col sm={3} md={2} className="d-flex">
                        <Button
                          size="sm"
                          name="decrease"
                          value={quantity}
                          onClick={handleClick(id)}
                          disabled={stock <= 0 || quantity <= 1}
                        >
                          -
                        </Button>
                        <Form.Control
                          size="sm"
                          // style={{ width: "1.5rem" }}
                          className="text-center"
                          type="number"
                          name="quantity"
                          placeholder="Qty"
                          aria-label="Qty"
                          onFocus={(e) => (preValue.current = e.target.value)}
                          onBlur={handleOnBlur(id, stock)}
                          pattern="^(?=.*?[0-9]).{,2}$"
                          value={quantity}
                          onChange={handleChange(id, stock)}
                          disabled={stock <= 0}
                        />
                        <Button
                          size="sm"
                          name="increase"
                          value={quantity}
                          onClick={handleClick(id)}
                          disabled={stock <= 0 || quantity >= stock}
                        >
                          +
                        </Button>
                      </Col>
                      <Col
                        sm={2}
                        className="d-none d-md-flex justify-content-center"
                      >
                        RM{(unitprice * quantity).toFixed(2)}
                      </Col>
                      <Col sm={1}>
                        <ImBin
                          className="pointer"
                          size="1.5rem"
                          color="red"
                          onClick={() => {
                            setSelectedSingle(id);
                            handleShow();
                          }}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
