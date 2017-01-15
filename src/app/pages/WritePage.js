import React, {Component, PropTypes} from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class WritePage extends Component {

  state = {
    title: '',
    body: ''
  }

  handleInputChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.props.mutate({
      variables: {
        title: this.state.title,
        body: this.state.body
      }
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" onChange={this.handleInputChange('title')} />
          <textarea onChange={this.handleInputChange('body')} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

WritePage.propTypes = {
  mutate: PropTypes.func.isRequired
}

const addPost = gql`
  mutation addPost($title: String!, $body: String!) {
    addPost(
      title: $title,
      body: $body
    ) {
      post {
        _id
        title
        body
      }
      errors {
        key
        message
      }
    }
  }
`

export default graphql(addPost)(WritePage)
