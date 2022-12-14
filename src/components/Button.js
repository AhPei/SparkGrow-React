import React from "react";
import { Button } from "react-bootstrap";
import { MDBSpinner } from "mdb-react-ui-kit";

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
