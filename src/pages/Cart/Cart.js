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
  const [show, setShow] = useState(false);
  const [subtotal, setSubtotal] = useState(null);
  const preValue = useRef(null);

  // Mutations
  const queryClient = useQueryClient();

  const { isLoading, data: cart, isSuccess } = useCart();
  const { mutate: removeCart } = useRemoveCart();
  const { mutate: updateCart } = useUpdateCart();

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
    removeCart(selectedList);
    setSelectedList([]);
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
    if (subtotal<2) return toast.error("Must be over RM 2")

    const items = cart.filter((data) => selectedList.includes(data.id));
    let sub = 0;
    items.map(({ unitprice, quantity }) => (sub += unitprice * quantity));
    sub = sub.toFixed(2);
    setSubtotal(sub);
    navigate("/checkout", { state: { items, total: sub } });
  };

  if (isLoading || !isSuccess) return <Loading />;

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
      <Container className="d-flex justify-content-between">
        <Row className="mb-2">
          <Col>
            <Form.Check
              inline
              id="select all"
              label="Select All"
              name="group1"
              type="checkbox"
              onClick={selectAll}
            />
            {selectedList.length > 0 && (
              <Button variant="danger" onClick={handleShow}>
                Remove
              </Button>
            )}
          </Col>
        </Row>
        {selectedList.length > 0 && (
          <Row>
            <Col>
              <h4 className="text-truncate">{"RM " + subtotal}</h4>
            </Col>
            <Col>
              <Button variant="primary" onClick={checkout}>
                CheckOut
              </Button>
            </Col>
          </Row>
        )}
      </Container>
      <Container>
        {cart?.map(
          ({ id, name, desc, stock, image, unitprice, quantity }, idx) => (
            <Row className="mb-4" key={idx}>
              <Col>
                <Card className={`${stock <= 0 && "unavailable"} mx-auto`}>
                  <Card.Body>
                    <Row className="d-flex align-items-center">
                      <Col sm={1} className="d-flex justify-content-center">
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
                          <MDBBadge color="dark" notification pill>
                            Over Quantity
                          </MDBBadge>
                        ) : (
                          <MDBBadge color="dark" notification pill>
                            Sold Out
                          </MDBBadge>
                        )}
                      </Col>
                      <Col>
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
                      <Col className="d-flex justify-content-center">
                        <Card.Title>{name}</Card.Title>
                      </Col>
                      <Col>
                        <Card.Subtitle
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            // whiteSpace: "nowrap",
                            maxHeight: "100px",
                            lineHeight: "20px",
                          }}
                        >
                          {desc}
                        </Card.Subtitle>
                      </Col>
                      <Col className="d-flex justify-content-center">
                        RM{unitprice.toFixed(2)}
                      </Col>
                      <Col className="d-flex justify-content-center">
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
                          style={{ width: "3.5rem" }}
                          className="text-center mx-2"
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
                      <Col className="d-flex justify-content-center">
                        RM{(unitprice * quantity).toFixed(2)}
                      </Col>
                      <Col md={1}>
                        <ImBin
                          size="1.5rem"
                          color="red"
                          onClick={() => {
                            setSelectedList([id]);
                            handleShow();
                          }}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )
        )}
      </Container>
    </>
  );
}
