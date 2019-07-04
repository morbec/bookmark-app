import React from 'react'
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardColumns
} from 'react-bootstrap'

const BookmarkCard = (props) => {
  const { bookmarks, handleDeleteBookmark } = props

  const handleClick = (event, bookmark) => {
    event.persist()
    switch (event.target.innerText) {
      case 'Edit':
        break
      case 'Delete':
        handleDeleteBookmark(bookmark)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <CardColumns>
        {bookmarks.map((bookmark, index) => (
          <Card key={index} border="info" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{bookmark.title}</Card.Title>
              <Card.Text>{bookmark.url}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <ButtonToolbar className="justify-content-between">
                <ButtonGroup>
                  <Button
                    onClick={(evt) => handleClick(evt, bookmark)}
                    variant="success"
                    size="sm"
                  >
                    Edit
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button
                    onClick={(evt) => handleClick(evt, bookmark)}
                    variant="danger"
                    size="sm"
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Card.Footer>
          </Card>
        ))}
      </CardColumns>
    </React.Fragment>
  )
}

export default BookmarkCard
