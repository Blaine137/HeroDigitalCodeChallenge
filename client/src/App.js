import logo from './logo.svg';
import {useEffect, useState} from 'react';
import HeroForm from './Form/Form';
import './App.scss';

function App() {
  const [data, setData] = useState('');

  let getData = async () => {
    const response = await fetch('http://localhost:3001/submit');
    const body = await response.json();
    return body;
  };

  return (
    <>
        <HeroForm getData={getData}/> 
    </>
  );
}

export default App;
