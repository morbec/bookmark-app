import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
  withCredentials: true
})

const signup = (name, email, password) => {
  return service
    .post('/auth/signup', { name, email, password })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return Promise.reject(error.request.status)
    })
}

const login = (email, password) => {
  return service
    .post('/auth/login', { email, password })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return Promise.reject(error.request.status)
    })
}

// TODO: Return a rejected Promise in the catch
const logout = () => {
  return service
    .post('/auth/logout')
    .then((response) => response.data)
    .catch((error) => Promise.reject(error))
}

const loggedIn = () => {
  return service.get('/auth/loggedin').then((response) => response.data)
}

export { signup, login, logout, loggedIn }
