import React from 'react';
import './Navigation.css';

function Navigation(props) {
  return (
    <div className='navbar'>
      <div className='nav-btn' onClick={() => props.changeRoute('home')}>
        Home
      </div>
      <div className='nav-btn' onClick={() => props.changeRoute('register')}>
        Register
      </div>
      <div className='nav-btn' onClick={() => props.changeRoute('signin')}>
        SignIn
      </div>
    </div>
  );
}

export default Navigation;
