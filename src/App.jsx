/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unused-state */
import React, { useState, useEffect } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import AppNavbar from './components/AppNavbar'
import AppBottomBar from './components/AppBottomBar'
import SignUp from './components/Auth/SignUp'
import { BALogin } from './components/Auth/Login'
import { loggedIn } from './services/auth'
import BookmarksList from './components/Bookmarks/BookmarksList'
// import ProtectedRoute from './components/ProtectRoute'

import './App.css'
import Home from './components/Home'

const browserHistory = createBrowserHistory()

const App = () => {
  const [ userLoggedIn, setUserLoggedIn ] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [ bookmark, setBookmark ] = useState(null)

  const getUser = () => {
    loggedIn().then((user) => {
      setUser(user)
    })
  }

  const setUser = (user) => {
    setUserLoggedIn(user)
  }

  useEffect(() => {
    getUser()
  })

  const saveUrl = (bookmark) => {
    setBookmark(bookmark)
  }

  return (
    <div className='App'>
      <Router history={browserHistory}>
        <AppNavbar setUser={setUser} userLoggedIn={userLoggedIn} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/sign-up' render={(props) => <SignUp {...props} setUser={setUser} />} />
          <Route exact path='/login' render={(props) => <BALogin {...props} setUser={setUser} />} />
          <Route
            exact
            path='/bookmarks'
            render={(props) => <BookmarksList {...props} userLoggedIn={userLoggedIn} />}
          />
        </Switch>
        <AppBottomBar saveUrl={saveUrl} userLoggedIn={userLoggedIn} />
      </Router>
    </div>
  )
}

export default App
