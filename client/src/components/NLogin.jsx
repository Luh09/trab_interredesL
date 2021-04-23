import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function NLogin() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#000814",
        color: "#f7f7f7",
      }}
    >
      <h1>Faça login!</h1>
      
      <Link to="/">
        <Button>Login</Button>
      </Link>
    </div>
  );
}


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
