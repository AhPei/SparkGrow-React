import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import FloatingLabel from "../../components/FloatingLabel";
import { useCountdown } from "../../hooks/useCountdown";
import isEmpty from "../../utils/isEmpty";

const MONTH = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const YEAR = [
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
  "2033",
];

const STRING = /[}"`~_=.\->\]|<?+*/,\d;\[:{\\!@#\/'$%^&*()]/;
const NUMBER = /[A-Za-z}"`~_=.\->\]|<?+*/,;\[:{\\!@#\/'$%^&*()]/;
const FIVE_MINUTES = 5 * 60 * 1000;

Number.prototype.zeroPad = function () {
  return ("0" + this).slice(-2);
};

export default function PaymentForm({ setSuccess }) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [focus, setFocus] = useState("");

  const [error, setError] = useState({});

  //storing data on submit button click
  const submit = (e) => {
    // sessionStorage.setItem("user", JSON.stringify(this.state));
    e.preventDefault();

    let temp = {};

    if (!number) temp.number = " ";
    if (!name) temp.name = " ";
    if (!month) temp.month = " ";
    if (!year) temp.year = " ";
    if (!cvv) temp.cvv = " ";

    if (!isEmpty(temp)) return setError(temp);

    if (number.replaceAll(" ", "").length !== 16)
      return setError({ number: "Invalid" });

    setError({});

    return setSuccess(true);
  };

  // 0-9 + backspace
  const removeSpecial = (e) => {
    const { keyCode } = e;
    if (keyCode >= "48" || keyCode <= "57" || keyCode == "8") return;
    e.preventDefault();
  };

  // Add space after 4 number in Card Number
  const addSpace = (e) => {
    const { type } = e;
    const { value } = e.target;

    if (type === "keypress")
      if (value.length === 4 || value.length === 9 || value.length === 14)
        e.target.value = value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");

    if (type === "keyup")
      if (value.length === 5 || value.length === 10 || value.length === 15)
        e.target.value = value.replace(/\W+$/, "");
  };

  // Focus Card
  const handleInputFocus = (e) => setFocus(e.target.name);

  const [days, hours, minutes, seconds] = useCountdown(FIVE_MINUTES);

  // Prevent Reload
  useEffect(() => {
    const refresh = (e) => (e.returnValue = "");
    window.addEventListener("beforeunload", refresh);
    return () => window.removeEventListener("beforeunload", refresh);
  }, []);

  const remaining = days + hours + minutes + seconds;

  const CountDown = (
    <p className={minutes <= 0 && seconds <= 10 ? "error" : ""}>
      {minutes.zeroPad()}: {seconds.zeroPad()}
    </p>
  );

  if (remaining <= 0) {
    return (
      <Container className="text-center" style={{ maxWidth: "33rem" }}>
        <h3>Failed to make the transaction!</h3>
        <Button onClick={() => {}}>Back</Button>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: "33rem" }}>
      <div className="mt-3">
        <Cards
          locale={{ valid: "Expires" }}
          placeholders={{ name: "FULL NAME" }}
          focused={focus}
          number={number}
          name={name}
          expiry={month + "/" + year}
          cvc={cvv}
        />
      </div>
      <Card className="p-3 mt-3">
        <Form>
          <Row>
            <Col>
              <FloatingLabel
                name="number"
                label="Card Number"
                value={number}
                onChange={setNumber}
                pattern={NUMBER}
                onKeyDown={removeSpecial}
                onKeyPress={addSpace}
                onKeyUp={addSpace}
                onPaste={(e) => e.preventDefault()}
                onFocus={handleInputFocus}
                maxLength="19"
                feedback={error.number}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                name="name"
                label="Cardholder Name"
                value={name}
                onChange={setName}
                pattern={STRING}
                onPaste={(e) => e.preventDefault()}
                onFocus={handleInputFocus}
                feedback={error.name}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Select
                name="expiry"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                onFocus={handleInputFocus}
                isInvalid={error.month}
              >
                <option value="" defaultChecked="true">
                  Month
                </option>
                {MONTH.map((data, idx) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                name="expiryyear"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onFocus={handleInputFocus}
                isInvalid={error.year}
              >
                <option value="" defaultChecked="true">
                  Year
                </option>
                {YEAR.map((data, idx) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <FloatingLabel
                name="cvc"
                label=""
                value={cvv}
                onChange={setCvv}
                pattern={NUMBER}
                onKeyDown={removeSpecial}
                onPaste={(e) => e.preventDefault()}
                onFocus={handleInputFocus}
                maxLength="3"
                prefix="CVV"
                feedback={error.cvv}
              />
            </Col>
          </Row>
          <Row>
            <Col>{CountDown}</Col>
            <Col className="text-right">
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={submit}
              >
                Pay
              </button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}
