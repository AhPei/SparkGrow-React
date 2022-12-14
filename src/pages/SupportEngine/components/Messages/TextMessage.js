import Linkify from "react-linkify"; // For link clickable

const TextMessage = (props) => {
  return (
    <div className="sc-message--text mt-4">
      <Linkify properties={{ target: "_blank" }}>{props.content}</Linkify>
      <div
        className={`sc-message--time ${
          props.sender === "me" ? "sent" : "received"
        }`}
        // ref={myRef}
      >
        {props.timestamp}
      </div>
    </div>
  );
};

export default TextMessage;
