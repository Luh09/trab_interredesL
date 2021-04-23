import React, { useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import useChat from "../useChat";
// import NLogin from "../components/NLogin";
import LoggedUsers from "../components/LoggedUsers";
import '../views/ChatRoom/ChatRoom.css'

export default function Dashboard() {
  // const { user } = useParams();
  const { ip, user, porta, sendUser } = useSelector((state) => state);
  const { messages, sendMessage, sendUserMessage, sendFile } = useChat(
    user,
    ip,
    porta,
    user
  );
  const [newMessage, setNewMessage] = useState("");
  // const [file, setFile] = useState("");

  const handleNewFile = (ev) => {
    // console.log("send file")
    // console.log(ev.target.files[0])
    // setFile("has file");
    if (ev.target.files[0].size > 20971520) {
      alert("arquivo deve ter no max 20 MB");
    } else {
      sendFile(ev.target.files[0], sendUser);
    }
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    sendUserMessage(newMessage, sendUser);
    setNewMessage("");
  };

  const onEnterKey = (evt) => {
    const key = evt.key;
    if (key === "Enter") {
      handleSendMessage(evt);
    }
  };

  // if (ip === "" && user === "") {
  //   return <NLogin />;
  // }
  // console.log("dash", users)
console.log(messages)
  return (
    <Container>
      <Header>
        <label>The Chat</label>
        <p>Bem vindo {user}</p>
      </Header>

      <h1>Dashboard</h1>

      <LoggedUsers />

      <ChatContainer>
        <ChatArea>
          <ol className="messages-list">
            {messages.map((message, i) => (
              <li
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >
                {/* teste */}
                {message.body}
              </li>
            ))}
          </ol>
        </ChatArea>
        <CharInput>
          <input type="file" onChange={handleNewFile} />
          <input
            type="text"
            placeholder="Mensagem"
            onKeyPress={(evt) => onEnterKey(evt)}
            value={newMessage}
            onChange={handleNewMessageChange}
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </CharInput>
      </ChatContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #003566;
  height: 100vh;
  color: #f7f7f7;
  position: relative;
`;

const Header = styled.header`
  width: 100vw;
  height: 60px;
  background-color: #000814;
  color: #ffc300;
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    font-size: 22px;
    font-weight: 600;
    margin-left: 30px;
    padding: 5px 15px;
    border: 2px solid #f7f7f7;
  }
  p {
    margin-right: 30px;
  }
`;

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: scroll;
  height: 100%;
  margin-bottom: 0px;
`;

const ChatContainer = styled.div`
  background-color: #f7f7f7;
  width: 37%;
  height: 70%;
  border-radius: 5px;
  max-height: 75%;
  /* color: black; */
`;

const CharInput = styled.div`
  color: black;
  display: flex;
  padding: 5px;
  /* position: absolute; */
  bottom: 0px;
  width: 100%;

  input {
    padding: 10px;
    border-radius: 10px;
    border: 2px solid #e1e1e1;
    width: 87%;

    &:focus {
      outline: none !important;
      border: 2px solid #ffc300;
      /* box-shadow: 0 0 10px #719ece; */
    }
  }

  button {
    border-radius: 10px;
    outline: none;
    padding: 10px;
  }

  label {
  }

  button {
  }
`;
