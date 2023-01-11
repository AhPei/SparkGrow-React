import { Col, Container, Row } from "react-bootstrap";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Orders from "./Orders";
import ProfileCard from "./ProfileCard";

export default function ProfilePage({ title }) {
  useDocumentTitle(title);

  return (
    <Container>
      <Row>
        <Col md={12} lg={6} className="mx-auto">
          <ProfileCard />
          <Orders />
        </Col>
      </Row>
    </Container>
  );
}
