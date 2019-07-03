import React from 'react'
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardColumns
} from 'react-bootstrap'

const BookmarkCard = (props) => {
  const { bookmarks } = props
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
                  <Button variant="success" size="sm">
                    Edit
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="danger" size="sm">
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
