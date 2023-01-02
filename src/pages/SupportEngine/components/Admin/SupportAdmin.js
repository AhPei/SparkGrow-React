import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Loading } from "../../../../components";

import useWebSocket_SupportChat from "../../hooks/useWebSocket_SupportChat";
import useWebSocket_UserList from "../../hooks/useWebSocket_UserList";
import Chat from "./Chat";
import ChatList from "./ChatList";
import Header from "./Header";

function SupportAdmin() {
  // Left
  const { loading: SupportLoading, messages: userList, readMessage } = useWebSocket_UserList({ supporter: true });

  const [select, setSelect] = useState("");

  // Right
  const { onSubmit, messages, loading } = useWebSocket_SupportChat({
    caseID: select.caseID,
    start: !!select,
  });

  useEffect(() => {
    console.log(select.status)
    readMessage(select.caseID)
  }, [select.caseID, messages]);

  if (SupportLoading) return <Loading />

  return (
    <Container
      className="mt-3 overflow-hidden fullscreen"
      style={{
        border: "2px solid #e3e3e3",
        borderRadius: "25px",
        backgroundColor: "#c9c9c9",
      }}
    >
      <Row className="h-100">
        <Col className="h-100">
          <Row style={{ borderBottom: "1px solid black", height: "100px" }}>
            <Col
              sm={5}
              lg={4}
              xl={3}
              style={{
                borderRight: "1px solid black",
                backgroundColor: "#c9c9c9",
                fontSize: "20px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
              className="d-flex justify-content-center align-items-center"
            >
              Users
            </Col>
            <Col
              style={{ backgroundColor: "#c9c9c9" }}
              className="d-flex align-items-center"
            >
              {select && (
                <Header
                  caseID={select.caseID}
                  username={select.username}
                  image={select.image}
                  status={select.status}
                />
              )}
            </Col>
          </Row>
          <Row style={{ height: "calc(100% - 100px)" }}>
            <Col
              sm={5}
              lg={4}
              xl={3}
              style={{
                borderRight: "1px solid black",
                backgroundColor: "#c9c9c9",
              }}
              className="px-0 h-100"
            >
              <ChatList
                chatList={userList}
                handleSelect={setSelect}
                case_ID={select.caseID}
                readMessage={readMessage}
              />
            </Col>
            <Col style={{ backgroundColor: "#c9c9c9" }} className="px-0 h-100">
              {select && (
                <Chat
                  messages={messages}
                  onSubmit={onSubmit}
                  loading={loading}
                  status={select.status}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SupportAdmin;
