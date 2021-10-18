import './App.css';
import 'purecss'
import { UserTitleList, MyTitleList } from './components/List';
import { LoginForm, Logout } from './components/Login';
import { useState, createContext } from 'react';

import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './components/Navbar';

export const LoginContext = createContext();

function App() {
  let [settings] = useState([{ displayReasoning: false }]);
  let [isLoggedIn, setLoginStatus] = useState(false);

  const PrivateRoute = ({ children }) => {
    return (<Route>{isLoggedIn ? children : <Redirect to={"/login"} />}</Route>)
  }

  return (
    <div className="App">
      <LoginContext.Provider value={{ isLoggedIn, setLoginStatus }}>
        <Navbar children={
          <Switch>
            <Route path="/list/:userid">
              <UserTitleList settings={settings} />
            </Route>
            <PrivateRoute path="/list">
              <MyTitleList settings={settings} />
            </PrivateRoute>
            <Route path="/login">
              <LoginForm />
            </Route>
            <PrivateRoute path="/logout">
              <Logout />
            </PrivateRoute>
          </Switch>
        } />
      </ LoginContext.Provider>
    </div>
  )
}



export default App;