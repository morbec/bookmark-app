/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { signup } from '../../services/auth'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    name: '',
  }

  onChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { name, email, password } = this.state
    signup(name, email, password).then((user) => {
      this.props.setUser(user)
      this.setState({
        email: '',
        password: '',
        name: '',
      })
    })
  }

  render() {
    return (
      <div className='container'>
        <div className='container-form'>
          <form onSubmit={this.onSubmit}>
            <div>
              <label htmlFor='name' value='name'>
                Name:
                <input
                  type='text'
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder='Enter your name'
                />
              </label>
            </div>
            <div>
              <label htmlFor='email' value='email'>
                E-Mail:
                <input
                  type='email'
                  name='email'
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder='Enter your email'
                />
              </label>
            </div>
            <div>
              <label htmlFor='password' value='password'>
                Password:
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Enter your password'
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </label>
            </div>
            <div>
              <input type='submit' value='Sign up' />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp
