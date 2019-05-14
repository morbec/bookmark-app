/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { login } from '../../services/auth'

import '../../assets/auth/auth.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  onChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { email, password } = this.state
    login(email, password).then((user) => {
      this.props.setUser(user)
      this.setState({
        email: '',
        password: '',
      })
    })
  }

  render() {
    return (
      <div className='container'>
        <div className='container-form'>
          <form onSubmit={this.onSubmit}>
            <div className='label-input'>
              <label htmlFor='email'>
                Email:
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Enter your email'
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </label>
            </div>
            <div>
              <label htmlFor='password'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Enter your password'
                  onChange={this.onChange}
                  value={this.state.password}
                />
              </label>
            </div>
            <div>
              <input type='submit' value='Login' />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
