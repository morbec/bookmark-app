/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { signup } from '../../services/auth'

import '../../assets/auth/auth.css'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    name: ''
  }

  onChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { name, email, password } = this.state
    signup(name, email, password)
      .then((user) => {
        this.props.setUser(user)
        this.props.history.push('/bookmarks')
      })
      .catch(() => {
        // TODO: Handle .catch -> Display a  message to the user
        this.props.setUser(null)
      })
  }

  render() {
    return (
      <div className='container'>
        <Form display='block' onSubmit={this.onSubmit}>
          <Form.Group as={Row} controlId='formPlaintextPassword'>
            <Col>
              <Form.Control
                size='lg'
                type='text'
                name='name'
                value={this.state.name}
                onChange={this.onChange}
                placeholder='Enter your name'
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formPlaintextPassword'>
            <Col>
              <Form.Control
                size='lg'
                type='email'
                name='email'
                value={this.state.email}
                onChange={this.onChange}
                placeholder='example@email.com'
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formPlaintextPassword'>
            <Col>
              <Form.Control
                size='lg'
                type='password'
                name='password'
                placeholder='Enter your password'
                value={this.state.password}
                onChange={this.onChange}
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

export default SignUp
