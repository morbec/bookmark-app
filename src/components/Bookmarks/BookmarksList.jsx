/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import { Alert, Col, Jumbotron, Row } from 'react-bootstrap'
import { TagsList } from 'components/Tags'
import { bookmarks, deleteBookmark } from 'services/bookmark'
import { deleteTag } from 'services/tags'
import BookmarkCard from './Card'

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
        this.setState({
          bookmarksList: bookmarks,
          filteredBookmarks: bookmarks
        })
      })
      .catch((error) => alert(error))
  }

  /**
   * @param {string} tagId - Id of a tag object
   * @returns {Array} - Bookmarks associated with the tag
   */
  getBookmarksByTag = (tagId) => {
    return this.state.bookmarksList.filter((bookmark) =>
      bookmark._tags.find((tag) => tag._id === tagId)
    )
  }

  /**
   * Function
   * Filter the list of bookmarks when one or more tags are selected
   */
  handleTagClick = () => {
    const { activeTags } = this
    const _filteredBookmarks = []
    if (activeTags.length) {
      activeTags.forEach((tagId) => {
        const _bookmarks = this.getBookmarksByTag(tagId)
        // TODO: Check if I need to do this indeed
        _bookmarks.forEach((bookmark) => {
          if (!_filteredBookmarks.includes(bookmark))
            _filteredBookmarks.push(bookmark)
        })
      })
      this.setState({ filteredBookmarks: _filteredBookmarks })
    } else {
      this.setState((prevState) => ({
        filteredBookmarks: prevState.bookmarksList
      }))
    }
  }

  // eslint-disable-next-line no-unused-vars
  handleEditBookmark = (bookmark) => {
    // TOOD: Need an idea of how I can edit an bookmark
  }

  /**
   * Function
   * @param {Object} bookmark - Bookmark object
   */
  handleDeleteBookmark = (bookmark) => {
    bookmark._tags.forEach((tag) => {
      const bookmarksByTag = this.getBookmarksByTag(tag._id)
      if (bookmarksByTag.length === 1) {
        deleteTag(tag._id)
          .then()
          .catch((error) => alert(error))
      }
    })
    deleteBookmark(bookmark._id)
      .then(() => this.getBookmarks())
      .catch((error) => alert(error))
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
                <BookmarkCard
                  handleEditBookmark={this.handleEditBookmark}
                  handleDeleteBookmark={this.handleDeleteBookmark}
                  bookmarks={this.state.filteredBookmarks}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Alert variant="danger">
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
