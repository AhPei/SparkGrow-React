import { MDBSpinner } from "mdb-react-ui-kit";
import { Col, Container, Row } from "react-bootstrap";

export default function Loading({ color, className, style }) {
  if (color === "red") color = "danger";
  if (color === "orange") color = "warning";
  if (color === "green") color = "success";
  if (color === "blue") color = "info";
  if (color === "darkblue") color = "primary";
  if (color === "purple") color = "secondary";
  if (color === "dark") color = "dark";
  if (color === "white") color = "light";

  return (
    <Container>
      <Row>
        <Col
          className={"screen-center " + className}
          style={style}
          // className="d-flex align-items-center justify-content-center text-center "
          // style={{ minHeight: "90vh" }}
        >
          {/* <PulseLoader loading={true} size={30} /> */}
          <MDBSpinner className="ms-2" color={color}>
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </Col>
      </Row>
    </Container>
  );
}
