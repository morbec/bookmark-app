/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { addBookmark, scrape } from '../services/bookmark'

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

    let { bookmarkURL } = this.state
    if (!bookmarkURL.startsWith('http')) {
      bookmarkURL = 'https://' + bookmarkURL
    }
    scrape(bookmarkURL).then((title) => {
      addBookmark(title, bookmarkURL).then((res) => res).catch((error) => error)
      this.setState({
        bookmarkURL: '',
      })
    })
  }

  render() {
    return (
      <Navbar hidden={!this.state.userLoggedIn} fixed='bottom' variant='dark' bg='dark' expand='lg'>
        <Navbar.Collapse>
          <Nav className='justify-content-center'>
            <Nav.Item>
              <OverlayTrigger
                placement='top'
                overlay={<Tooltip id='addNewBookmark'> Add new bookmark </Tooltip>}>
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
              </OverlayTrigger>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default AppBottomBar
