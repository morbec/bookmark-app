import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

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
          <Switch>
            <Route exact path='/sign-up' render={() => <SignUp setUser={this.setUser} />} />
            <Route exact path='/login' render={() => <Login setUser={this.setUser} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
