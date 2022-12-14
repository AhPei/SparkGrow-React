import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import ChangePasswordForm from "./components/ChangePasswordForm";
import { Card, Container } from "react-bootstrap";

export default function ResetPassword({ title }) {
  useDocumentTitle(title);
  const navigate = useNavigate();

  return (
    <Container className="screen-center">
      <Card className="p-3" style={{ width: "30%" }}>
        <ChangePasswordForm onConfirm={() => navigate("/")} />
      </Card>
    </Container>
  );
}
