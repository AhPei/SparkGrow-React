// import PropTypes from "prop-types";
import ChatWindow from "./ChatWindow";
import launcherIcon from "./../assets/logo-no-bg.svg";
import launcherIconActive from "./../assets/close-icon.png";
import useWebSocket from "../../../hooks/useWebSocket";

import { useEffect } from "react";
import useSyncSessionStorage from "../../../hooks/useSyncSessionStorage";

function SupportWindow() {
  const [newMessagesCount, setNewMessagesCount] = useSyncSessionStorage(
    "newMessagesCount",
    0
  );
  const [start, setStart] = useSyncSessionStorage("start", false);
  const [isOpen, setIsOpen] = useSyncSessionStorage("open", false);

  const {
    socket,
    onSubmit,
    messages,
    isRefetching: loading,
  } = useWebSocket({ start });

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    setNewMessagesCount(0);
  };

  useEffect(() => {
    if (!isOpen && start) setNewMessagesCount((prev) => prev + 1);
  }, [messages]);

  // END CHAT?
  const onClose = () => {
    if (window.confirm("Are you sure you wish to end chat?")) {
      socket.close();
      setStart(false);
      // Show Rating Page
    }
  };

  const agentProfile = {
    teamName: "Customer Service",
    imageUrl:
      "https://www.tracerplus.com/sites/default/files/inline-images/live-support-image.png",
  };

  return (
    <>
      <div
        className={`sc-launcher ${isOpen ? "opened" : ""}`}
        onClick={handleClick}
      >
        <MessageCount count={newMessagesCount} isOpen={isOpen} />
        <img className={"sc-open-icon"} src={launcherIconActive} />
        <img className={"sc-closed-icon"} src={launcherIcon} />
      </div>
      <div className={`sc-chat-window ${isOpen ? "opened" : "closed"}`}>
        <ChatWindow
          agentProfile={agentProfile}
          onClose={onClose}
          messages={messages}
          onSubmit={onSubmit}
          isOpen={isOpen}
          loading={loading}
          start={start}
          setStart={setStart}
        />
      </div>
    </>
  );
}

const MessageCount = (props) => {
  if (props.count === 0 || props.isOpen === true) return null;
  return <div className={"sc-new-messages-count"}>{props.count}</div>;
};

export default SupportWindow;
