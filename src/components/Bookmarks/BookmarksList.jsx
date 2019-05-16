/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'

class BookmarksList extends Component {
  state = {
    bookmarksList: [],
    userLoggedIn: this.props.userLoggedIn,
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
    axios
      .get(`${process.env.REACT_APP_SERVER_API_URL}/bookmark`, { withCredentials: true })
      .then((response) => {
        this.setState({
          bookmarksList: response.data,
        })
      })
      .catch((e) => e)
  }

  render() {
    return (
      <React.Fragment>
        {this.state.userLoggedIn ? (
          <React.Fragment>
            <ListGroup variant='flush'>
              {this.state.bookmarksList.map((lnk, idx) => (
                <ListGroup.Item key={idx} as='a' target='_blank' href={lnk.url}>
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
                You need to <strong>Log in</strong> or <strong>Sign up</strong> first.
              </p>
            </Alert>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default BookmarksList
