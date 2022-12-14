import { useState } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";

// Components
import Button from "../../components/Button";
import FloatingLabel from "../../components/FloatingLabel";

import { useRegister } from "../../api";
import { useNavigate, Link } from "react-router-dom";

// Hooks
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function SignUp({ title }) {
  useDocumentTitle(title);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState({});
  const { isLoading, isSuccess, mutate: register } = useRegister();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = (err) => setError(err.response.data);

    const body = { username, email, password, re_password: repassword };
    register(body, {
      onError: error,
      onSuccess: () => setTimeout(() => navigate("/"), 3000),
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="overflow-hidden py-3" style={{ width: "500px" }}>
        <h2 className="center">Create an Account</h2>
        <hr />
        <Form noValidate onSubmit={handleSubmit} className="px-4 py-2">
          <Row>
            <Col>
              <FloatingLabel
                floating
                type="email"
                label="Email Address"
                value={email}
                onChange={setEmail}
                feedback={error.email}
                disabled={isLoading || isSuccess}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                floating
                label="Username"
                value={username}
                onChange={setUsername}
                feedback={error.username}
                disabled={isLoading || isSuccess}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <FloatingLabel
                floating
                type="password"
                label="Password"
                value={password}
                onChange={setPassword}
                feedback={error.password}
                disabled={isLoading || isSuccess}
              />
            </Col>
            <Col md>
              <FloatingLabel
                floating
                type="password"
                label="Confirm Password"
                value={repassword}
                onChange={setRepassword}
                feedback={error.repassword}
                disabled={isLoading || isSuccess}
              />
            </Col>
          </Row>
          <Button
            type="submit"
            loading={isLoading || isSuccess}
            className="w-100"
            style={{ borderRadius: "50px" }}
          >
            Register
          </Button>
        </Form>

        <Row className="d-inline text-center mt-3">
          Already a member?
          <Link to="/login" relative="path">
            Login
          </Link>
        </Row>
      </Card>
    </Container>
  );
}
