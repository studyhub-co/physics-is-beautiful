import React from 'react'
import CSRFToken from '../components/csrf'

// TODO use dynamically generated (i.e. django reverse) urls rather than hardcoded

export default class AuthSignUp extends React.Component {
  constructor () {
    super()
    this.state = {
      mode: 'signup'
    }
  }
  render () {
    if (this.state.mode === 'signup') {
      return (
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title'>Sign Up</h4>
          </div>
          <div className='modal-body'>
            <div>
              <br />
              <div style={{display: 'table', margin: '0 auto'}}>
                <a title='Facebook' className='socialaccount_provider facebook ' href='/accounts/facebook/login/?process='>
                  <img className='social-image' src='https://assets.physicsisbeautiful.com/homepage/images/facebook_login.png' alt='Facebook' />
                </a>
                <a title='Google' className='socialaccount_provider google ' href='/accounts/google/login/?process='>
                  <img className='social-image' src='https://assets.physicsisbeautiful.com/homepage/images/google_login.png' alt='Google' />
                </a>
              </div>
              <div className='hr-sect'>OR</div>
              <form action='/accounts/signup/' method='post'>
                <input type='hidden' name='next' value='/' />
                <CSRFToken />
                <div className='form-group'>
                  <input name='first_name' type='text' className='form-control' id='id_firstname' placeholder='First name' />
                </div>
                <div className='form-group'>
                  <input name='last_name' type='text' className='form-control' id='id_lastname' placeholder='Last name' />
                </div>
                <div className='form-group'>
                  <input name='email' type='text' className='form-control ' id='id_email' placeholder='Email address' required='' />
                </div>
                <div className='form-group'>
                  <input name='password1' type='password' className='form-control ' id='id_password1' placeholder='Password' required='' />
                </div>
                <div className='form-group'>
                  <input name='password2' type='password' className='form-control ' id='id_password2' placeholder='Password (again)' required='' />
                </div>
                <button className='btn btn-primary primaryAction' type='submit'>Sign Up</button>
              </form>
            </div>
          </div>
          <div className='modal-footer'>
  Already have an account? &nbsp;
            <a href='#' onClick={() => { this.setState({'mode': 'login'}) }}>Login »</a>
          </div>
        </div>
      )
    } else {
      return (
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title'>Login</h4>
          </div>
          <div className='modal-body'>
            <br />
            <div style={{display: 'table', margin: '0 auto'}}>
              <a title='Facebook' className='socialaccount_provider facebook ' href='/accounts/facebook/login/?process='>
                <img className='social-image' src='https://assets.physicsisbeautiful.com/homepage/images/facebook_login.png' alt='Facebook' />
              </a>
              <a title='Google' className='socialaccount_provider google ' href='/accounts/google/login/?process='>
                <img className='social-image' src='https://assets.physicsisbeautiful.com/homepage/images/google_login.png' alt='Google' />
              </a>
            </div>
            <div className='hr-sect'>OR</div>
            <div>
              <form action='/accounts/login/' method='POST'>
                <CSRFToken />
                <input type='hidden' name='next' value='/' />
                <div className='form-group'>
                  <label htmlFor='id_login'>Email</label>
                  <input name='login' type='text' className='form-control' id='id_login' placeholder='email' required />
                </div>
                <div className='form-group'>
                  <label htmlFor='id_password'>Password</label>
                  <a href='/accounts/password/reset' style={{float: 'right'}}>Forgot Password?</a>
                  <input name='password' type='password' className='form-control' id='id_password' placeholder='password' required />
                </div>
                <div className='form-group'>
                  <div className='checkbox'>
                    <label id='label_remember'>
                      <input type='checkbox' className='form-check form-check-remember' name='remember' />
                      <span>Remember me</span>
                    </label>
                  </div>
                </div>
                <input className='btn btn-primary primaryAction' type='submit' value='Login' />
              </form>
            </div>
          </div>
          <div className='modal-footer'>
                Don't have an account? &nbsp;
            <a href='#' onClick={() => { this.setState({'mode': 'signup'}) }}>Sign Up &raquo;</a>
          </div>
        </div>
      )
    }
  }
}
