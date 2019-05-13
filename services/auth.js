import axios from 'axios'

const service = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: process.env.REACT_APP_SERVER_API_URL,
  withCredentials: true,
})

const signup = (name, email, password) => {
  return service
    .post('/signup', { name, email, password })
    .then((response) => response.data)
    .catch((err) => err)
}

const signin = (email, password) => {
  return service.post('/login', { email, password }).then((response) => response.data).catch((err) => err)
}

const logout = () => {
  return service.post('/logout').then((response) => response.data).catch((err) => err)
}

const loggedIn = () => {
  return service.get('/loggedin').then((response) => response.data)
}

export { signup, signin, logout, loggedIn }
