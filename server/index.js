const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const NEW_USER = "newUser";
const SEND_USER_MESSAGE = "sendUserMessage";
const SEND_FILE = "sendFile";

let users_list = [];

io.on("connection", (socket) => {
  // Join a conversation
  const { roomId, user } = socket.handshake.query;

  console.log(`Client ${socket.id} - ${user} connected`);
  users_list.push({user, id:socket.id});

  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  socket.on(SEND_USER_MESSAGE, (data) => {
    if(data.user == ""){
      socket.broadcast.emit("my-message", data)
    }else {
      let id = users_list.filter((us) =>  us.user == data.user)[0].id
      io.to(id).emit("my-message", data);
    }
    
  });

  //Lista de usuarios
  socket.on(NEW_USER, () => {
    io.emit(NEW_USER, users_list); // responder para todos
  });

  socket.on(SEND_FILE, (data) => {
    console.log("file")
    // if(data.user == ""){
      socket.broadcast.emit("my-file", data)
    // }else {
    //   let id = users_list.filter((us) =>  us.user == data.user)[0].id
    //   io.to(id).emit("my-file", data);
    // }
  });  

  io.emit(NEW_USER, users_list);

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id}, ${user} diconnected`);
    users_list = users_list.filter((us) => us !== user);
    socket.leave(roomId);
    io.emit(NEW_USER, users_list);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
