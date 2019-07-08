import React from 'react'
import { Button } from 'react-bootstrap'

const ButtonElement = (props) => {
  return (
    <Button type={props.type} variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  )
}

export default ButtonElement
