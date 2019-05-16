/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import AppNavbar from './components/AppNavbar'
import AppBottomBar from './components/AppBottomBar'
import SignUp from './components/Auth/SignUp'
import Login from './components/Auth/Login'
import { loggedIn } from './services/auth'
import BookmarksList from './components/Bookmarks/BookmarksList'
// import ProtectedRoute from './components/ProtectRoute'

// import './App.css'

const browserHistory = createBrowserHistory()

class App extends Component {
  state = {
    userLoggedIn: null,
  }

  componentDidMount() {
    this.getUser()
  }

  setUser = (user) => {
    this.setState({
      userLoggedIn: user,
    })
  }

  getUser = () => {
    loggedIn().then((user) => {
      this.setState({
        userLoggedIn: user,
      })
    })
  }

  render() {
    return (
      <div className='App'>
        <Router history={browserHistory}>
          <AppNavbar setUser={this.setUser} userLoggedIn={this.state.userLoggedIn} />
          <Switch>
            <Route exact path='/sign-up' render={(props) => <SignUp {...props} setUser={this.setUser} />} />
            <Route exact path='/login' render={(props) => <Login {...props} setUser={this.setUser} />} />
            <Route
              exact
              path='/bookmarks'
              render={(props) => <BookmarksList {...props} userLoggedIn={this.state.userLoggedIn} />}
            />

            {/* <ProtectedRoute
              component={BookmarksList}
              exact={true}
              user={this.state.userLoggedIn}
              path='/bookmarks'
            /> */}
          </Switch>
          <AppBottomBar userLoggedIn={this.state.userLoggedIn} />
        </Router>
      </div>
    )
  }
}

export default App
