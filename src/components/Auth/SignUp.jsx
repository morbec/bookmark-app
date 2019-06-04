/* eslint-disable react/prop-types */
import React from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { signup } from '../../services/auth'
import { useFormInput } from './Login'

import '../../assets/auth/auth.css'

const SignUp = (props) => {
  const name = useFormInput('')
  const email = useFormInput('')
  const password = useFormInput('')

  const onSubmit = (e) => {
    e.preventDefault()
    signup(name.value, email.value, password.value)
      .then((user) => {
        props.setUser(user)
        props.history.push('/bookmarks')
      })
      .catch(() => props.setUser(null))
  }

  return (
    <div className='container'>
      <Form display='block' onSubmit={onSubmit}>
        <Form.Group as={Row} controlId='formPlaintextPassword'>
          <Col>
            <Form.Control size='lg' type='text' name='name' placeholder='Enter your name' {...name} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formPlaintextPassword'>
          <Col>
            <Form.Control size='lg' type='email' name='email' placeholder='example@email.com' {...email} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formPlaintextPassword'>
          <Col>
            <Form.Control
              size='lg'
              type='password'
              name='password'
              placeholder='Enter your password'
              {...password}
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Button type='submit' variant='outline-primary'>
            Sign up
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default SignUp
