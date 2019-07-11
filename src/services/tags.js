import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
  withCredentials: true
})

const tags = () => {
  return service
    .get('/tag')
    .then((response) => response.data)
    .catch((error) => error)
}

const tagsById = (_id) => {
  return service
    .get(`/tag/${_id}`)
    .then((tag) => tag)
    .catch((error) => error)
}

const editTag = (_id, name) => {
  return service
    .put(`/tag/${_id}`, { name })
    .then((tag) => tag)
    .catch((error) => error)
}

const deleteTag = async (_id) => {
  try {
    return await service.delete(`/tag/${_id}`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export { tags, tagsById, editTag, deleteTag }
