/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { login } from '../../services/auth'

import '../../assets/auth/auth.css'

// TODO: Move this to a proper file
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

const Login = (props) => {
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
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export { useFormInput, Login as BALogin }
