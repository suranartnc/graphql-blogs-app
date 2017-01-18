import gql from 'graphql-tag'

export const MainFields = gql`
  fragment MainFields on PostType {
    _id
    title
    body
  }
`
