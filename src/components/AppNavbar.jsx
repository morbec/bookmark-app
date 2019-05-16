/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { logout } from '../services/auth'

class AppNavbar extends Component {
  state = {
    userLoggedIn: this.props.userLoggedIn,
  }

  componentDidUpdate(prevProps) {
    if (this.props.userLoggedIn !== prevProps.userLoggedIn) {
      this.setState({
        userLoggedIn: this.props.userLoggedIn,
      })
    }
  }

  handleLogout = () => {
    logout().then(() => {
      this.setState({ userLoggedIn: null })
      this.props.setUser(null)
    })
  }

  render() {
    return (
      <Navbar sticky='top' variant='dark' bg='dark' expand='lg'>
        <Navbar.Brand>
          {/* TODO: Move style to css file */}
          <Link to='/bookmarks' style={{ textDecoration: 'none', color: '#9A9DA0' }}>
            Bookmarks
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='justify-content-start mr-auto'>
            {/* Disable dropdown menus for now, I'll back to it later */}
            {/* <NavDropdown hidden={!this.state.userLoggedIn} title='Add' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#'>New link</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#'>New tag</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav hidden={!this.state.userLoggedIn} className='justify-content-center'>
            <Nav.Item>
              <Form inline>
                <FormControl type='text' placeholder='Search...' className='mr-sm-2' />
              </Form>
            </Nav.Item>
          </Nav>
          <Nav className='justify-content-end'>
            {this.state.userLoggedIn ? (
              <React.Fragment>
                <Nav.Item>
                  <Nav.Link variant='outline-info'>
                    {/* TODO: Move style to css file */}
                    <Link
                      variant='outline-info'
                      to='/'
                      onClick={this.handleLogout}
                      style={{ textDecoration: 'none', color: '#9A9DA0' }}
                    >
                      Log out
                    </Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link variant='outline-info'>
                    {/* TODO: Move style to css file */}
                    <Link to='/Settings' style={{ textDecoration: 'none', color: '#9A9DA0' }}>
                      Settings
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Item>
                  <Nav.Link variant='outline-linfo'>
                    {/* TODO: Move style to css file */}
                    <Link to='/login' style={{ textDecoration: 'none', color: '#9A9DA0' }}>
                      Log in
                    </Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link variant='outline-info'>
                    {/* TODO: Move style to css file */}
                    <Link to='/sign-up' style={{ textDecoration: 'none', color: '#9A9DA0' }}>
                      Sign up
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default AppNavbar
