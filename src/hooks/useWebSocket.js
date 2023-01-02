import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import incomingMessageSound from "../assets/sounds/notification.mp3";

export default function useWebSocket({ caseID, supporter, start = true }) {
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
    if (!start) return;
    setMessages([]);
    const protocol = window.location.protocol;
    const origin = process.env.REACT_APP_ORIGIN;

    let wsStart = "ws://";
    if (protocol == "https:") wsStart = "wss://";

    const host = wsStart + origin + "/ws/chat/";

    let link = host + (caseID ? `${caseID}/` : "");
    if (supporter) link = host + "support/";

    const ws = new W3CWebSocket(link);
    socket.current = ws;

    console.log(link);

    ws.onopen = () => {
      console.log("connected");
      setLoading(false);
    };
    ws.onclose = (event) => {
      const code = event["code"];
      let err = "";
      switch (code) {
        case 3000:
          err =
            "We Are Sorry. There are no supporter online at the momment.\nOur Working Hour:\nWeekday - 9:00am-4:00pm\nWeekend - Off day";
          break;
        case 4999:
          err = "YOU ARE NOT SUPPORTER";
          navigate("/", { replace: true });
          break;
        default:
          err = `Disconnected from the server.`;
          console.log("Disconnected to system socket: " + code);
      }
      console.log(code, err);
      supporter
        ? toast(
            (t) => (
              <span>
                {err}
                <button onClick={() => handleRetry(t)}>Retry</button>
                <button onClick={() => toast.dismiss(t.id)}>X</button>
              </span>
            ),
            { duration: Infinity }
          )
        : setMessages((prev) => [...prev, { content: err }]);
      setLoading(false);
    };
    ws.onerror = (e) => {
      console.log("Something went wrong on socket>", e);
      ws.close();
    };

    // Trigger when new value updated
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("Data:", data);

      // FOR ADMIN STAFF
      if (caseID === undefined && supporter) {
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
      }

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
    } catch (err) {
      console.log(err);
    }
  };

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
    socket: socket.current,
    onSubmit,
    messages,
    loading,
    readMessage,
  };
}
