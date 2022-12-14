import { useState } from "react";
import FloatingLabel from "../../../components/FloatingLabel";
import Button from "../../../components/Button";
import { useChangePassword, useResetPassword } from "../../../api";
import { Row, Col } from "react-bootstrap";
import isEmpty from "../../../utils/isEmpty";
import { useParams } from "react-router-dom";

export default function ChangePasswordForm({ current, onConfirm }) {
  const [error, setError] = useState({});
  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setPassword] = useState("");
  const [re_new_password, setRePassword] = useState("");

  const { uid, token } = useParams();

  const {
    isLoading: changeLoading,
    isSuccess: changeSuccess,
    mutate: change,
  } = useChangePassword();
  const {
    isLoading: resetLoading,
    isSuccess: resetSuccess,
    mutate: reset,
  } = useResetPassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    let isError = {};

    if (current && !current_password) isError.current_password = "Required";
    if (!new_password) isError.new_password = "Required";
    if (!re_new_password) isError.re_new_password = "Required";

    if (!isEmpty(isError)) return setError(isError);

    if (new_password !== re_new_password)
      return setError({ ["re_new_password"]: "Password does not match!" });

    setError({});

    const error = (err) => {
      const data = err.response.data;
      for (const [key, val] of Object.entries(data))
        setError((prev) => ({ ...prev, [key]: val[0] }));
    };

    if (current) {
      change(
        { current_password, new_password, re_new_password },
        { onError: error }
      );
    } else {
      reset({ uid, token, new_password, re_new_password }, { onError: error });
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h4>{current ? "Change" : "Reset"} Password</h4>
        </Col>
      </Row>
      {current && (
        <FloatingLabel
          type="password"
          label="Current Password"
          value={current_password}
          onChange={setCurrentPassword}
          feedback={error.current_password}
          disabled={
            changeLoading || changeSuccess || resetSuccess || resetLoading
          }
        />
      )}
      <FloatingLabel
        type="password"
        label="New Password"
        value={new_password}
        onChange={setPassword}
        feedback={error.new_password}
        disabled={
          changeLoading || changeSuccess || resetSuccess || resetLoading
        }
      />
      <FloatingLabel
        type="password"
        label="Confirm New Password"
        value={re_new_password}
        onChange={setRePassword}
        feedback={error.re_new_password}
        disabled={
          changeLoading || changeSuccess || resetSuccess || resetLoading
        }
      />
      <Row>
        <Col>
          {error?.token && <span className="error">{error.token}</span>}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end gap-3">
          <Button
            variant="success"
            onClick={(e) => handleSubmit(e)}
            loading={
              changeLoading || changeSuccess || resetSuccess || resetLoading
            }
          >
            {current ? "Change" : "Reset"} Password
          </Button>
        </Col>
      </Row>
    </>
  );
}
