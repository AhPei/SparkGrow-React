import { Card, Col, Container, Row, Table } from "react-bootstrap";

export default function OrderForm({ id, items, total, children }) {
  return (
    <Container className="mx-auto">
      <Row>
        <Col>
          {id && <h4>Order ID: {id} </h4>}
          <Table
            striped
            bordered
            hover
            variant="dark"
            borderless
            className="text-center"
            style={{ width: "50rem" }}
          >
            <thead>
              <tr>
                <th>Item</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ name, unitprice, quantity }, idx) => (
                <tr key={idx}>
                  <td>{name}</td>
                  <td>RM {unitprice.toFixed(2)}</td>
                  <td>{quantity}</td>
                  <td>RM {(unitprice * quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col>
          <Card
            bg="dark"
            text="light"
            border="primary"
            // style={{ width: "20rem" }}
          >
            <h3 className="ms-2 mt-2">Summary</h3>
            <hr className="m-0" />
            <Table variant="dark">
              <tbody>
                <tr>
                  <td>Item Total:</td>
                  <td>RM {total.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Estimated shipping cost:</td>
                  <td>RM 0.00</td>
                </tr>
                <tr>
                  <td>Taxes total:</td>
                  <td>RM 0.00</td>
                </tr>
                <tr>
                  <td>Heavy fee:</td>
                  <td>RM 0.00</td>
                </tr>
              </tbody>
            </Table>
          </Card>
          {children}
        </Col>
      </Row>
    </Container>
  );
}
