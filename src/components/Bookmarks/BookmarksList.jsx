/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
import Jumbotron from 'react-bootstrap/Jumbotron'
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
      <Jumbotron style={{ height: '100vh' }}>
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
                    borderRadius: '10px 10px 10px 10px',
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
      </Jumbotron>
    )
  }
}

export default BookmarksList
