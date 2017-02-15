import gql from 'graphql-tag'
import { commonFields } from './postFragments'

export const ADD_POST = gql`
  mutation addPost($title: String!, $body: String!) {
    addPost(
      title: $title,
      body: $body
    ) {
      post {
        ...commonFields
      }
      errors {
        key
        message
      }
    }
  }
  ${commonFields}
`
