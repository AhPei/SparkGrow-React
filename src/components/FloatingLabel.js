import { Form, FloatingLabel, InputGroup } from "react-bootstrap";
import { VscDebugRestart } from "react-icons/vsc";

const MyFloatingLabel = ({
  type = "text",
  label = "Example",
  feedback,
  onChange,
  floating,
  prefix,
  suffix,
  reset,
  // pattern = /[^a-zA-Z0-9_ @.]/m,
  children,
  ...props
}) => {
  const handleChange = (e) => {
    const { value, files } = e.target;
    // console.log("VALUE>>", value);

    if (type === "currency") {
      const currencyPattern = /^(?!,$)[\d,]*\.?[\d]+$/;
      if (!currencyPattern.test(value)) return;
      return onChange(value.toCurrency());
    }

    if (type === "file") return onChange(files);

    const numberPattern = /^\d+$/i;
    if (type === "number" && !numberPattern.test(value)) return;

    const inputPattern = /[^\w\s@.]/i;
    if (type === "text" && inputPattern.test(value)) return;

    const emailInput = /[^\w@.]/i;
    if (type === "email" && emailInput.test(value)) return;

    onChange(value);
  };

  const component = (
    <>
      <Form.Control
        {...props}
        type={type}
        placeholder={label}
        isInvalid={!!feedback}
        onChange={handleChange}
      />
      <Form.Control.Feedback
        type="invalid"
        style={{ marginTop: floating ? "0" : "2.2rem" }}
      >
        {feedback}
      </Form.Control.Feedback>
      {children}
    </>
  );

  return (
    <Form.Group className="mb-4">
      <InputGroup>
        {prefix && <InputGroup.Text>{prefix}</InputGroup.Text>}
        {floating ? (
          <FloatingLabel label={label}>{component}</FloatingLabel>
        ) : (
          component
        )}

        {suffix && <InputGroup.Text>{suffix}</InputGroup.Text>}
        {reset && (
          <InputGroup.Text>
            <VscDebugRestart
              color="black"
              className="pointer"
              onClick={reset}
            />
          </InputGroup.Text>
        )}
      </InputGroup>
    </Form.Group>
  );
};

export default MyFloatingLabel;
