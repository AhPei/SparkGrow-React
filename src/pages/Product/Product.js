import { useParams } from "react-router-dom";

import { Container, Row, Col, Ratio } from "react-bootstrap";

import Button from "../../components/Button";
import Loading from "../../components/Loading";
import MultipleImage from "../../components/MultipleImage";

// Hooks
import { useAddCart, useSpecificProducts } from "../../api";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useQueryClient } from "@tanstack/react-query";

// import AddProduct from "./AddProduct";
import toast from "react-hot-toast";

export default function Product({ title }) {
  const param = useParams();

  const {
    isLoading,
    isError,
    error,
    data: product,
    isSuccess,
  } = useSpecificProducts(param.id);

  useDocumentTitle(`${title} ${product?.name}`, isSuccess);

  // Mutations
  const { mutate } = useAddCart();

  const handleClick = (e) => {
    const { value } = e.target;

    mutate(value, {
      onError: () => toast.error("Something went error."),
      onSuccess: () => toast.success("Item added to cart."),
    });
  };

  const queryClient = useQueryClient();
  const { data: user } = queryClient.getQueryData(["me"]);

  if (isLoading) return <Loading />;

  if (isError) return <span>Error: {error.message}</span>;

  const { id: pid, name, desc, image, stock, unitprice } = product;

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <Ratio aspectRatio="4x3">
              <MultipleImage images={image} />
            </Ratio>
          </Col>
          <Col md={6}>
            <Row>
              <Col sm={10}>
                <h3 className="text-ellipsis">{name}</h3>
              </Col>
              <Col sm={2}>
                <h5 className="d-flex justify-content-end align-items-center h-100">
                  {unitprice}
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <pre className="p-3" style={{ backgroundColor: "#d4d3d2" }}>
                  <h6>Product Description</h6>
                  <p>{desc}</p>
                </pre>
              </Col>
              <Col className="d-none">{stock}</Col>
            </Row>
            <Row>
              <Col>
                {stock ? (
                  <Button value={pid} onClick={handleClick} className="w-100">
                    Add to Cart
                  </Button>
                ) : (
                  <Button className="w-100" disabled>
                    Sold Out
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
