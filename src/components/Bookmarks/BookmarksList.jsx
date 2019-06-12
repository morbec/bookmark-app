/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { Alert, Col, Jumbotron, ListGroup, Row } from 'react-bootstrap'
import { bookmarks } from 'services/bookmark'
import { TagsList } from 'components/Tags'

class BookmarksList extends Component {
  state = {
    bookmarksList: [],
    userLoggedIn: this.props.userLoggedIn
  }

  componentDidMount() {
    this.getBookmarks()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ userLoggedIn: this.props.userLoggedIn })
      this.getBookmarks()
    }
  }

  getBookmarks = () => {
    bookmarks()
      .then((bookmarks) => {
        this.setState({ bookmarksList: bookmarks })
      })
      .catch((error) => alert(error))
  }

  render() {
    return (
      <Jumbotron style={{ height: '100vh' }}>
        <Row>
          <Col xs={2}>
            Tags
            {/* <TagsList bookmarks={this.state.bookmarksList} /> */}
          </Col>
          <Col xs={9}>
            {this.state.userLoggedIn ? (
              <React.Fragment>
                <ListGroup variant='flush'>
                  {this.state.bookmarksList.map((lnk, idx) => (
                    // TODO: Move the styling to a proper css file
                    <ListGroup.Item
                      style={{
                        padding: '25px',
                        marginTop: '2px',
                        marginBottom: '5px',
                        borderRadius: '10px 10px 10px 10px'
                      }}
                      key={idx}
                      as='a'
                      target='_blank'
                      href={lnk.url}>
                      {lnk.title} - {lnk.url}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Alert variant='danger'>
                  <Alert.Heading>Protected content</Alert.Heading>
                  <p>
                    You need to <strong>Log in</strong> or <strong>Sign up</strong> first.
                  </p>
                </Alert>
              </React.Fragment>
            )}
          </Col>
        </Row>
      </Jumbotron>
    )
  }
}

export default BookmarksList
