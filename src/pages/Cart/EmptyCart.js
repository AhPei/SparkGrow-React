import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/Button";

export default function EmptyCart() {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col className="justify-content-center d-flex">
          Empty cart! Go add something!
        </Col>
      </Row>
      <Row>
        <Col className="justify-content-center d-flex">
          <MyButton onClick={() => navigate("/")}>Home</MyButton>
        </Col>
      </Row>
    </Container>
  );
}
