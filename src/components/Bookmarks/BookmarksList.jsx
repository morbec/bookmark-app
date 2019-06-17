/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import { Alert, Col, Jumbotron, ListGroup, Row } from 'react-bootstrap'
import { bookmarks } from 'services/bookmark'
import { TagsList } from 'components/Tags'

class BookmarksList extends Component {
  state = {
    bookmarksList: [],
    filteredBookmarks: [],
    userLoggedIn: this.props.userLoggedIn
  }
  activeTags = []

  componentDidMount() {
    this.getBookmarks()
  }

  // componentDidUpdate(prevProps, prevState) {
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ userLoggedIn: this.props.userLoggedIn })
      this.getBookmarks()
    }
  }

  getBookmarks = () => {
    bookmarks()
      .then((bookmarks) => {
        this.setState({ bookmarksList: bookmarks, filteredBookmarks: bookmarks })
      })
      .catch((error) => alert(error))
  }

  handleTagClick = () => {
    const { activeTags } = this
    const _filteredBookmarks = []
    if (activeTags.length) {
      activeTags.forEach((tagId) => {
        const _bookmarks = this.state.bookmarksList.filter((bookmark) =>
          bookmark._tags.find((tag) => tag._id === tagId)
        )
        _bookmarks.forEach((bookmark) => {
          if (!_filteredBookmarks.includes(bookmark)) _filteredBookmarks.push(bookmark)
        })
      })
      this.setState({ filteredBookmarks: _filteredBookmarks })
    } else {
      this.setState((prevState) => ({ filteredBookmarks: prevState.bookmarksList }))
    }
  }

  render() {
    return (
      <Jumbotron style={{ height: '100vh' }}>
        <Row>
          <Col xs={2}>
            <TagsList
              activeTags={this.activeTags}
              handleTagClick={this.handleTagClick}
              bookmarks={this.state.bookmarksList}
            />
          </Col>
          <Col xs={9}>
            {this.state.userLoggedIn ? (
              <React.Fragment>
                <ListGroup variant='flush'>
                  {this.state.filteredBookmarks.map((lnk, idx) => (
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
                      href={lnk.url}
                    >
                      {lnk.title}
                      {' - '}
                      {lnk.url}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Alert variant='danger'>
                  <Alert.Heading>Protected content</Alert.Heading>
                  <p>
                    You need to
                    <strong>Log in</strong>
                    or
                    <strong>Sign up</strong>
                    first.
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
