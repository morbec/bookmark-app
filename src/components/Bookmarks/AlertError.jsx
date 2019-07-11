import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertError = (props) => (
  <Alert variant="danger">
    <Alert.Heading>Something whent wrong</Alert.Heading>
    <p>{props.errorMessage}</p>
  </Alert>
)

export default AlertError
