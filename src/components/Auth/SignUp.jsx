/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
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
  const [ signUpError, setSignUpError ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    signup(name.value, email.value, password.value)
      .then((user) => {
        props.setUser(user)
        props.history.push('/bookmarks')
      })
      .catch((error) => {
        props.setUser(null)
        setSignUpError(true)
        switch (error) {
          case 0:
            setErrorMessage('Could not connect to server 🙁')
            break
          case 409:
            setErrorMessage('The email already exists')
            break
          default:
            setErrorMessage('Something went wrong... 😩')
            break
        }
      })
  }

  const handleDismiss = (show) => setSignUpError(show)

  return (
    <div className='container'>
      <Form display='block' onSubmit={onSubmit}>
        <Form.Group as={Row} controlId='errorMessage'>
          <Col>
            {signUpError && (
              <Alert variant='danger' onClose={handleDismiss} dismissible>
                <Alert.Heading>You got an error </Alert.Heading>
                <p>{errorMessage}</p>
              </Alert>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formPlaintextPassword'>
          <Col>
            <Form.Control
              size='lg'
              type='text'
              name='name'
              placeholder='Enter your name'
              {...name}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formPlaintextPassword'>
          <Col>
            <Form.Control
              size='lg'
              type='email'
              name='email'
              placeholder='example@email.com'
              {...email}
              required
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
              required
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
