import UserTitleList from './components/Pages/List';
import { LoginForm, Logout } from './components/Pages/Login';
import AddTitlePage from './components/Pages/AddTitle';
import RegisterForm from './components/Pages/Register';
import UserPage from './components/Pages/User';
import Navbar from './components/Layout/Navbar';

import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  const PrivateRoute = ({ children }) => {
    return (<Route>{children}</Route>)
  }
  return (
    <Navbar>
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
    </Navbar>
  )
}



export default App;