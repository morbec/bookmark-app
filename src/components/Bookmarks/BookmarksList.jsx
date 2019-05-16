/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
// import { Link } from "react-router-dom";
import axios from 'axios'
// import { bookmarks } from '../../services/bookmark'

class BookmarksList extends Component {
  state = {
    bookmarksList: null,
    userLoggedIn: this.props.userLoggedIn,
  }

  service = axios.create({
    baseURL: process.env.REACT_APP_SERVER_API_URL,
    withCredentials: true,
  })

  componentDidMount() {
    if (this.props.userLoggedIn) this.getBookmarks()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ userLoggedIn: this.props.userLoggedIn })
      this.getBookmarks()
    }
  }

  getBookmarks = () => {
    console.log('.... get bookmarks ....')
    this.service
      .get('/bookmark', { withCredentials: true })
      .then((response) => {
        console.log('response data --> ', response.data)
        this.setState({
          bookmarksList: response.data,
        })
      })
      .catch((e) => console.log('** error **', e))
  }

  render() {
    console.log('render......')
    console.log('state => ', this.state)
    return (
      <div>
        {this.state.userLoggedIn ? (
          <React.Fragment>
            <ListGroup>
              {this.state.bookmarksList.map((lnk, idx) => (
                <ListGroup.Item action href={lnk}>
                  {lnk}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <h2>bookmarks</h2>
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
      </div>
    )
  }
}

export default BookmarksList
