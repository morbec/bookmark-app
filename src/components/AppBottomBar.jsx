/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { addBookmark } from '../services/bookmark'

class AppBottomBar extends Component {
  state = {
    bookmarkURL: '',
    userLoggedIn: this.props.userLoggedIn,
  }

  componentDidUpdate(prevProps) {
    if (this.props.userLoggedIn !== prevProps.userLoggedIn) {
      this.setState({
        userLoggedIn: this.props.userLoggedIn,
      })
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // const { bookmarkURL, userLoggedIn } = this.state
    const { bookmarkURL } = this.state
    addBookmark('', bookmarkURL).then((res) => res).catch((error) => error)
    this.setState({
      bookmarkURL: '',
    })
  }

  render() {
    return (
      <Navbar hidden={!this.state.userLoggedIn} fixed='bottom' variant='dark' bg='dark' expand='lg'>
        <Navbar.Collapse>
          <Nav className='justify-content-center'>
            <Nav.Item>
              <Form inline onSubmit={this.handleSubmit}>
                <FormControl
                  name='bookmarkURL'
                  value={this.state.bookmarkURL}
                  type='text'
                  onChange={this.handleChange}
                  placeholder='https://...'
                  className='mr-sm-2'
                />
              </Form>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default AppBottomBar
