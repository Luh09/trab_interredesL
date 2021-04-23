import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

export default function LoggedUsers() {
  const {users, sendUser} = useSelector((state) => state);
  const dispatch = useDispatch();
  
  const setSendUser = (user) => {
      if (user === sendUser){
          dispatch({ type: "SEND_USER", sendUser:"" });

      }else{
          dispatch({ type: "SEND_USER", sendUser:user });
      }

  }

  return (
    <Container>
      <h2>Usuários online</h2>
      <ul type="none">
        {users.sort().map((us) => {
          return <Li onClick={() => setSendUser(us.user)} style={{
              background: sendUser === us.user ? "#003566" : "white",
              color: sendUser === us.user ? "white" : "#001d3d" 
        }}>{us.user}</Li>
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 14%;

  background-color: #f7f7f7;
  color: #001d3d;
  width: 15%;
  height: 75%;
  border-radius: 5px;
  overflow-y: scroll;

  ul {
    /* background-color: red; */
    padding: 0;
  }

  h2 {
    margin-left: 20%;
  }
`;

const Li = styled.li`
  padding: 10px 20px;
  /* border: 2px solid black; */
  /* width: 100%; */
  &:hover {
    background-color: #003566;
    color: white;
  }
`;
