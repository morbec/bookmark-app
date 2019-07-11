import React from 'react'
import { InputGroup } from 'react-bootstrap'

const InputGroupPrependElement = (props) => {
  return (
    <InputGroup.Prepend>
      <InputGroup.Text>{props.groupText}</InputGroup.Text>
    </InputGroup.Prepend>
  )
}

export default InputGroupPrependElement
