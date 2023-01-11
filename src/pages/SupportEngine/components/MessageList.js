import { useEffect, useRef } from "react";
import Message from "./Messages";

export default function MessageList({ messages }) {
  const scrollList = useRef();

  useEffect(() => {
    scrollList.current.scrollIntoView({ behavior: "smooth" });
    // scrollList.current.scrollToEnd({ animated: true }); // react native
  }, [messages]);

  return (
    <div className="sc-message-list" ref={scrollList}>
      {messages.map((message, key) => (
        <Message message={message} key={key} />
      ))}
    </div>
  );
}
