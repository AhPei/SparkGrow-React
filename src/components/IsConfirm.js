import { Modal } from "react-bootstrap";
import Button from "./Button";

export default function IsConfirm({ show, setShow, onConfirm }) {
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => setShow(false)}>
          CANCEL
        </Button>
        <Button
          onClick={() => {
            setShow(false);
            onConfirm();
          }}
        >
          YES
        </Button>
      </Modal.Footer>
    </Modal>
  );
}