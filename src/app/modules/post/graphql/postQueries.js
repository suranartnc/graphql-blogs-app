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
