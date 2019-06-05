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
    .catch((err) => err)
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

const logout = () => {
  return service.post('/auth/logout').then((response) => response.data).catch((err) => err)
}

const loggedIn = () => {
  return service.get('/auth/loggedin').then((response) => response.data)
}

export { signup, login, logout, loggedIn }
