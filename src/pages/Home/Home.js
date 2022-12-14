import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import {
  useProductCategory,
  useProducts,
  useSearch,
  useSearchCategory,
} from "../../api";

// Component
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import ProductCard from "./ProductCard";

// Infinite Page Loop
import { useInView } from "react-intersection-observer";

// Hooks
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useQueryClient } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";

export default function Home({ title }) {
  // Infinity Scroll
  const { ref, inView } = useInView();
  
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const debounce = useDebounce(filter, 1000);
  const { data: user } = useQueryClient().getQueryData(["me"]);
  const { is_staff } = user;
  const [pid, setPid] = useState("");

  const {
    isLoading: productLoading,
    isError,
    error,
    data: product,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useProducts();
  const { data: category, isLoading: categoryLoading } = useProductCategory();
  const { data: search, isFetching: fetchingSearch } = useSearch(debounce);
  const { data: categoryResult, isFetching: fetchingCategory } =
    useSearchCategory(pid);
  useDocumentTitle(title, isSuccess);
  
  if (isError) return <span>Error: {error.message}</span>;

  const Product = () => {
    if (productLoading || categoryLoading || fetchingSearch || fetchingCategory) return <Loading color="green" />;
    if (categoryResult) return <ProductCard data={categoryResult} /> 
    if (search && search.length > 0 ) return <ProductCard data={search} />
    if (search && search.length === 0 && debounce) return <ProductCard data={[]} />; 
    return <ProductCard data={product.pages} />
  }


  return (
    <>
      <Container className="d-flex justify-content-between mb-3">
        <Row>
          <Col>
            <FloatingLabel label="Search">
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") setFilter(e.target.value);
                // }}
                style={{ width: "300px" }}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Category" style={{minWidth:"100px"}}>
              <Form.Select value={pid} onChange={(e) => setPid(e.target.value)}>
                <option value="">All</option>
                {category?.map(({ id, name }) => (
                  <option key={id} value={id} style={{textTransform: "capitalize"}}>
                    {name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
      </Container>
      <Product />
      <Container className="mt-3">
        <Row>
          <Col className="d-flex justify-content-center">
            {hasNextPage && (
              <div
                ref={ref}
                disabled={!hasNextPage || isFetchingNextPage}
                onClick={fetchNextPage}
              >
                {isFetching && isFetchingNextPage ? <Loading /> : "Load More"}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
