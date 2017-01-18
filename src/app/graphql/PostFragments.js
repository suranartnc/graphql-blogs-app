import gql from 'graphql-tag'

// There are two principal uses for fragments in Apollo:

// 1. Sharing fields between multiple queries, mutations or subscriptions.
// 2. Breaking your queries up to allow you to co-locate field access with the places they are used.
// (split some subfields of a field in to a group to pass to sub components that actually use those fields => easy to validate + filter props)

export const MainFields = gql`
  fragment MainFields on PostType {
    _id
    title
    body
  }
`
