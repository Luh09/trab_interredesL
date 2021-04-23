import React, {useState} from "react";
import { useSelector } from "react-redux";

import useChat from "../../useChat";
import NLogin from '../../components/NLogin'
import "./ChatRoom.css";

const ChatRoom = (props) => {
  // const { roomId, ip } = props.match.params;
  const { ip, user, porta } = useSelector((state) => state);

  const { messages, sendMessage } = useChat(user, ip, porta, user);
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  const onEnterKey = (evt) => {
    const key = evt.key;
    if (key === 'Enter') {
      handleSendMessage(evt)
  }
  }

  if (ip === "" && user === "") {
    return (
      <NLogin/>
    );
  }

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {user}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        onKeyPress={(evt) => onEnterKey(evt)}
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
