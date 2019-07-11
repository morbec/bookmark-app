import React, { useState } from 'react'
import { FormControl } from 'react-bootstrap'

const FormControlElement = (props) => {
  const [state, setState] = useState({
    value: props.value ? props.value : '',
    title: props.bookmarkTitle,
    url: props.bookmarkUrl,
    tags: props.bookmarkTags
  })

  const handleChange = (event) => {
    const {
      target: { name, value }
    } = event
    // this controls the value displayed in the View
    setState({ value: value })
    // This controls the  state values of the bookmark's properties
    setState({ name, value })
    props.onChange(event)
  }

  return (
    <FormControl
      name={props.name}
      placeholder={props.placeholder}
      as="input"
      focus={props.focus.toString()}
      aria-describedby={props.name}
      onChange={handleChange}
      // value={props.value}
      value={state.value}
    />
  )
}

export default FormControlElement
