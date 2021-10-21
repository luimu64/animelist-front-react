import './App.css';
import 'purecss'
import { UserTitleList, MyTitleList } from './components/List';
import { LoginForm, Logout } from './components/Login';
import AddTitlePage from './components/AddTitle';
import RegisterForm from './components/Register';
import { useState, createContext } from 'react';

import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './components/Navbar';
import { isTokenSet } from './helpers'

export const LoginContext = createContext(isTokenSet);

function App() {
  let [settings] = useState([{ displayReasoning: false }]);
  let [isLoggedIn, setLoginStatus] = useState(isTokenSet());

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
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <PrivateRoute path="/list">
              <MyTitleList settings={settings} />
            </PrivateRoute>
            <PrivateRoute path="/title/add">
              <AddTitlePage />
            </PrivateRoute>
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