import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useDeleteAccount, useLogout, useUpdate } from "../../api";

// Icon
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdReturnLeft, IoMdSettings } from "react-icons/io";
import Profile from "../../assets/profile.png";

// Components
import Button from "../../components/Button";
import ComfirmModel from "../../components/ComfirmModel";
import FloatingLabel from "../../components/FloatingLabel";
import ResetPassword from "../ResetPassword";

// Hooks
import { useNavigate } from "react-router-dom";

import FormField from "./FormField";

export default function ProfileCard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = queryClient.getQueryData(["me"]);

  const { username: old_username, email: old_email, image: old_image } = user;

  const [username, setUsername] = useState(old_username);
  const [image, setImage] = useState(old_image);
  const [edit, setEdit] = useState(false);
  const [preview, setPreview] = useState(old_image);
  const [editPassword, setEditPassword] = useState(false);

  const [error, setError] = useState({});

  const { isLoading, isSuccess, mutate: update } = useUpdate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});

    const formData = {};
    if (username !== old_username) formData.username = username;
    if (image !== old_image) formData.image = image;

    const error = (err) => {
      const data = err.response.data;
      for (const [key, val] of Object.entries(data))
        setError((prev) => ({ ...prev, [key]: val[0] }));
    };
    const success = () => setEdit(false);

    update(formData, {
      onError: error,
      onSuccess: success,
    });
  };

  const back = () => {
    setUsername(old_username);
    setImage(old_image);
    if (editPassword) return setEditPassword(false);
    if (edit) setEdit(false);
  };

  const onChangePreview = (files) => {
    // const files = e.target.files;
    const ImagesArray = Object.entries(files).map((e) =>
      URL.createObjectURL(e[1])
    );
    setPreview([...ImagesArray]);
    setImage(...files);
  };

  const [show, setShow] = useState(false);
  const [current_password, setPassword] = useState("");

  const { mutate: deleteAccount, isLoading: deleteLoading } =
    useDeleteAccount();
  const { mutate: logout } = useLogout();

  const handleDeleteAccount = () => {
    if (!current_password)
      return setError({ current_password: "Please enter your password." });

    const onError = (err) => {
      const data = err.response.data;
      for (const [key, val] of Object.entries(data))
        setError((prev) => ({ ...prev, [key]: val[0] }));
    };

    deleteAccount({ current_password }, { onError });
  };

  function Icon() {
    if (edit)
      return (
        <IoMdReturnLeft
          size="2rem"
          className="icon me-2 top-left"
          onClick={back}
        />
      );

    return (
      <div className="d-flex top-right">
        <IoMdSettings
          onClick={() => setEdit((prev) => !prev)}
          className="icon"
          size="2rem"
        />
        <HiOutlineLogout onClick={logout} className="icon" size="2rem" />
      </div>
    );
  }

  return (
    <>
      <ComfirmModel
        variant="danger"
        title="DELETE ACCOUNT"
        body="Are you sure to delete you account? Never be recovered."
        confirm="DELETE"
        onClick={handleDeleteAccount}
        loading={deleteLoading}
        show={show}
        setShow={setShow}
        cancel
      >
        <FloatingLabel
          type="password"
          label="Current Password"
          value={current_password}
          onChange={setPassword}
          feedback={error.current_password}
        />
      </ComfirmModel>
      <Card style={{ width: "50%" }} className="py-4 mx-auto">
        <Row>
          <Col className="d-flex justify-content-center mb-3">
            <img
              src={preview}
              alt="profile"
              width="150px"
              height="150px"
              className="cover circle"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = Profile;
              }}
            />
            <Icon />
          </Col>
        </Row>
        <Form noValidate className="m-4">
          {editPassword ? (
            <ResetPassword.Form
              current
              onConfirm={() => setEditPassword(false)}
            />
          ) : (
            <>
              <FormField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!edit || isLoading || isSuccess}
                plaintext={!edit}
              />
              <FormField
                label="Email"
                type="text"
                defaultValue={old_email}
                disabled={true}
                plaintext={!edit}
              />

              {edit ? (
                <>
                  <FormField label="Password">
                    <Button
                      variant="secondary"
                      onClick={() => setEditPassword((prev) => !prev)}
                    >
                      Change
                    </Button>
                  </FormField>
                  <FormField>
                    <FloatingLabel
                      type="file"
                      accept="image/*"
                      onChange={onChangePreview}
                      feedback={error.image}
                      reset={() => setImage(old_image)}
                      onClick={(e) => (e.target.value = "")}
                      disabled={isLoading || isSuccess}
                    />
                  </FormField>
                  <FormField>
                    <Button variant="danger" onClick={setShow}>
                      Delete Account
                    </Button>
                  </FormField>
                  <Row className="mt-4 text-center">
                    <Col>
                      <Button
                        variant="success"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isLoading || isSuccess}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : (
                <Row>
                  <Col className="text-center">
                    <Button onClick={() => navigate("address")}>Address</Button>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Form>
      </Card>
    </>
  );
}
