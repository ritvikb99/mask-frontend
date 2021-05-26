import React, { useState } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Home from './Components/Home/Home';

function App() {
  const [route, setRoute] = useState('home');
  const changeRoute = (route) => {
    setRoute(route);
  };
  return (
    <div className='App'>
      <Navigation route={route} changeRoute={changeRoute} />
      {
        {
          home: <Home />,
        }[route]
      }
    </div>
  );
}

export default App;
