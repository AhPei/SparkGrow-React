// import PropTypes from "prop-types";
import Header from "./Header";
import MessageList from "./MessageList";
import UserInput from "./UserInput";

function ChatWindow({
  agentProfile,
  onClose,
  messages,
  onSubmit,
  loading,
  start,
  setStart,
  disabled
}) {
  
  if (!start) {
    return (
      <div className="m-auto mx-5">
        <button style={{ width: "100%" }} onClick={() => setStart(true)}>
          Start Live Chat
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="m-auto mx-5">
        <p>Connecting to server...</p>
      </div>
    );
  }

  return (
    <>
      <Header
        teamName={agentProfile.teamName}
        imageUrl={agentProfile.imageUrl}
        onClose={onClose}
      />
      <MessageList messages={messages} imageUrl={agentProfile.imageUrl} />
      <UserInput onSubmit={onSubmit} disabled={disabled} />
    </>
  );
}

// ChatWindow.propTypes = {
//   agentProfile: PropTypes.object.isRequired,
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onFilesSelected: PropTypes.func,
//   onUserInputSubmit: PropTypes.func.isRequired,
//   // showEmoji: PropTypes.bool
// };

export default ChatWindow;
