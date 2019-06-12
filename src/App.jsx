/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unused-state */
import React, { useEffect, useState } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import BookmarksList from 'components/Bookmarks/BookmarksList'
import AppNavbar from 'components/AppNavbar'
import SignUp from 'components/Auth/SignUp'
import { Login } from 'components/Auth/Login'
import { loggedIn } from 'services/auth'
import Home from 'components/Home'

import './App.css'

const browserHistory = createBrowserHistory()

const App = () => {
  const [ loggedInUser, setLoggedInUser ] = useState(null)

  useEffect(
    () => {
      if (!loggedInUser) {
        loggedIn().then((user) => {
          setLoggedInUser(user)
        })
      }
    },
    [ loggedInUser ]
  )

  const setUser = (user) => setLoggedInUser(user)

  // update the list of bookmarks after a new bookmark is successfully added to the database
  // So far, I don't need to manage bookmark state itself
  const [ , setBookmark ] = useState(null)
  const saveNewBookmark = (newBookmark) => {
    setBookmark(newBookmark)
  }

  return (
    <div className='App'>
      <Router history={browserHistory}>
        <AppNavbar saveUrl={saveNewBookmark} setUser={setUser} userLoggedIn={loggedInUser} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/sign-up' render={(props) => <SignUp {...props} setUser={setUser} />} />
          <Route exact path='/login' render={(props) => <Login {...props} setUser={setUser} />} />
          <Route
            exact
            path='/bookmarks'
            render={(props) => <BookmarksList {...props} userLoggedIn={loggedInUser} />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
