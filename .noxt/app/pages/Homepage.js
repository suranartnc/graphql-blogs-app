import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const GET_POSTS = gql`
  query getPosts($limit: Int) {
    posts(first: $limit) {
      _id
      title
    }
  }
`

const withPosts = (query) => graphql(query)

function Homepage () {
  return <div>Noxt.js</div>
}

export default withPosts(GET_POSTS)(Homepage)
