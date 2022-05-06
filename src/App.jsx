import UserTitleList from './components/Pages/List';
import { LoginForm, Logout } from './components/Pages/Login';
import AddTitlePage from './components/Pages/AddTitle';
import RegisterForm from './components/Pages/Register';
import UserPage from './components/Pages/User';
import Navbar from './components/Layout/Navbar';

import {
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <Navbar>
      <Routes>
        <Route path="/list/:userID" element={<UserTitleList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/list" element={<UserTitleList />} />
        <Route path="/title/add" element={<AddTitlePage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Navbar>
  )
}



export default App;