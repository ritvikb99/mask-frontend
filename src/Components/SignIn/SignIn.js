import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      problem: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmit = () => {
    if (this.state.signInEmail === '') {
      this.setState({ problem: 'no-email' });
    } else if (this.state.signInPassword === '') {
      this.setState({ problem: 'no-password' });
    } else {
      fetch('*****tobefilled*****', {
        //fetch
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            this.props.loadUser(data);
            this.props.changeRoute('main');
          } else {
            this.setState({ problem: 'wrong-password' });
          }
        });
    }
  };

  render() {
    return (
      <div className='main'>
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
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 resetable'
                    type='email'
                    name='email-address'
                    id='email-address'
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6 No-center' htmlFor='password'>
                    Password
                  </label>
                  <input
                    onChange={this.onPasswordChange}
                    className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 resetable'
                    type='password'
                    name='password'
                    id='password'
                  />
                </div>
              </fieldset>
              <div className=''>
                <input onClick={this.onSubmit} className='button grow' type='submit' value='Sign in' />
              </div>
              {this.state.problem === 'wrong-password' ? (
                <p style={{ color: 'red' }}>Incorrect email or password </p>
              ) : this.state.problem === 'no-email' ? (
                <p style={{ color: 'red' }}>Email field cannot be empty </p>
              ) : this.state.problem === 'no-password' ? (
                <p style={{ color: 'red' }}>Password field cannot be empty </p>
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
