/* eslint-disable react/prop-types */
import React from 'react'
import axios from 'axios'
import AppBottomBar from '../AppBottomBar'

class AddBookmark extends React.Component {
  state = {
    title: '',
    url: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios
      .post(
        `${process.env.REACT_APP_SERVER_API_URL}/bookmark`,
        {
          title: this.state.title,
          url: this.state.url,
        },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        this.props.getData()
        this.setState({ title: '', url: '' })
      })
  }

  render() {
    return <AppBottomBar />
  }
}

export default AddBookmark
