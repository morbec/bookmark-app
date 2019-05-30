/* eslint-disable react/prop-types */
// import React, { Component, useState, useContext } from 'react'
import React, { Component, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { login } from '../../services/auth'

import '../../assets/auth/auth.css'

const useFormInput = (initialValue) => {
  const [ value, setValue ] = useState(initialValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange
  }
}

const BALogin = (props) => {
  const email = useFormInput('')
  const password = useFormInput('')

  const onSubmit = (e) => {
    e.preventDefault()
    login(email.value, password.value)
      .then((user) => {
        props.setUser(user)
        props.history.push('/bookmarks')
      })
      .catch(() => {
        // TODO: Handle .catch -> Display a  message to the user
        props.setUser(null)
      })
  }

  return (
    <div className='container'>
      <Form display='block' onSubmit={onSubmit}>
        <Form.Group as={Row} controlId='formPlaintextEmail'>
          <Col>
            <Form.Control
              size='lg'
              type='email'
              name='email'
              placeholder='example@email.com'
              onChange={email.onChange}
              value={email.value}
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
              onChange={password.onChange}
              value={password.value}
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
class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  onChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { email, password } = this.state
    login(email, password)
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
          <Form.Group as={Row} controlId='formPlaintextEmail'>
            <Col>
              <Form.Control
                size='lg'
                type='email'
                name='email'
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

export { Login, BALogin }
