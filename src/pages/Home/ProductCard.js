import { Card, Col, Container, Ratio, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NoProductFound from "../../assets/no-product-found.png";

export default function ProductCard({ data }) {
  const navigate = useNavigate();
  const handleClick = (name) => {
    navigate(`/products/${name}`);
  };

  if (data.length===0) {
    return (
      <Container className="screen-center">
        <Row>
          <Col>No Result</Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container>
      <Row xs={1} md={4} className="g-4">
        {data.map(({ id, name, desc, image, stock, unitprice }, idx) => (
          <Col key={idx}>
            <Card
              onClick={() => handleClick(name)}
              className="text-center pointer"
              style={{ backgroundColor: stock === 0 && "#dddddd" }}
            >
              {/* 1x1 4x3 16x9 21x9 */}
              {/* <Ratio aspectRatio="4x3"> */}
              <Ratio aspectRatio="4x3">
                <Card.Img
                  variant="top"
                  src={image[0] ?? NoProductFound}
                  className="w-100 h-100 cover"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = NoProductFound;
                  }}
                />
              </Ratio>
              <Card.Header as="h5" className="text-ellipsis" >{name}</Card.Header>

              <Card.Body>
                <Card.Title>RM {unitprice}</Card.Title>
                <Card.Subtitle>
                  {stock ? "Stock:" + stock : "Sold Out"}
                </Card.Subtitle>
                <Card.Text className="text-nowrap overflow-hidden text-truncate">
                  {desc}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
