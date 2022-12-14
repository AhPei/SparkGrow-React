import MessageList from "../MessageList";
import UserInput from "../UserInput";

// Right
export default function Chat({ messages, loading, status, onSubmit }) {
  if (loading) return <p>Loading...</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <MessageList messages={messages} />
      <UserInput disabled={!status} onSubmit={onSubmit} />
    </div>
  );
}
