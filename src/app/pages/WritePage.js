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
    const { title, body } = this.state
    this.props.submitPost({
      title,
      body
    })
    .then(({ data }) => {
      console.log('got data', data)
    }).catch((error) => {
      console.log('there was an error sending the query', error)
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
  submitPost: PropTypes.func.isRequired
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

export default graphql(addPost, {
  props: ({ mutate }) => ({
    submitPost: ({ title, body }) => mutate({
      variables: {
        title,
        body
      }
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   addPost: {
      //     __typename: 'PostType',
      //     post: {
      //       _id: '',
      //       title: '',
      //       body: ''
      //     },
      //     errors: []
      //   }
      // }
    })
  })
})(WritePage)
