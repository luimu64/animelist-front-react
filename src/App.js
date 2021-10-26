import './App.css';
import UserTitleList from './components/List';
import { LoginForm, Logout } from './components/Login';
import AddTitlePage from './components/AddTitle';
import RegisterForm from './components/Register';
import UserPage from './components/User'
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
  let [isLoggedIn, setLoginStatus] = useState(isTokenSet());

  const PrivateRoute = ({ children }) => {
    return (<Route>{isLoggedIn ? children : <Redirect to={"/login"} />}</Route>)
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, setLoginStatus }}>
      <Navbar children={
        <Switch>
          <Route path="/list/:userID">
            <UserTitleList />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <PrivateRoute path="/user">
            <UserPage />
          </PrivateRoute>
          <PrivateRoute path="/list">
            <UserTitleList />
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
  )
}



export default App;