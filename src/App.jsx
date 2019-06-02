/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unused-state */
import React, { useEffect, useState } from 'react'
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

// TODO: Use Context...
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
  const [ , setBookmark ] = useState(null)
  const saveNewBookmark = (newBookmark) => {
    setBookmark(newBookmark)
  }

  return (
    <div className='App'>
      <Router history={browserHistory}>
        <AppNavbar setUser={setUser} userLoggedIn={loggedInUser} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/sign-up' render={(props) => <SignUp {...props} setUser={setUser} />} />
          <Route exact path='/login' render={(props) => <BALogin {...props} setUser={setUser} />} />
          <Route
            exact
            path='/bookmarks'
            render={(props) => <BookmarksList {...props} userLoggedIn={loggedInUser} />}
          />
        </Switch>
        <AppBottomBar saveUrl={saveNewBookmark} userLoggedIn={loggedInUser} />
      </Router>
    </div>
  )
}

export default App
