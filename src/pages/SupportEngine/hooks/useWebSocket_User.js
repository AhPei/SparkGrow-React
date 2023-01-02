import { useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import incomingMessageSound from "../assets/sounds/notification.mp3";

export default function useWebSocket({ start }) {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
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

    const link = wsStart + origin + "/ws/chat/";

    const ws = new W3CWebSocket(link);
    socket.current = ws;

    console.log(link);

    ws.onopen = () => setLoading(false);

    ws.onclose = (event) => {
      setDisabled(true);
      const code = event["code"];
      let err = "";
      switch (code) {
        case 3000:
          err =
            "We Are Sorry. There are no supporter online at the momment.\nOur Working Hour:\nWeekday - 9:00am-4:00pm\nWeekend - Off day";
          break;
        default:
          err = `Disconnected from the server.`;
      }

      setMessages((prev) => [...prev, { content: err }]);
      setLoading(false);
    };
    ws.onerror = (e) => ws.close();

    // Trigger when new value updated
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      playNotificationSound();
      setMessages((prev) => [...prev, data]);
    };

    return () => {
      socket.current = null;
      ws.close();
    };
  }, [start]);

  const onSubmit = (content) => {
    try {
      socket.current.send(JSON.stringify({ content }));
    } catch (err) {
      console.log(err);
    }
  };

  return {
    socket: socket.current,
    onSubmit,
    messages,
    loading,
    disabled,
  };
}
