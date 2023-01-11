import { Badge, Col, Ratio, Row, Stack } from "react-bootstrap";
import Profile from "../../../../assets/profile.png";

// Left
export default function ChatList({ chatList, handleSelect, case_ID }) {

  return (
    <>
      <Stack
        gap={0}
        className="px-2 h-100"
        style={{
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {chatList.map(
          (
            {
              sender: username,
              content,
              image,
              timestamp,
              status,
              newMessage,
              caseID,
            },
            key
          ) => (
            <Row
              key={key}
              className="pointer py-2 my-0"
              onClick={() => handleSelect({ username, image, status, caseID })}
              style={{
                borderBottom: "2px solid #e3e3e3",
                backgroundColor: case_ID === caseID && "#c7c7c7",
              }}
            >
              <Col xs={2} className="pe-0 my-auto">
                <Ratio aspectRatio="1x1">
                  <img
                    src={image ?? Profile}
                    alt="User Profile"
                    className="thumbnail"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = Profile;
                    }}
                  />
                </Ratio>
              </Col>
              <Col style={{ fontSize: "max(16px, 0.8vw)" }}>
                <Row>
                  <Col className="text-ellipsis pe-0" style={{ width: 0 }}>
                    {username} | {caseID}
                  </Col>
                  <Col
                    xs={6}
                    lg={5}
                    xl={4}
                    style={{ color: "grey" }}
                    className="text-right"
                  >
                    {timestamp}
                  </Col>
                </Row>
                <Row>
                  <Col
                    className="text-ellipsis pe-0"
                    style={{ color: "grey", width: 10 }}
                  >
                    {content}
                  </Col>
                  <Col xs={6} lg={5} xl={4} className="text-right ps-0">
                    {status === true ? (
                      newMessage > 0 && <Badge>{newMessage}</Badge>
                    ) : (
                      <Badge bg="danger">Closed</Badge>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          )
        )}
      </Stack>
    </>
  );
}
