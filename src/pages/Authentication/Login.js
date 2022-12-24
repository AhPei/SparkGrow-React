import { useState } from "react";
import { Card, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../api";
import Button from "../../components/Button";
import FloatingLabel from "../../components/FloatingLabel";


// Hooks
import toast from "react-hot-toast";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function Loginpage({ title }) {
  useDocumentTitle(title);

  const [email, setEmail] = useState("gohpeisheng@gmail.com");
  const [password, setPassword] = useState("001019");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const { isLoading, isSuccess, mutate: login } = useLogin();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(validEmail))
      return toast.error("Please enter valid email");
    if (!email || !password) return toast.error("Please fill up all field");

    login({ email, password });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="overflow-hidden py-3" style={{ width: "500px" }}>
        <h2 className="center">Login</h2>
        <hr />
        <Form noValidate onSubmit={handleSubmit} className="px-4 py-2">
          <Row>
            <FloatingLabel
              floating
              type="email"
              label="Email Address"
              value={email}
              onChange={setEmail}
              disabled={isLoading || isSuccess}
            />
          </Row>
          <Row>
            <FloatingLabel
              floating
              type="password"
              label="Password"
              value={password}
              onChange={setPassword}
              disabled={isLoading || isSuccess}
            />
          </Row>
          <p
            onClick={() => navigate("/password/reset/confirm")}
            className="pointer d-inline-block"
          >
            Forgot password?
          </p>
          <Button
            type="submit"
            loading={isLoading || isSuccess}
            className="w-100 py-2"
            style={{ borderRadius: "50px" }}
          >
            Login
          </Button>
        </Form>
        <Row className="d-inline text-center mt-3">
          Not a member?
          <Link to="/signup" relative="path">
            Signup
          </Link>
        </Row>
      </Card>
    </Container>
  );
}
