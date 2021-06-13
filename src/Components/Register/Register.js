import React from 'react';
import './Register.css';
import WebcamComp from './Webcam/WebcamComp';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPhone: '',
      displayMessage: '',
      blob: null,
    };
  }
  onEmailChange = (event) => {
    this.setState({ registerEmail: event.target.value });
  };

  onPhoneChange = (event) => {
    this.setState({ registerPhone: event.target.value });
  };

  onNameChange = (event) => {
    this.setState({ registerName: event.target.value });
  };

  setBlob = (blob) => {
    this.setState({ blob: blob });
  };

  onSubmit = () => {
    console.log(this.state);
    if (this.state.registerEmail === '') {
      this.setState({ displayMessage: 'no-email' });
    } else if (this.state.registerPhone === '') {
      this.setState({ displayMessage: 'no-phone' });
    } else if (this.state.registerName === '') {
      this.setState({ displayMessage: 'no-name' });
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.registerEmail)) {
      this.setState({ displayMessage: 'invalid-email' });
    } else if (!/^\d{10}$/.test(this.state.registerPhone)) {
      this.setState({ displayMessage: 'invalid-phone' });
    } else {
      var fd = new FormData();
      fd.append('video', this.state.blob, this.state.registerEmail + '.webm');
      fd.append('name', this.state.registerName);
      fd.append('email', this.state.registerEmail);
      fd.append('phone', this.state.registerPhone);

      fetch('http://localhost:3001/register', {
        method: 'POST',
        body: fd,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === 'unable-to-register') {
            this.setState({ displayMessage: 'unable-to-register' });
          } else if (data === 'email-exists') {
            this.setState({ displayMessage: 'email-exists' });
          } else if (data) {
            this.setState({ displayMessage: 'success' });
            let list = document.getElementsByClassName('resetable');
            for (let element of list) {
              element.value = '';
            }
            setTimeout(() => {
              this.props.changeRoute(null, 'signIn');
            }, 5000);
          } else {
            this.setState({ displayMessage: 'wrong-password' });
          }
        });
    }
  };

  render() {
    return (
      <div className='main'>
        <WebcamComp setBlob={this.setBlob} />
        <article className='br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw5 center'>
          <main className='pa4 black-80'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                <legend className='f2 fw6 ph0 mh0'>Register</legend>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6 No-center' htmlFor='email-address'>
                    Name
                  </label>
                  <input
                    onChange={this.onNameChange}
                    className='pa2 input-reset ba bg-transparent w-100 resetable'
                    type='text'
                    name='name'
                    id='name'
                    required
                  />
                </div>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6 No-center' htmlFor='email-address'>
                    Email
                  </label>
                  <input
                    onChange={this.onEmailChange}
                    className='pa2 input-reset ba bg-transparent w-100 resetable'
                    type='email'
                    name='email-address'
                    id='email-address'
                    required
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6 No-center' htmlFor='phonr'>
                    Phone
                  </label>
                  <input
                    onChange={this.onPhoneChange}
                    className='b pa2 input-reset ba bg-transparent  w-100 resetable'
                    type='text'
                    name='phone'
                    id='phone'
                    required
                  />
                </div>
              </fieldset>
              <div className=''>
                <input id='register' onClick={this.onSubmit} className='button grow disabled' type='submit' value='Register' />
              </div>
              {this.state.displayMessage === 'invalid-email' ? (
                <p style={{ color: 'red' }}>Please enter a valid email address </p>
              ) : this.state.displayMessage === 'no-email' ? (
                <p style={{ color: 'red' }}>Please enter your email address </p>
              ) : this.state.displayMessage === 'no-phone' ? (
                <p style={{ color: 'red' }}>Please enter a phone number </p>
              ) : this.state.displayMessage === 'no-name' ? (
                <p style={{ color: 'red' }}>Please enter your name </p>
              ) : this.state.displayMessage === 'email-exists' ? (
                <p style={{ color: 'red' }}>There is already an account with this email address.</p>
              ) : this.state.displayMessage === 'unable-to-register' ? (
                <p style={{ color: 'red' }}>Unable to register </p>
              ) : this.state.displayMessage === 'invalid-phone' ? (
                <p style={{ color: 'red' }}>Enter a valid 10-digit number </p>
              ) : this.state.displayMessage === 'success' ? (
                <p className='f3 b' style={{ color: '#3f3d56', fontSize: '12px' }}>
                  Thanks for registering {this.state.registerName}.<br />
                  Check back after 30 mins.
                </p>
              ) : (
                <p style={{ color: 'red' }}></p>
              )}
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Register;
