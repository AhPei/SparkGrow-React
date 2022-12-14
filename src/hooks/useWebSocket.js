import { useEffect, useState, useRef } from "react";
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
    const host = "ws://127.0.0.1:8000/ws/chat/";
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
                <button onClick={()=>handleRetry(t)}>Retry</button>
                <button onClick={()=>toast.dismiss(t.id)}>X</button>
              </span>
            ),
            { duration: Infinity }
          )
        : setMessages((prev) => [...prev, { content: err }]);
      setLoading(false)
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
                    newMessage: obj.newMessage + 1 || 1,
                    status: data.status || obj.status,
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
    toast.dismiss(t.id)
    setRetry((prev) => !prev);
    setLoading(true)
  };

  // useEffect(() => {
  //   if (error) setMessages((prev) => [...prev, { content: error }]);
  // }, [error]);

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

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  return {
    socket: socket.current,
    onSubmit,
    messages,
    loading,
    readMessage,
  };
}

// // Remove when leaving the page
// useEffect(() => {
//   const remove = () => {
//     localStorage.removeItem("start");
//     localStorage.removeItem("open");
//   };
//   window.addEventListener("beforeunload", remove);
//   return () => window.removeEventListener("beforeunload", remove);
// }, []);

const message = [
  {
    sender: "What a long name",
    timestamp: "11:00 AM",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: false,
    image: "http://127.0.0.1:8000/accounts/default/profile.png",
    caseID: 1,
  },
  {
    sender: "What a long name",
    timestamp: "11:00 AM",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: false,
    image: "http://127.0.0.1:8000/accounts/default/profile.png",
    caseID: 1,
  },
  {
    sender: "What a long name",
    timestamp: "11:00 AM",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: false,
    image: "http://127.0.0.1:8000/accounts/default/profile.png",
    caseID: 1,
  },
  {
    sender: "What a long name",
    timestamp: "11:00 AM",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: false,
    image: "http://127.0.0.1:8000/accounts/default/profile.png",
    caseID: 1,
  },
  {
    sender: "me",
    timestamp: "11:01 AM",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: false,
    image: "http://127.0.0.1:8000/products/images/1.JPG",
    caseID: 1,
  },
  {
    sender: "me",
    timestamp: "11:01 AM",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: false,
    image: "http://127.0.0.1:8000/products/images/1.JPG",
    caseID: 1,
  },
  {
    sender: "me",
    timestamp: "11:01 AM",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: false,
    image: "http://127.0.0.1:8000/products/images/1.JPG",
    caseID: 1,
  },
  {
    sender: "What a long name",
    timestamp: "11:00 AM",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: false,
    image: "http://127.0.0.1:8000/accounts/default/profile.png",
    caseID: 1,
  },
  {
    sender: "What a long name",
    timestamp: "11:00 AM",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: false,
    image: "http://127.0.0.1:8000/accounts/default/profile.png",
    caseID: 1,
  },
  {
    sender: "What a long name",
    timestamp: "11:00 AM",
    content: "Short conetent hahah",
    status: false,
    image: "http://127.0.0.1:8000/accounts/default/profile.png",
    caseID: 1,
  },
  {
    sender: "What a long name",
    timestamp: "11:00 AM",
    content: "Short conetent hahah",
    status: false,
    image: "http://127.0.0.1:8000/accounts/default/profile.png",
    caseID: 1,
  },
  {
    sender: "LAST?",
    timestamp: "11:00 AM",
    content: "Short conetent hahah",
    status: false,
    image: "http://127.0.0.1:8000/accounts/default/profile.png",
    caseID: 1,
  },
  {
    sender: "What a long name",
    timestamp: "11:00 AM",
    content: "Short conetent hahah",
    status: false,
    image: "http://127.0.0.1:8000/accounts/default/profile.png",
    caseID: 1,
  },
  {
    sender: "This lah last",
    timestamp: "11:00 AM",
    content: "Short conetent hahah",
    status: false,
    image: "http://127.0.0.1:8000/accounts/default/profile.png",
    caseID: 1,
  },
];
