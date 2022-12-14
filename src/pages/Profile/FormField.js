import { Col, Form, Row } from "react-bootstrap";

export default function FormField({ label, children, ...props }) {
  return (
    <Form.Group as={Row} className="mb-2">
      <Form.Label column sm="4" className="text-right">
        {label && label + ":"}
      </Form.Label>
      <Col sm="8">{children ? children : <Form.Control {...props} />}</Col>
    </Form.Group>
  );
}
