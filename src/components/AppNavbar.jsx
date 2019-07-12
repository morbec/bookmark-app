/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// import { logout } from 'services/auth'
import { logout } from '../services/auth'
import { AddNewBookmark } from './Bookmarks/Add'
import SearchBookmarks from './Bookmarks/Search'

class AppNavbar extends Component {
  state = {
    userLoggedIn: this.props.userLoggedIn
  }

  componentDidUpdate(prevProps) {
    if (this.props.userLoggedIn !== prevProps.userLoggedIn) {
      this.setState({
        userLoggedIn: this.props.userLoggedIn
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
      <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
        <Navbar.Brand>
          {/* TODO: Move style to css file */}
          <Link to="/bookmarks" style={{ textDecoration: 'none', color: '#9A9DA0' }}>
            Bookmarks
          </Link>
        </Navbar.Brand>
        <Navbar>
          {this.state.userLoggedIn && (
            <AddNewBookmark
              editing={false}
              saveUrl={this.props.saveUrl}
              userLoggedIn={this.state.userLoggedIn}
              modalTitle="Add new bookmark"
            />
          )}
        </Navbar>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav hidden={!this.state.userLoggedIn} className="justify-content-center">
            <Nav.Item>
              <Form inline>
                <SearchBookmarks placeholder="Search..." />
              </Form>
            </Nav.Item>
          </Nav>
          <Nav className="justify-content-end">
            {this.state.userLoggedIn ? (
              <React.Fragment>
                <Nav.Item>
                  <Nav.Link
                    variant="outline-info"
                    as="a"
                    href="/"
                    onClick={this.handleLogout}
                    style={{ textDecoration: 'none', color: '#9A9DA0' }}
                  >
                    Log out
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    variant="outline-info"
                    as="a"
                    href="/Settings"
                    disabled
                    style={{ textDecoration: 'none', color: '#9A9DA0' }}
                  >
                    Settings
                  </Nav.Link>
                </Nav.Item>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Item>
                  <Nav.Link
                    variant="outline-linfo"
                    as="a"
                    href="/login"
                    style={{ textDecoration: 'none', color: '#9A9DA0' }}
                  >
                    Log in
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    variant="outline-info"
                    as="a"
                    href="/sign-up"
                    style={{ textDecoration: 'none', color: '#9A9DA0' }}
                  >
                    Sign up
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
