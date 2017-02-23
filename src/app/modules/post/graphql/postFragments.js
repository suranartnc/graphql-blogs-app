import gql from 'graphql-tag'

export const commonFields = gql`
  fragment commonFields on PostType {
    _id
    title
    excerpt
  }
`
