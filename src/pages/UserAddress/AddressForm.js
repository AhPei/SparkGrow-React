import React, { useEffect, useState } from "react";
import { Col, Row, Form, Modal } from "react-bootstrap";
import { useAddAddress, useUpdateAddress } from "../../api";
import Button from "../../components/Button";
import FloatingLabel from "../../components/FloatingLabel";
import isEmpty from "../../utils/isEmpty";

export default function AddressForm({ show, setShow, data }) {
  const {
    id,
    consignee: old_consignee,
    address: old_address,
    city: old_city,
    postcode: old_postcode,
    country: old_country,
    contact: old_contact,
  } = data || {};

  const [consignee, setConsignee] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    if (data) {
      setConsignee(old_consignee);
      setContact(old_contact);
      setAddress(old_address);
      setPostcode(old_postcode);
      setCity(old_city);
      setCountry(old_country);
    }
  }, [data]);

  const { mutate: add } = useAddAddress();
  const { mutate: update } = useUpdateAddress(id);

  const handleSubmit = () => {
    const err = {};
    if (consignee === "") err.consignee = "Required";
    if (contact === "") err.contact = "Required";
    if (address === "") err.address = "Required";
    if (city === "") err.city = "Required";
    if (postcode === "") err.postcode = "Required";
    if (country === "") err.country = "Required";
    if (!isEmpty(err)) return setError(err);
    setError({});

    const body = {};

    if (consignee !== old_consignee) body.consignee = consignee;
    if (contact !== old_contact) body.contact = contact;
    if (address !== old_address) body.address = address;
    if (postcode !== old_postcode) body.postcode = postcode;
    if (city !== old_city) body.city = city;
    if (country !== old_country) body.country = country;

    const success = () => {
      setShow(false);
      setConsignee("");
      setContact("");
      setAddress("");
      setPostcode("");
      setCity("");
      setCountry("");
    };

    if (data) {
      update(body, {
        onSuccess: success,
      });
    } else {
      console.log(body);
      add(body, {
        onSuccess: success,
      });
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered backdrop={true}>
      <Modal.Header closeButton>
        <Modal.Title>{data ? "Edit" : "Add"} Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <FloatingLabel
                floating
                label="Consignee"
                value={consignee}
                onChange={setConsignee}
                feedback={error.consignee}
                reset={data && (() => setConsignee(old_consignee))}
              />
            </Col>
            <Col>
              <FloatingLabel
                floating
                label="Contact"
                value={contact}
                onChange={setContact}
                feedback={error.contact}
                reset={data && (() => setContact(old_contact))}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                floating
                label="Address Line 1"
                value={address}
                onChange={setAddress}
                feedback={error.address}
                reset={data && (() => setAddress(old_address))}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                floating
                label="Zip / Postcode"
                value={postcode}
                onChange={setPostcode}
                feedback={error.postcode}
                reset={data && (() => setPostcode(old_postcode))}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                floating
                label="City"
                value={city}
                onChange={setCity}
                feedback={error.city}
                reset={data && (() => setCity(old_city))}
              />
            </Col>

            <Col>
              <FloatingLabel
                floating
                label="Country"
                value={country}
                onChange={setCountry}
                feedback={error.consignee}
                reset={data && (() => setCountry(old_country))}
              />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end gap-3">
              <Button variant="secondary" onClick={() => setShow(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Save</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
