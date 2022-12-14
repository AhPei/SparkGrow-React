import chatIconUrl from "./../../assets/chat-icon.svg";
import TextMessage from "./TextMessage";

export default function index({ message }) {
  return (
    <div className="sc-message">
      <div
        className={`sc-message--content px-3 ${
          message.sender === "me" ? "sent" : "received"
        }`}
      >
        <div
          className="sc-message--avatar"
          style={{ backgroundImage: `url(${chatIconUrl})` }}
        />

        <TextMessage {...message} />
      </div>
    </div>
  );
}

// const renderMessageOfType = (type) => {
//   switch (type) {
//     case "text":
//       return <TextMessage {...message} />;
//     case "emoji":
//       return <EmojiMessage {...message} />;
//     case "file":
//       return <FileMessage {...message} />;
//     default:
//       console.error(
//         `Attempting to load message with unsupported file type '${type}'`
//       );
//   }
// };
// {renderMessageOfType(message.type)}
