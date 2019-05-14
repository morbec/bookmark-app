/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

class AppNavbar extends Component {
  state = {
    userLoggedIn: null,
  }

  render() {
    return (
      <Navbar sticky='top' variant='dark' bg='dark' expand='lg'>
        <Navbar.Brand href='#home'>Bookmarks</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='justify-content-start mr-auto'>
            <NavDropdown title='Add' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#'>New link</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#'>New tag</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className='justify-content-center'>
            <Nav.Item>
              <Form inline>
                <FormControl type='text' placeholder='Search...' className='mr-sm-2' />
                <Button type='submit'>Search</Button>
              </Form>
            </Nav.Item>
          </Nav>
          <Nav className='justify-content-end'>
            <Nav.Item>
              <Nav.Link variant='outline-linfo' href='/login'>
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link variant='outline-info' href='/sign-up'>
                Sign up
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default AppNavbar
