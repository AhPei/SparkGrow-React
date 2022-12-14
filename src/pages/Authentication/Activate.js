import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useActivation } from "../../api";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { Card, Container } from "react-bootstrap";

export default function Activate() {
  const param = useParams();

  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    error,
    mutate: activate,
  } = useActivation();

  const active = () => {
    activate({ uid: param.uid, token: param.token });
  };

  useEffect(() => {
    active();
  }, []);

  const login = () => navigate("/", { replace: true });
  const resend = () => navigate("/resend/activate");

  if (isLoading) return <Loading />;

  const Response = () => {
    if (isError) {
      console.log(error, error.code)
      if (error.code === "ERR_NETWORK")
      return (
        <>
            <h4>Network Error</h4>
            <p>Please check your connection.</p>
            <Button onClick={active}>Try Again</Button>
          </>
        );
        return (
          <>
            <h4>Invalid Token</h4>
            <p>you may try to login or resend a activation email.</p>
            <Button onClick={login}>Login</Button>
            <hr />
            <Button onClick={resend}>Resend Activation Email</Button>
          </>
        );
    }
  };

  return (
    <Container className="screen-center">
      <Card className="p-3">
        <Response />
      </Card>
    </Container>
  );
}
