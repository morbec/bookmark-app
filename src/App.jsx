/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import AppNavbar from './components/AppNavbar'
import AppBottomBar from './components/AppBottomBar'
import SignUp from './components/Auth/SignUp'
import Login from './components/Auth/Login'
import { loggedIn } from './services/auth'

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
            <Route exact path='/sign-up' render={() => <SignUp setUser={this.setUser} />} />
            <Route exact path='/login' render={() => <Login setUser={this.setUser} />} />
          </Switch>
          <AppBottomBar userLoggedIn={this.state.userLoggedIn} />
        </Router>
      </div>
    )
  }
}

export default App
