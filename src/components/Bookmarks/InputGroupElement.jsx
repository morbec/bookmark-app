import React from 'react'
import { InputGroup } from 'react-bootstrap'

const InputGroupElement = (props) => {
  return <InputGroup className="mb-3">{props.children}</InputGroup>
}

export default InputGroupElement
