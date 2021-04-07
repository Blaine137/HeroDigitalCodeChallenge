import logo from './logo.svg';
import {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState('');

  let getData = async () => {
    const response = await fetch('http://localhost:3001/submit');
    const body = await response.json();
    return body;
  };

  useEffect(() => getData().then(res => setData(res.data)))

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{data}</p>
      </header>
    </div>
  );
}

export default App;
