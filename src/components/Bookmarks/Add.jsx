/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
// eslint-disable-next-line import/no-unresolved
import { addBookmark, editBookmark } from 'services/bookmark'
import AlertError from './AlertError'
import InputGroupElement from './InputGroupElement'
import InputGroupPrependElement from './InputGroupPrependElement'
import FormControlElement from './FormControlElement'
import ButtonElement from './ButtonElement'

const AddNewBookmark = (props) => {
  const [title, setTitle] = useState(props.editing ? props.bookmark.title : '')
  const [url, setUrl] = useState(props.editing ? props.bookmark.url : '')
  const [tags, setTags] = useState(
    props.editing
      ? props.bookmark._tags.map((tag) => tag.name).reduce((val, next) => `${val},${next}`)
      : ''
  )
  const [showModal, setShowModal] = useState(props.showModal)
  const [saving, setSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [error, setError] = useState(false)

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

  const handleCancel = () => {
    setError(false)
    setShowModal(false)
    props.hideModal()
  }

  const handleSave = () => {
    if (url.trim().length === 0) {
      setErrorMessage("URL can't be empty")
      setError(true)
    } else if (title.trim().length === 0) {
      setErrorMessage("Title can't be empty")
      setError(true)
    } else {
      setError(false)
      setSaving(true)
      const arrayOfTags = tags.split(',').filter((tag) => tag.trim())
      if (props.editing) {
        editBookmark(props.bookmark._id, title, url, arrayOfTags)
          .then((editedBookmark) => {
            setSaving(false)
            setShowModal(false)
            // TODO: Show message in the modal insteaf of alert popup
            props.saveUrl({ newBookmark: editedBookmark })
          })
          .catch((error) => alert(`error editing bookmark:  ${error}`))
      } else {
        addBookmark(title, url, arrayOfTags)
          .then((bookmark) => {
            setSaving(false)
            setShowModal(false)
            props.saveUrl({ newBookmark: bookmark })
          })
          .catch((error) => {
            setErrorMessage(error.message)
            setShowModal(true)
            setSaving(false)
            setError(true)
          })
      }
      setUrl('')
      setTitle('')
      setTags('')
    }
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
        type="button"
        variant="outline-secondary"
        onClick={() => setShowModal(true)}
        text="Add"
      />
      <Modal centered show={showModal} autoFocus onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroupElement>
            <InputGroupPrependElement groupText="www" />
            <FormControlElement
              as="input"
              name="url"
              placeholder="www.example.com"
              focus
              onChange={handleChange}
              value={props.bookmark ? props.bookmark.url : ''}
            />
          </InputGroupElement>
          <label htmlFor="url">Separate tags by , </label>
          <InputGroupElement>
            <InputGroupPrependElement groupText="Tags" />
            <FormControlElement
              name="tags"
              placeholder="tag1, tag2,"
              focus="false"
              onChange={handleChange}
              value={
                props.bookmark
                  ? props.bookmark._tags
                      .map((tag) => tag.name)
                      .reduce((val, next) => val + ',' + next)
                  : ''
              }
            />
            <InputGroupPrependElement groupText="Title" />
            <FormControlElement
              as="input"
              name="title"
              placeholder="Title"
              focus="false"
              onChange={handleChange}
              value={props.bookmark ? props.bookmark.title : ''}
              // This element is the last one to be rendered that's way I am passing
              // the values of title, url and tags here, otherwise they get cleared everytime
              // the elements above are rendered
              bookmarkTitle={props.bookmark ? props.bookmark.title : ''}
              bookmarkUrl={props.bookmark ? props.bookmark.url : ''}
              bookmarkTags={
                props.bookmark
                  ? props.bookmark._tags
                      .map((tag) => tag.name)
                      .reduce((val, next) => val + ',' + next)
                  : ''
              }
            />
          </InputGroupElement>
        </Modal.Body>
        <Modal.Footer>
          <ButtonElement type="submit" variant="danger" onClick={handleCancel} text="Cancel" />
          <ButtonElement
            type="submit"
            variant="success"
            onClick={handleSave}
            text={saving ? 'Saving...' : 'Save'}
          />
        </Modal.Footer>
        {error && <AlertError errorMessage={errorMessage} />}
      </Modal>
    </form>
  )
}

export { AddNewBookmark, AddNewBookmark as EditBookmark }
