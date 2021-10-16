import './App.css';
import 'purecss'
import TitleList from './components/List';
import LoginForm from './components/LoginPage';
import { useState, useEffect } from 'react';
import { AiOutlineUser, AiOutlineUnorderedList } from "react-icons/ai"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function App() {
  let [titles, setTitles] = useState([]);
  let [settings] = useState([{ displayReasoning: false }]);

  const getData = () => {
    fetch('http://localhost:8080/aniapi/getAll/1',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then((data => setTitles(data)))
  }

  //added so react doesn't spam errors and die
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <Router>
        <nav>
          <Link className="nav-icon" to="/"><AiOutlineUnorderedList size={50} /></Link>
          <Link className="nav-icon" to="/login"><AiOutlineUser size={50} /></Link>
        </nav>

        <Switch>
          <Route path="/list/:id">
            <TitleList titles={titles} settings={settings} />
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