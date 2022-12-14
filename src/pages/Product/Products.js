// import React from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { useProductsPage } from "../api/product";
// import Button from "../components/Button";
// // React Query

// export default function Products() {
//   const [page, setPage] = React.useState(1);

//   const { isLoading, isError, error, data } = useProductsPage(page);

//   if (isLoading) return <span>Loading...</span>;

//   if (isError) return <span>Error: {error.message}</span>;

//   const handleClick = async (id) => {};

//   return (
//     <>
//       <Container className="mt-3">
//         <Row>
//           <Col className="d-flex justify-content-center">
//             <Button
//               onClick={() => setPage((prev) => prev - 1)}
//               disabled={!data.previous}
//             >
//               Previous Page
//             </Button>
//             <p className="mx-3">{page}</p>
//             <Button
//               onClick={() => setPage((prev) => prev + 1)}
//               // Disable the Next Page button until we know a next page is available
//               disabled={!data.next}
//             >
//               Next Page
//             </Button>
//           </Col>
//         </Row>
//       </Container>
//       <Container>
//         <Row xs={1} md={4}>
//           {data.results.map(({ id, name, desc, stock, unitprice }, idx) => (
//             <Col key={idx} onClick={() => handleClick(id)}>
//               <Card className="text-center pointer">
//                 <Card.Header as="h5">{name}</Card.Header>
//                 <Card.Body>
//                   <Card.Title>RM {unitprice}</Card.Title>
//                   <Card.Subtitle>Stock: {stock}</Card.Subtitle>
//                   <Card.Text
//                     style={{
//                       textOverflow: "ellipsis",
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {desc}
//                   </Card.Text>
//                 </Card.Body>
//                 {/* <Card.Footer>
//                 <Button variant="primary" onClick={handleClick}>
//                   Add to Cart
//                 </Button>
//               </Card.Footer> */}
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </>
//   );
// }
