import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import incomingMessageSound from "../assets/sounds/notification.mp3";

export default function useWebSocket_UserList() {
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(false);
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  const playNotificationSound = () => {
    var audio = new Audio(incomingMessageSound);
    audio.play();
  };

  const navigate = useNavigate();

  useEffect(() => {
    setMessages([]);
    const protocol = window.location.protocol;

    let wsStart = "ws://";
    if (protocol == "https:") wsStart = "wss://";

    const origin = process.env.REACT_APP_ORIGIN;

    const link = wsStart + origin + "/ws/chat/support/";

    const ws = new W3CWebSocket(link);
    socket.current = ws;

    ws.onopen = () => setLoading(false);

    ws.onclose = (event) => {
      const code = event["code"];
      let err = "";
      switch (code) {
        case 4999:
          err = "YOU ARE NOT SUPPORTER";
          navigate("/", { replace: true });
          break;
        default:
          err = `Disconnected from the server.`;
      }
      toast.error(
        (t) => (
          <span>
            {err}
            {code !== 4999 && (
              <>
                <button onClick={() => handleRetry(t)}>Retry</button>
                <button onClick={() => toast.dismiss(t.id)}>X</button>
              </>
            )}
          </span>
        ),
        { duration: 30 * 1000 }
      );
      setLoading(false);
    };
    ws.onerror = (e) => {
      toast.error("Something went wrong on socket UserList");
      console.log("Websocket On Error", e);
      ws.close();
    };

    // Trigger when new value updated
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data instanceof Array)
        return setMessages((prev) => [...prev, ...data]);

      playNotificationSound();
      return setMessages((prev) => {
        const isFound = prev.some(
          (prev) => prev.sender === data.sender && prev.caseID === data.caseID
        );

        if (!isFound) return [data, ...prev];
        const check = prev
          .map((obj) =>
            obj.sender === data.sender && obj.caseID === data.caseID
              ? {
                  ...obj,
                  ...data,
                  newMessage: obj.newMessage + 1 ?? 1,
                  status: data.status ?? obj.status,
                }
              : obj
          )
          .sort((obj) =>
            obj.sender === data.sender && obj.caseID === data.caseID ? -1 : 1
          );
        return check;
      });
    };

    return () => {
      socket.current = null;
      ws.close();
    };
  }, [start, retry]);

  // That part refresh only
  const handleRetry = (t) => {
    toast.dismiss(t.id);
    setRetry((prev) => !prev);
    setLoading(true);
  };

  const readMessage = (caseID) => {
    setMessages((prev) =>
      prev.map((obj) =>
        obj.caseID === caseID
          ? {
              ...obj,
              newMessage: 0,
            }
          : obj
      )
    );
  };

  return {
    messages,
    loading,
    readMessage,
  };
}
