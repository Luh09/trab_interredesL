import { createStore } from "redux";

const INICIAL_STATE = {
  ip: "",
  porta: "",
  user: "",
  users: [],
};

// no redux sempre temos q retornar um novo estado, não simplesmente alterar
const reducers = (state = INICIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ip: action.ip,
        porta: action.porta,
        user: action.user,
      };

    case "newUser":
      return {
        ...state,
        users: action.users,
      };

    case "SEND_USER":
      return {
        ...state,
        sendUser: action.sendUser
      };
    default:
      return state;
  }
};

const storeR = createStore(
  reducers,
  // se tiver extensão instalada executea
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { storeR };
// export { reducers };
