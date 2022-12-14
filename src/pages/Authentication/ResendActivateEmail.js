import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import { IoMdReturnLeft } from "react-icons/io";
import { useSendResetActivation } from "../../api";

import Button from "../../components/Button";
import FloatingLabel from "../../components/FloatingLabel";
import ComfirmModel from "../../components/ComfirmModel";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function ResendActivateEmail({ title }) {
  useDocumentTitle(title);
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const { isLoading, mutate: resend } = useSendResetActivation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") return setError({ ["email"]: "This field is required." });

    setError({});

    const error = (err) => {
      const data = err.response.data;
      setError({ ["email"]: data });
    };
    const success = () => setShow(true);
    resend(
      { email },
      {
        onError: error,
        onSuccess: success,
      }
    );
  };

  return (
    <>
      <ComfirmModel
        show={show}
        setShow={setShow}
        onClick={() => navigate("/")}
        title="Email was sent successfully"
        body="Please check your email to activate your account."
        confirm="OK"
        stick
      />
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
