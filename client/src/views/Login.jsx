import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Login() {
  const [user, setUser] = useState("matheus");
  const [ip, setIp] = useState("localhost");
  const [porta, setPorta] = useState("4000");
  const dispatch = useDispatch();

  const history = useHistory();

  const checkForm = useCallback(
    (event) => {
      event.preventDefault();
      // history.push(`/dashboard/${user}`);
      dispatch({ type: "LOGIN", ip, porta, user });

      history.push(`/chat`);

    },
    // eslint-disable-next-line
    [history, user]
  );


  return (
    <Container onSubmit={checkForm}>
      <Title>The Chat</Title>
      <Content>
        <label>Server:</label>
        <ServerInfo>
          <input
            type="text"
            placeholder="IP ADDRESS"
            value={ip}
            onChange={(evt) => setIp(evt.target.value)}
            required
          />
          <input type="text" placeholder="PORT" value={porta} onChange={(evt) => setPorta(evt.target.value)} required />
        </ServerInfo>

        <label>User:</label>
        <input
          type="text"
          placeholder="USER NAME"
          value={user}
          onChange={(evt) => setUser(evt.target.value)}
          required
        />
        <Button type="submit">Iniciar</Button>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  /* justify-content: center; */
  background-color: #000814;
  color: #f7f7f7;
  flex-direction: column;
  position: relative;
`;
const Content = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  height: 40vh;
  width: 20vw;
  color: #001d3d;
  padding: 20px;
  border-radius: 20px;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* align-items: center; */

  input {
    padding: 10px;
    border-radius: 10px;
    border: 2px solid #e1e1e1;

    &:focus {
      outline: none !important;
      border: 3px solid #ffc300;
      box-shadow: 0 0 10px #719ece;
    }
  }

  label {
    padding: 5px;
  }
`;

const ServerInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  input:nth-child(1) {
    border-end-end-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  input:nth-child(2) {
    margin-left: 0px;
    width: 50px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const Title = styled.label`
  font-size: 6vw;
  height: 10vh;
  align-self: flex-start;
  justify-self: center;
  text-align: center;
  width: 100%;
  color: #ffc300;
  margin-top: 10px;
`;

const Button = styled.button`
  margin-top: 50px;
  width: 6rem;
  align-self: center;
  justify-self: center;
  padding: 10px 10px;
  background-color: #003566;
  color: #e1e1e1;
  outline: none;
  border-radius: 10px;

  font-size: 18px;

  &:hover {
    background-color: #f7f7f7;
    color: #003566;
    border: 2px solid #003566;
    box-shadow: 0 0 10px #003566;
  }
`;
