import {
  BrowserRouter,
  Switch,
  Route,
//   Link,
  useParams,
} from "react-router-dom";
import Login from './views/Login'
import Dashboard from './views/Dashboard'
// import ChatRoom from './views/ChatRoom/ChatRoom'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard/:user" children={<Dashboard/>} />
        {/* <Route exact path="/:roomId/:ip" component={ChatRoom} /> */}
        {/* <Route exact path="/chat" component={ChatRoom} /> */}
        <Route exact path="/chat" component={Dashboard} />
        <Route path="/:id/:porta" children={<Child />} />
        <Route path="/" render={()=> <Login/>}/>
      </Switch>
    </BrowserRouter>
  );
}


function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id, porta } = useParams();
  
    return (
      <div>
        <h3>ID: {id}</h3>
        <h3>PORTA: {porta}</h3>
      </div>
    );
  }
