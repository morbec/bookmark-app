/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Alert, Col, Jumbotron, Row } from 'react-bootstrap'
import { TagsList } from 'components/Tags'
import { bookmarks, deleteBookmark } from 'services/bookmark'
import { deleteTag } from 'services/tags'
import BookmarkCard from './Card'
import { EditBookmark } from './Add'

class EditBookmarkModal extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }
  componentDidMount() {
    document.getElementById('edit-bookmark').appendChild(this.el)
  }

  // NOTE: this is called after user click the edit button for a second time
  // Maybe I can use this to change the showEditBookmarkModal value to false again
  componentDidUpdate() {}

  componentWillUnmount() {
    document.getElementById('edit-bookmark').removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

// eslint-disable-next-line react/no-multi-comp
class BookmarksList extends Component {
  state = {
    bookmark: null,
    bookmarksList: [],
    filteredBookmarks: [],
    userLoggedIn: this.props.userLoggedIn,
    showEditBookmarkModal: false
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
          if (!_filteredBookmarks.includes(bookmark)) _filteredBookmarks.push(bookmark)
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
    this.setState({ bookmark: bookmark })
    this.setState({ showEditBookmarkModal: true })
  }

  /**
   * Function
   * @param {{title: string, url: string, _tags:[string]}} bookmark - A Bookmark object
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
    const showModal = this.state.showEditBookmarkModal ? (
      <EditBookmarkModal>
        <EditBookmark
          showModal
          saveUrl={this.props.saveUrl}
          bookmark={this.state.bookmark}
          userLoggedIn={this.state.userLoggedIn}
          editing
          modalTitle="Edit bookmark"
        />
      </EditBookmarkModal>
    ) : (
      ''
    )
    return (
      <div>
        {showModal}
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
      </div>
    )
  }
}

export default BookmarksList
