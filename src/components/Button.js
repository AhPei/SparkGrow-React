import { MDBSpinner } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";

export default function MyButton({ loading, disabled, children, ...props }) {
  return (
    <Button {...props} disabled={loading || disabled}>
      {loading ? (
        <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
      ) : (
        children
      )}
    </Button>
  );
}
