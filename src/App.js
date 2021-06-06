import React, { useState } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import SignIn from './Components/SignIn/SignIn';

function App() {
  const [route, setRoute] = useState('home');
  const changeRoute = (event, route) => {
    if (event != null) {
      let btn = event.target;
      btn.style.transform = 'scale(0.8)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 100);
    }

    setRoute(route);
  };
  return (
    <div className='App'>
      <Navigation route={route} changeRoute={changeRoute} />
      {
        {
          home: <Home />,
          register: <Register changeRoute={changeRoute} />,
          signIn: <SignIn />,
        }[route]
      }
    </div>
  );
}

export default App;
