import React from 'react'
import { ListGroup } from 'react-bootstrap'

const TagsList = (props) => {
  const { bookmarks } = props

  const handleClick = (tagId, tagName, event) => {
    event.target.classList.toggle('active')
    event.target.classList.contains('active')
      ? (event.target.style.backgroundColor = 'blue')
      : (event.target.style.backgroundColor = 'white')
    props.handleTagClick(tagId, tagName)
  }

  // Since a bookmark can have multiple tags I was having duplicated tags
  // To avoid that I am splitting tags id's and names in two separated Sets
  const tagIds = new Set()
  const tagNames = new Set()
  if (bookmarks.length)
    bookmarks.map((bookmark) => bookmark._tags.map((tag) => (tagIds.add(tag._id), tagNames.add(tag.name))))
  const ids = [ ...tagIds ]
  const tagsList = [ ...tagNames ].map((tagName, idx) => (
    <ListGroup.Item
      style={{
        padding: '10px 20px',
        marginTop: '1px',
        marginBottom: '1px',
        backgroundColor: '#f9f9f9'
      }}
      action
      onClick={(event) => handleClick(ids[idx], tagName, event)}
      as='li'
      key={ids[idx]}
    >
      {tagName}
    </ListGroup.Item>
  ))
  return (
    <ListGroup as='ul' style={{ padding: '0 20px' }}>
      {tagsList}
    </ListGroup>
  )
}

export default TagsList
