import { useEffect, useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import {
  useProductCategory,
  useProducts,
  useSearch,
  useSearchCategory
} from "../../api";

// Component
import Loading from "../../components/Loading";
import ProductCard from "./ProductCard";

// Infinite Page Loop
import { useInView } from "react-intersection-observer";

// Hooks
import useDebounce from "../../hooks/useDebounce";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const filterList = [
  "lowest",
  "highest",
]

export default function Home({ title }) {
  // Infinity Scroll
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const [filter, setFilter] = useState("");
  const debounce = useDebounce(filter, 500);
  const [categorySearch, setCategorySearch] = useState("");
  const [filterSearch, setFilterSearch] = useState("");

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
  const { data: categoryList, isLoading: categoryLoading } = useProductCategory();
  const { data: search, isFetching: fetchingSearch } = useSearch(debounce);
  const { data: categoryResult, isFetching: fetchingCategory } = useSearchCategory(categorySearch);
  useDocumentTitle(title, isSuccess);

  if (isError) return <span>Error: {error.message}</span>;

  const Product = () => {
    if (productLoading || categoryLoading || fetchingSearch || fetchingCategory)
      return <Loading color="green" />;

    let data = search || categoryResult || product?.pages // pages is the rest
    if (filterSearch.toLowerCase() === "lowest") data = data.sort((a, b) => a.unitprice - b.unitprice) // Ascending 
    else if (filterSearch.toLowerCase() === "highest") data = data.sort((a, b) => b.unitprice - a.unitprice) // Descending
    return <ProductCard data={data} />;
  };

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
            <FloatingLabel label="Category" style={{ minWidth: "100px" }}>
              <Form.Select value={categorySearch} onChange={(e) => setCategorySearch(e.target.value)}>
                <option value="">All</option>
                {categoryList?.map(({ id, name }) => (
                  <option
                    key={id}
                    value={id}
                    style={{ textTransform: "capitalize" }}
                  >
                    {name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Sort By" style={{ minWidth: "100px" }}>
              <Form.Select value={filterSearch} onChange={(e) => setFilterSearch(e.target.value)}>
                <option value="">All</option>
                {filterList?.map((value,idx) => (
                  <option
                    key={idx}
                    value={value}
                    style={{ textTransform: "capitalize" }}
                  >
                    {value}
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
