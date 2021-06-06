import React from 'react';
import './Navigation.css';

function Navigation(props) {
  return (
    <div className='navbar'>
      <div className='nav-btn grow' onClick={(e) => props.changeRoute(e, 'home')}>
        Home
      </div>
      <div className='nav-btn grow' onClick={(e) => props.changeRoute(e, 'register')}>
        Register
      </div>
      <div className='nav-btn grow' onClick={(e) => props.changeRoute(e, 'signIn')}>
        SignIn
      </div>
    </div>
  );
}

export default Navigation;
