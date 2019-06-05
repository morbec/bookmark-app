/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import { login } from '../../services/auth'

import '../../assets/auth/auth.css'

// TODO: Move this to a proper file
const useFormInput = (initialValue) => {
  const [ value, setValue ] = useState(initialValue)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return {
    value,
    onChange: handleChange
  }
}

const Login = (props) => {
  const email = useFormInput('')
  const password = useFormInput('')
  const [ loginError, setLoginError ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    setLoginError(false)
    login(email.value, password.value)
      .then((user) => {
        props.setUser(user)
        props.history.push('/bookmarks')
      })
      .catch((error) => {
        setLoginError(true)
        switch (error) {
          case 0:
            // setErrorMessage('Could not connect to server, try again later. 🙁')
            setErrorMessage('Could not connect to server 🙁')
            break
          case 401:
            setErrorMessage('Incorrect username or password.')
            break
          default:
            setErrorMessage('Something went wrong... 😩')
            break
        }
        props.setUser(null)
      })
  }

  const handleDismiss = (show) => setLoginError(show)

  return (
    <div className='container'>
      <Form display='block' onSubmit={onSubmit}>
        <Form.Group as={Row} controlId='errorMessage'>
          <Col>
            {loginError ? (
              <Alert variant='danger' onClose={handleDismiss} dismissible>
                <Alert.Heading>You got an error</Alert.Heading>
                <p>{errorMessage}</p>
              </Alert>
            ) : (
              <React.Fragment />
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formPlaintextEmail'>
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
              {...password}
              required
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

export { useFormInput, Login }
