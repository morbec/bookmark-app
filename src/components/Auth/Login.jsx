/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
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
        <Form display='block' onSubmit={this.onSubmit}>
          <Form.Group as={Row} controlId='formPlaintextEmail'>
            <Col>
              <Form.Control
                size='lg'
                type='email'
                name='email'
                id='email'
                placeholder='example@email.com'
                onChange={this.onChange}
                value={this.state.email}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formPlaintextPassword'>
            <Col>
              <Form.Control
                size='lg'
                type='password'
                name='password'
                id='password'
                placeholder='Enter your password'
                onChange={this.onChange}
                value={this.state.password}
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Button type='submit' variant='outline-primary'>
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default Login
