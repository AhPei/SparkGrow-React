import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import incomingMessageSound from "../assets/sounds/notification.mp3";

export default function useWebSocket_SupportChat({ caseID, start }) {
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(false);
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  const playNotificationSound = () => {
    var audio = new Audio(incomingMessageSound);
    audio.play();
  };

  useEffect(() => {
    if (!start) return;
    setMessages([]);
    const protocol = window.location.protocol;

    let wsStart = "ws://";
    if (protocol == "https:") wsStart = "wss://";

    const origin = process.env.REACT_APP_ORIGIN;

    const link = wsStart + origin + "/ws/chat/" + caseID + "/";

    const ws = new W3CWebSocket(link);
    socket.current = ws;

    ws.onopen = () => setLoading(false);

    ws.onclose = () => {
      toast.error(
        (t) => (
          <span>
            Disconnected from the server.
            <br />
            Retry connect to user
            <button onClick={() => handleRetry(t)}>Retry</button>
            <button onClick={() => toast.dismiss(t.id)}>X</button>
          </span>
        ),
        { duration: 30 * 1000 }
      );
      setLoading(false);
    };
    ws.onerror = (e) => {
      toast.error("Something went wrong on socket Chat");
      ws.close();
    };

    // Trigger when new value updated
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      // Add message to list
      if (data instanceof Array)
        return setMessages((prev) => [...prev, ...data]);

      if (!caseID) playNotificationSound();
      setMessages((prev) => [...prev, data]);
    };

    return () => {
      socket.current = null;
      ws.close();
    };
  }, [caseID, start, retry]);

  const onSubmit = (content) => {
    try {
      socket.current.send(JSON.stringify({ content }));
    } catch (err) {}
  };

  const handleRetry = (t) => {
    toast.dismiss(t.id);
    setRetry((prev) => !prev);
    setLoading(true);
  };

  return {
    onSubmit,
    messages,
    loading,
  };
}
