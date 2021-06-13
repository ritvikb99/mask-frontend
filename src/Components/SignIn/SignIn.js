import React from 'react';
import './SignIn.css';
import signInImg from './signIn.png';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      problem: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onSubmit = () => {
    if (this.state.signInEmail === '') {
      this.setState({ problem: 'no-email' });
    } else {
      fetch('http://localhost:3001/signIn', {
        //fetch
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: this.state.signInEmail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            this.props.loadUser(data);
            this.props.changeRoute(null, 'main');
          } else if (data === 'fail') {
            this.setState({ problem: 'wrong-email' });
          } else {
            this.setState({ problem: 'error' });
          }
        });
    }
  };

  render() {
    return (
      <div className='main'>
        <img src={signInImg} alt='signIn' id='signInImg' />
        <article className='br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw5 center'>
          <main className='pa4 black-80'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                <legend className='f2 fw6 ph0 mh0'>Sign In</legend>
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
                  />
                </div>
              </fieldset>
              <div className=''>
                <input onClick={this.onSubmit} className='button grow' type='submit' value='Sign in' />
              </div>
              {this.state.problem === 'wrong-email' ? (
                <p style={{ color: 'red' }}>Unregistered email address </p>
              ) : this.state.problem === 'no-email' ? (
                <p style={{ color: 'red' }}>Email field cannot be empty </p>
              ) : this.state.problem === 'error' ? (
                <p style={{ color: 'red' }}>Error in communicating with the database</p>
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

export default SignIn;
