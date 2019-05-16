/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
// import React, { Component } from 'react'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest} // ??
      render={(props) => {
        if (user) {
          return <Component {...props} user={user} />
        } else {
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
      }}
    />
  )
}

export default ProtectedRoute
