/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { addBookmark } from 'services/bookmark'

const AddNewBookmark = (props) => {
  const [ userLoggedIn, setUserLoggedIn ] = useState(props.userLoggedIn)
  const [ title, setTitle ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ tags, setTags ] = useState('')
  const [ showModal, setShowModal ] = useState(false)

  const setState = (state, newValue) => {
    switch (state) {
      case 'title':
        setTitle(newValue)
        break
      case 'url':
        setUrl(newValue)
        break
      case 'tags':
        setTags(newValue.toLowerCase())
        break
      default:
        break
    }
  }

  const handleSave = () => {
    const arrayOfTags = tags.split(',').map((tag) => tag.trim())
    addBookmark(title, url, arrayOfTags)
      .then((bookmark) => {
        props.saveUrl({ newBookmark: bookmark })
        setShowModal(false)
      })
      .catch((error) => {
        alert(error)
        setShowModal(true)
      })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setState(name, value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setShowModal(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button onClick={() => setShowModal(true)}>Add</Button>
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Add new bookmark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text id='basic-addon3'>www</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder='www.example.com'
              name='url'
              as='input'
              onChange={handleChange}
              id='newBookmarkUrl'
              aria-describedby='new-bookmark'
            />
          </InputGroup>
          <label htmlFor='url'>Separate tags by , </label>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text>Tags</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name='tags'
              as='input'
              onChange={handleChange}
              id='newTags'
              aria-describedby='newTags'
            />
            <InputGroup.Prepend>
              <InputGroup.Text>Title</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name='title'
              as='input'
              onChange={handleChange}
              id='newTags'
              aria-describedby='newTitle'
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button type='submit' variant='success' onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  )
}

export default AddNewBookmark
