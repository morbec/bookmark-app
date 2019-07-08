import React from 'react'
import { FormControl } from 'react-bootstrap'

const FormControlElement = (props) => {
  return (
    <FormControl
      name={props.name}
      placeholder={props.placeholder}
      as="input"
      focus={props.focus.toString()}
      aria-describedby={props.name}
      onChange={props.onChange}
    />
  )
}

export default FormControlElement
