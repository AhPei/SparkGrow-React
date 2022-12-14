import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FcRight } from "react-icons/fc";
import { VscDebugRestart } from "react-icons/vsc";

export default function FormCheck({ list, setData, id, old }) {
  const leftName = "Category";
  const rightName = "Selected";

  // Left
  const [left, setLeft] = useState(list);
  // Right
  const [right, setRight] = useState([]);

  const resetData = () => {
    if (old?.length > 0) {
      const empty = [];
      old.map((value) => empty.push(value[id]));
      const filter = list.filter((prev) => !empty.includes(prev[id]));
      setLeft(filter);
      setRight(old);
    } else {
      setLeft(list);
      setRight([]);
    }
  };

  useEffect(() => {
    if (old?.length > 0) {
      old.map((value) => {
        // Remove the right from left
        setLeft((prev) =>
          prev.filter(
            (prevData) => JSON.stringify(prevData) !== JSON.stringify(value)
          )
        );
      });
      // Add the right to right
      setRight(old);
    }
  }, [old]);

  const select = (value) => {
    setData((prev) => [...prev, value[id]]);
    setRight((prev) => [...prev, value]);
    setLeft((prev) => prev.filter((prev) => prev !== value));
  };
  const unselect = (value) => {
    setData((prev) => prev.filter((prev) => prev[id] !== value[id]));
    setRight((prev) => prev.filter((prev) => prev !== value));
    setLeft((prev) => [...prev, value]);
  };

  return (
    <Row md={3}>
      <Col md={5} className="border">
        <h5 className="text-center">{leftName}</h5>
        <Row md={2}>
          {left
            ?.sort((a, b) => a.name.localeCompare(b.name))
            ?.map((data, idx) => (
              <Col key={idx}>
                <div onClick={() => select(data)} className="formCheck">
                  {data.name}
                </div>
              </Col>
            ))}
        </Row>
      </Col>
      <Col md={2} className="d-flex justify-content-center">
        <VscDebugRestart
          className="pointer my-auto"
          style={{ position: "absolute" }}
          color="black"
          size="2.5rem"
          onClick={resetData}
        />
        <FcRight size="10rem" className="my-auto" />
      </Col>
      <Col md={5} className="border">
        <h5 className="text-center">{rightName}</h5>
        <Row md={2}>
          {right
            // .sort((a, b) => a.name.localeCompare(b.name))
            ?.map((data, idx) => (
              <Col key={idx}>
                <div
                  onClick={() => unselect(data)}
                  className="formCheck active"
                >
                  {data.name}
                </div>
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  );
}
