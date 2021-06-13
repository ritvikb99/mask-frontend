import React, { Fragment } from 'react';
import './Main.css';
import profileimg from './profile.png';
import no_offence_img from './no_offence.jpg';
import offence_img from './offence.jpg';

function Main(props) {
  var date = new Date(props.user.offencedate);
  date = date.toDateString();
  return (
    <Fragment>
      {props.displayUser === true ? (
        <div id='userDetails'>
          <div className='main_inner'>
            <img src={profileimg} alt='profile' id='profileImg' />
            <p>{props.user.name}</p>
            <p>{props.user.email}</p>
            <p>{props.user.phone}</p>
          </div>
        </div>
      ) : (
        <Fragment />
      )}
      <div className='main_wrapper'>
        <div id='leftCol'>
          <table>
            <thead>
              <tr>
                <th colSpan='2'>User Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{props.user.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{props.user.email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{props.user.phone}</td>
              </tr>
              <tr>
                <td>Offence Status</td>
                <td>{props.user.offended === true ? 'Challan Pending' : 'No Challan Pending'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id='rightCol'>
          {props.user.offended === true ? <img id='offence_img' src={offence_img} /> : <img id='offence_img' src={no_offence_img} />}
          {props.user.offended === true ? (
            <Fragment>
              <p>
                You were found not wearing a mask on {date}.<br />
                Please clear your Challan.
              </p>
              <input
                type='submit'
                onClick={() => props.clearChallan(props.user.email)}
                className='button grow clearChal'
                value='Clear Challan'
              ></input>
            </Fragment>
          ) : (
            <Fragment>
              <p>
                You dont have any challans due.
                <br />
                Keep yourself safe by always wearing a mask in public place.
              </p>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Main;
