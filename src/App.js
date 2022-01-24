import UserTitleList from './components/List';
import { LoginForm, Logout } from './components/Login';
import AddTitlePage from './components/AddTitle';
import RegisterForm from './components/Register';
import UserPage from './components/User';

import {
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';

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