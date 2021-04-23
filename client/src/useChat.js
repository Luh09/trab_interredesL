import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const NEW_USER = "newUser";
const SEND_USER_MESSAGE = "sendUserMessage";
const SEND_FILE = "sendFile";

// const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId, ip, porta, user) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  const dispatch = useDispatch();

  const SOCKET_SERVER_URL = `http://${ip}:${porta}`;

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId, user },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      // console.log("chegou new message", message);
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on("my-message", (message) => {
      console.log("my message");
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on("my-file", (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(NEW_USER, (users) => {
      dispatch({ type: NEW_USER, users });
    });

    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line
  }, [roomId, user]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  const sendUserMessage = (messageBody, user="") => {
    console.log("das");
    socketRef.current.emit(SEND_USER_MESSAGE, {
      body: messageBody,
      user: user,
      senderId: socketRef.current.id,
    });
  };

  const sendFile = (file, user) => {
    console.log("send file");
    socketRef.current.emit(SEND_FILE, {
      file: file,
      user: user,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage, sendUserMessage, sendFile };
};

export default useChat;
