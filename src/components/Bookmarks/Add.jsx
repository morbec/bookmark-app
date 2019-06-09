/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { addBookmark } from 'services/bookmark'

const InputGroupElement = (props) => {
  return <InputGroup className='mb-3'>{props.children}</InputGroup>
}

const InputGroupPrependElement = (props) => {
  return (
    <InputGroup.Prepend>
      <InputGroup.Text>{props.groupText}</InputGroup.Text>
    </InputGroup.Prepend>
  )
}

const FormControlElement = (props) => {
  return (
    <FormControl
      name={props.name}
      placeholder={props.placeholder}
      // id={props.name}
      as='input'
      focus={props.focus}
      aria-describedby={props.name}
      onChange={props.onChange}
    />
  )
}

const ButtonElement = (props) => {
  return (
    <Button type={props.type} variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  )
}

const AddNewBookmark = (props) => {
  const [ userLoggedIn, setUserLoggedIn ] = useState(props.userLoggedIn)
  const [ title, setTitle ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ tags, setTags ] = useState('')
  const [ showModal, setShowModal ] = useState(false)
  const [ saving, setSaving ] = useState(false)

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
    setSaving(true)
    const arrayOfTags = tags.split(',').map((tag) => tag.trim())
    addBookmark(title, url, arrayOfTags)
      .then((bookmark) => {
        props.saveUrl({ newBookmark: bookmark })
        setSaving(false)
        setShowModal(false)
      })
      .catch((error) => {
        alert(error)
        setShowModal(true)
        setSaving(false)
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
      <ButtonElement
        type='button'
        variant='outline-secondary'
        onClick={() => setShowModal(true)}
        text='Add'
      />
      <Modal centered show={showModal} autoFocus onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Add new bookmark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroupElement>
            <InputGroupPrependElement groupText='www' />
            <FormControlElement name='url' placeholder='www.example.com' focus onChange={handleChange} />
          </InputGroupElement>
          <label htmlFor='url'>Separate tags by , </label>
          <InputGroupElement>
            <InputGroupPrependElement groupText='Tags' />
            <FormControlElement name='tags' placeholder='tag1, tag2,' focus={false} onChange={handleChange} />
            <InputGroupPrependElement groupText='Title' />
            <FormControlElement name='title' placeholder='Title' focus={false} onChange={handleChange} />
          </InputGroupElement>
        </Modal.Body>
        <Modal.Footer>
          <ButtonElement type='submit' variant='danger' onClick={() => setShowModal(false)} text='Cancel' />
          <ButtonElement
            type='submit'
            variant='success'
            onClick={handleSave}
            text={saving ? 'Saving...' : 'Save'}
          />
        </Modal.Footer>
      </Modal>
    </form>
  )
}

export default AddNewBookmark
