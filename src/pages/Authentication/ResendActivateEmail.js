import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { IoMdReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSendResetActivation } from "../../api";

import Button from "../../components/Button";
import FloatingLabel from "../../components/FloatingLabel";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function ResendActivateEmail({ title }) {
  useDocumentTitle(title);
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const { isLoading, mutate: resend } = useSendResetActivation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") return setError({ email: "This field is required." });

    setError({});

    const onError = (err) => {
      const data = err.response.data;
      setError(data);
    };
    const onSuccess = () => toast.success("Email was sent successfully");
    resend({ email }, { onError, onSuccess });
  };

  return (
    <>
      <Container className="screen-center">
        <Card className="p-3" style={{ width: "30%" }}>
          <Row>
            <Col>
              <Card.Title>
                <IoMdReturnLeft
                  className="me-3 pointer"
                  onClick={() => navigate("/")}
                />
                Resend Activate Account
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                floating
                type="email"
                label="Email Address"
                value={email}
                onChange={setEmail}
                feedback={error.email}
              />
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col>
              <Button onClick={handleSubmit} loading={isLoading}>
                Resend
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
