import { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useAddAddress, useUpdateAddress } from "../../api";
import Button from "../../components/Button";
import FloatingLabel from "../../components/FloatingLabel";
import isEmpty from "../../utils/isEmpty";

const stateList = [
  "Johor", //JHR
  "Kedah", //KDH
  "Kelantan", //KTN
  "Melaka", //MLK
  "Negeri Sembilan", //NSN
  "Pahang", //PHG
  "Penang", //PNG
  "Perak", //PRK
  "Perlis", //PLS
  "Selangor", //SGR
  "Terengganu", //TRG
  "Sabah", //SBH
  "Sarawak", //SWK
  "Kuala Lumpur", //KUL
  "Labuan", //LBN
  "Putrajaya", //PJY
];

export default function AddressForm({ show, setShow, data }) {
  const {
    id,
    consignee: old_consignee,
    contact: old_contact,
    address: old_address,
    postcode: old_postcode,
    state: old_state,
    country: old_country,
  } = data ?? {};

  const [consignee, setConsignee] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Malaysia");
  const [error, setError] = useState({});

  useEffect(() => {
    if (data) {
      setConsignee(old_consignee);
      setContact(old_contact);
      setAddress(old_address);
      setPostcode(old_postcode);
      setState(old_state);
      setCountry(old_country);
    }
  }, [data]);

  const { mutate: add, isLoading: addLoading } = useAddAddress();
  const { mutate: update, isLoading: updateLoading } = useUpdateAddress(id);

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = {};
    if (consignee === "") err.consignee = "Required";
    if (contact === "") err.contact = "Required";
    if (address === "") err.address = "Required";
    if (state === "") err.state = "Required";
    if (postcode === "") err.postcode = "Required";
    if (country === "") err.country = "Required";
    if (!isEmpty(err)) return setError(err);
    setError({});

    const body = {};

    if (consignee !== old_consignee) body.consignee = consignee;
    if (contact !== old_contact) body.contact = contact;
    if (address !== old_address) body.address = address;
    if (postcode !== old_postcode) body.postcode = postcode;
    if (state !== old_state) body.state = state;
    if (country !== old_country) body.country = country;

    const success = () => {
      setShow(false);
      setConsignee("");
      setContact("");
      setAddress("");
      setPostcode("");
      setState("");
    };

    if (data) {
      update(body, {
        onSuccess: success,
      });
    } else {
      add(body, {
        onSuccess: success,
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      backdrop={addLoading || updateLoading ? "static" : true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{data ? "Edit" : "Add"} Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FloatingLabel
                floating
                label="Consignee"
                value={consignee}
                onChange={setConsignee}
                feedback={error.consignee}
                reset={data && (() => setConsignee(old_consignee))}
                disabled={addLoading || updateLoading}
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
                disabled={addLoading || updateLoading}
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
                disabled={addLoading || updateLoading}
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
                disabled={addLoading || updateLoading}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <FloatingLabel
                floating
                label="State"
                value={state}
                onChange={setState}
                feedback={error.state}
                reset={data && (() => setState(old_state))}
              /> */}
              <Form.Select
                value={old_state ?? state}
                onChange={(e) => setState(e.target.value)}
                isInvalid={error.state}
                disabled={addLoading || updateLoading}
              >
                <option value="">State</option>
                {stateList?.sort().map((state, idx) => (
                  <option
                    key={idx}
                    value={state}
                    style={{ textTransform: "capitalize" }}
                  >
                    {state}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col>
              <FloatingLabel
                floating
                label="Country"
                readOnly
                value={country}
                onChange={setCountry}
                feedback={error.country}
                disabled={addLoading || updateLoading}
                // reset={data && (() => setCountry(old_country))}
              />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setShow(false)}
                disabled={addLoading || updateLoading}
              >
                Cancel
              </Button>
              <Button type="submit" loading={addLoading || updateLoading}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
