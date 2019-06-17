import React, { useState } from 'react'
import { FormControl } from 'react-bootstrap'

const SearchBookmarks = (props) => {
  const [ input, setInput ] = useState('')

  const handleChange = (event) => {
    const { value } = event.target
    props.filterBookmarks(value)
    setInput({ input: value })
  }

  return (
    <FormControl
      hidden
      placeholder={props.placeholder}
      onChange={handleChange}
      value={input}
      className='mr-sm-2'
    />
  )
}

export default SearchBookmarks
