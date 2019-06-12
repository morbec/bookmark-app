import React from 'react'

const TagsList = (props) => {
  // const bookmarks = props.bookmarks
  // const tagsList = bookmarks.map((bookmark) => bookmark._tags.map((tag) => <li key={tag._id}>{tag.name}</li>))
  // return <ul>{tagsList}</ul>
  return <p>{props.bookmarks}</p>
}

export default TagsList
