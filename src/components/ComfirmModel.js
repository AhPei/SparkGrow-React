import { Modal } from "react-bootstrap";
import Button from "../components/Button";

export default function ComfirmModel({
  variant,
  show,
  setShow,
  title,
  body,
  confirm,
  onClick,
  closeButton,
  stick,
  children,
  loading,
}) {
  if (stick) stick = "static";

  return (
    <Modal show={show} onHide={() => setShow(false)} centered backdrop={stick}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body} {children}
      </Modal.Body>
      <Modal.Footer>
        {!stick && (
          <Button
            variant="light"
            onClick={() => setShow(false)}
            disabled={loading}
          >
            CANCEL
          </Button>
        )}
        <Button variant={variant} onClick={onClick} loading={loading}>
          {confirm}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
