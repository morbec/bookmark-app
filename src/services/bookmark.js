import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
  withCredentials: true,
})

const addBookmark = (title, url) => {
  console.log('===>', process.env.REACT_APP_SERVER_API_URL)
  console.log('url ==> ', url)
  service
    .get(`/bookmark/scrape/${url}`)
    .then((data) => {
      console.log('here ===>', data)
    })
    .catch((err) => console.log('ERR: =>', err))
  return service.post('/bookmark', { title, url }).then((bookmark) => bookmark).catch((error) => error)
}

const bookmarks = () => {
  return service.get('/bookmark').then((bookmarks) => bookmarks).catch((error) => error)
}

const getBookmarkById = (_id) => {
  service.get(`/bookmark/:${_id}`).then((bookmark) => bookmark).catch((error) => error)
}

const editBookmark = (_id, title, url) => {
  service.put(`/bookmark/:${_id}`, { title, url }).then((bookmark) => bookmark).catch((error) => error)
}

const deleteBookmark = (_id) => {
  service.delete(`/bookmark/:${_id}`).then((response) => response.data).catch((error) => error)
}

export { addBookmark, bookmarks, getBookmarkById, editBookmark, deleteBookmark }
