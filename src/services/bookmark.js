import axios from 'axios'

const service = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_SERVER_API_URL,
  withCredentials: true
})

const addBookmark = (title, url, tags) => {
  return service
    .post('/bookmark', { title, url, tags })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error))
}

const bookmarks = () => {
  return service
    .get('/bookmark')
    .then((response) => response.data)
    .catch((error) => error)
}

const getBookmarkById = (_id) => {
  service
    .get(`/bookmark/:${_id}`)
    .then((bookmark) => bookmark)
    .catch((error) => error)
}

/**
 * Edit bookmark
 * @param {string} _id id of the bookmark being edited
 * @param {string} title Title of the bookmark being edited
 * @param {string} url URL of the bookmark being edited
 * @param {[string]} tags Tags edited/added to the bookmark being edited
 * @returns {Promise}
 */
const editBookmark = async (_id, title, url, tags) => {
  try {
    return await service.put(`/bookmark/${_id}`, { title, url, tags })
  } catch (error) {
    return Promise.reject(error)
  }
}

const deleteBookmark = async (_id) => {
  try {
    return await service.delete(`/bookmark/${_id}`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export { addBookmark, bookmarks, getBookmarkById, editBookmark, deleteBookmark }
