import React, { useState } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import SignIn from './Components/SignIn/SignIn';
import Main from './Components/Main/Main';

function App() {
  const initUser = {
    id: '',
    name: '',
    email: '',
    phone: '',
    offended: 0,
    offencedate: null,
  };

  const [route, setRoute] = useState('home');
  const [user, setUser] = useState(initUser);
  const [displayUser, setDisplayUser] = useState(false);

  const clearChallan = (email) => {
    console.log('hi');
    fetch('http://localhost:3001/clearChallan', {
      method: 'put',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          loadUser(data);
        } else {
          alert('Unable to connect to the database curently. Try again.');
        }
      })
      .catch((err) => console.log(err));
  };

  const changeRoute = (event, route) => {
    if (event != null) {
      let btn = event.target;
      btn.style.transform = 'scale(0.8)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 100);
    }
    if (route === 'signOut') {
      setUser(initUser);
    }
    setRoute(route);
  };

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      offended: user.offended,
      offencedate: user.offencedate,
    });
  };

  return (
    <div className='App'>
      <Navigation route={route} changeRoute={changeRoute} setDisplayUser={setDisplayUser} />
      {
        {
          home: <Home />,
          home_main: <Home />,
          signOut: <Home />,
          register: <Register changeRoute={changeRoute} />,
          signIn: <SignIn changeRoute={changeRoute} loadUser={loadUser} />,
          main: <Main clearChallan={clearChallan} user={user} displayUser={displayUser} loadUser={loadUser} />,
        }[route]
      }
    </div>
  );
}

export default App;
