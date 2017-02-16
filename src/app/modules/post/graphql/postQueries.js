import gql from 'graphql-tag'
import { commonFields } from './postFragments'

export const GET_POSTS = gql`
  query getPosts($limit: Int, $offset: Int) {
    posts(limit: $limit, offset: $offset) {
      ...commonFields
    }
  }
  ${commonFields}
`
export const GET_POST = gql`
  query getPost($id: String!) {
    post(_id: $id) {
      _id
      title
      body
    }
  }
`
