import { useState } from "react";
import FloatingLabel from "../../components/FloatingLabel";
import ComfirmModel from "../../components/ComfirmModel";
import Button from "../../components/Button";
import { useSendResetPassword } from "../../api";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { Card, Col, Container, Row } from "react-bootstrap";
import { IoMdReturnLeft } from "react-icons/io";

export default function SendResetPassword({ title }) {
  useDocumentTitle(title);
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const { isLoading, mutate: send } = useSendResetPassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") return setError({ ["email"]: "This field is required." });

    setError({});

    const error = (err) => {
      const data = err.response.data;
      setError({ ["email"]: data[0] });
    };

    const success = () => setShow(true);

    send(
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
        body="Please check your email to reset your password."
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
                Reset Password
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                floating
                type="email"
                label="Email Address"
                placeholder="Email Address"
                value={email}
                onChange={setEmail}
                feedback={error.email}
              />
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col>
              <Button onClick={handleSubmit} loading={isLoading}>
                Reset Password
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
