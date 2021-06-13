import React, { Fragment } from 'react';
import './Navigation.css';

function Navigation(props) {
  return (
    <div className='navbar'>
      {props.route === 'main' || props.route === 'home_main' ? (
        <Fragment>
          <div className='nav-btn grow' onClick={(e) => props.changeRoute(e, 'home_main')}>
            Home
          </div>
          <div className='nav-btn grow' onClick={(e) => props.changeRoute(e, 'main')}>
            Challan
          </div>
          <div className='nav-btn grow' onClick={(e) => props.changeRoute(e, 'signOut')}>
            Sign Out
          </div>
          <div className='arrow' onMouseOver={() => props.setDisplayUser(true)} onMouseOut={() => props.setDisplayUser(false)}>
            &#9660;
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='nav-btn grow' onClick={(e) => props.changeRoute(e, 'home')}>
            Home
          </div>
          <div className='nav-btn grow' onClick={(e) => props.changeRoute(e, 'register')}>
            Register
          </div>
          <div className='nav-btn grow' onClick={(e) => props.changeRoute(e, 'signIn')}>
            SignIn
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default Navigation;
