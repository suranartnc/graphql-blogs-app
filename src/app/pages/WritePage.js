import React, {Component, PropTypes} from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'immutability-helper'

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
  submitPost: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
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
    // Apollo Client cannot update existing queries if you want to add something to a list of objects without refetching the entire list
    // - refetch
    // - polling
    // - subscriptions
    submitPost: ({ title, body }) => mutate({
      variables: {
        title,
        body
      }

      // Update your UI based on the result of a mutation.
      // Most of the time, your UI will update automatically based on mutation results,
      //   as long as the object IDs in the result match up with the IDs you already have in your store
      // updateQueries = Redux's reducer
      // Use cases: removing or adding items to a list with a mutation

      // updateQueries map the name of a query to a function that receives the previous result
      //   that this query received and the result returned by the mutation

      // Note that the function must not alter the prev object (use mmutable data)

      // Once the mutation fires and the result arrives from the server (or, a result is provided through optimistic UI),
      // our updateQueries function for the Comment query will be called and the Comment query will be updated accordingly
      // updateQueries: {
      //   getPosts: (prev, { mutationResult }) => {
      //     const newPost = mutationResult.data.addPost.post
      //     return update(prev, {
      //       posts: {
      //         $unshift: [newPost]
      //       }
      //     })
      //   }
      // },

      // While waiting for mutation results from server, use this fake result instead (will be passed to updateQueries)

      // Mutation returns the single new post that was added, not the whole list
      // If we have a thousand posts, we don’t want to refetch all of them if we add a single new post.
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   addPost: {
      //     __typename: 'addPostResponseType',
      //     post: {
      //       __typename: 'PostType',
      //       _id: new Date().getTime(),
      //       title,
      //       body
      //     },
      //     errors: []
      //   }
      // }
    })
  })
})(WritePage)
