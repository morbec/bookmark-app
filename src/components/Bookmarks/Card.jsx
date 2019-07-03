import React from 'react'
import { CardColumns, Card } from 'react-bootstrap'

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
              <small className="text-muted">foo</small>
            </Card.Footer>
          </Card>
        ))}
      </CardColumns>
    </React.Fragment>
  )
}

export default BookmarkCard
