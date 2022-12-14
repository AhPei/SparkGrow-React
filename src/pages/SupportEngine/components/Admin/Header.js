import { Badge, Col, Ratio, Row } from "react-bootstrap";

export default function Header({ caseID, username, image, status }) {
  return (
    <h4 className="py-2 mb-0" style={{ borderBottom: "2px solid #e3e3e3" }}>
      <Row className="mx-2 align-items-center">
        <Col md="auto">
          <div style={{ position: "relative" }}>
            {/* <Ratio aspectRatio="1x1"> */}
            <img
              title="Profile Image"
              src={image}
              // width="60px"
              // height="60px"
              className="d-inline-block align-top round thumbnail"
              style={{ width: "60px", height: "60px" }}
            />
            {/* </Ratio> */}
            <div
              className="circle"
              style={{ position: "absolute", bottom: 0, right: 0 }}
            />
          </div>
        </Col>
        <Col md="auto" style={{ maxWidth: "50%" }}>
          <Row
            style={{ fontSize: "20px" }}
            // className="text-ellipsis"
          >
            {username} | CaseID: {caseID}
          </Row>
          <Row style={{ fontSize: "12px" }}>Online</Row>
        </Col>
        <Col>{status === false && <Badge bg="danger">Closed</Badge>}</Col>
      </Row>
    </h4>
  );
}
