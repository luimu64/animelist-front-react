import './App.css';
import 'purecss'
import TitleList from './components/List';
import LoginForm from './components/LoginPage';
import { useState } from 'react';
import { AiOutlineUser, AiOutlineUnorderedList } from "react-icons/ai"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  let [settings] = useState([{ displayReasoning: false }]);

  return (
    <div className="App">
      <Router>
        <nav>
          <Link className="nav-icon" to="/list"><AiOutlineUnorderedList size={50} /></Link>
          <Link className="nav-icon" to="/login"><AiOutlineUser size={50} /></Link>
        </nav>

        <Switch>
          <Route path="/list/:userid">
            <TitleList settings={settings} />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;