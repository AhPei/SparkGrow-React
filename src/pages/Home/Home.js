import { useEffect, useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useProductCategory, useProducts } from "../../api";

// Component
import Loading from "../../components/Loading";
import ProductCard from "./ProductCard";

// Infinite Page Loop
import { useInView } from "react-intersection-observer";

// Hooks
import useDocumentTitle from "../../hooks/useDocumentTitle";

const filterList = [
  { name: "lowest", value: "unitprice" },
  { name: "highest", value: "-unitprice" },
];

export default function Home({ title }) {
  // Infinity Scroll
  const { ref, inView } = useInView();

  // inView will be trigger when the screen reach the elemnt detecting by ref
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const [filter, setFilter] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  // const nameSearch = useDebounce(filter, 1000); // Search Name
  const [categorySearch, setCategorySearch] = useState(""); // Clothing...
  const [filterSearch, setFilterSearch] = useState(""); // LowestPrice...

  useEffect(() => {
    if (filter === "") setNameSearch("");
  }, [filter]);

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
  } = useProducts(categorySearch, nameSearch, filterSearch);
  const { data: categoryList, isLoading: categoryLoading } =
    useProductCategory();

  useDocumentTitle(title, isSuccess);

  if (isError) return <span>Error: {error.message}</span>;

  if (productLoading || categoryLoading) return <Loading color="green" />;

  return (
    <>
      <Container className="mb-3">
        <Row>
          <Col xs={4}>
            <FloatingLabel label="Search">
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setNameSearch(e.target.value);
                }}
              />
            </FloatingLabel>
          </Col>
          <Col xs={4}>
            <FloatingLabel label="Category">
              <Form.Select
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                style={{ textTransform: "capitalize" }}
              >
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
          <Col xs={4}>
            <FloatingLabel label="Sort By" style={{ minWidth: "100px" }}>
              <Form.Select
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
              >
                <option value="">All</option>
                {filterList?.map(({ name, value }, idx) => (
                  <option
                    key={idx}
                    value={value}
                    style={{ textTransform: "capitalize" }}
                  >
                    {name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
      </Container>
      <ProductCard data={product?.pages} />
      <Container className="mt-3">
        <Row>
          <Col className="d-flex justify-content-center">
            {hasNextPage && (
              <div
                ref={ref}
                disabled={!hasNextPage || isFetchingNextPage}
                onClick={() => fetchNextPage()}
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
