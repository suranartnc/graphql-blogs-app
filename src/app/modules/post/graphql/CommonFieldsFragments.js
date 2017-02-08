import gql from 'graphql-tag'

export default gql`
  fragment CommonFields on PostType {
    _id
    title
    body
  }
`
