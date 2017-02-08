import gql from 'graphql-tag'
import CommonFieldsFragments from './CommonFieldsFragments'

export default gql`
  query getPosts($limit: Int, $offset: Int) {
    posts(limit: $limit, offset: $offset) {
      ...CommonFields
    }
  }
  ${CommonFieldsFragments}
`
