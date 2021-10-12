import './App.css';
import 'purecss'
import TitleList from './components/List';
import { useState, useEffect } from 'react';

function App() {
  let [titles, setTitles] = useState([]);
  let [settings] = useState([{ displayReasoning: false }]);

  const getData = () => {
    fetch('http://localhost:8080/v1/aniapi',
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
      <div className="pure-g">
        <div className="pure-u-1 pure-u-md-1-3"><TitleList titles={titles} settings={settings} /></div>
      </div>
    </div>
  );
}

export default App;
