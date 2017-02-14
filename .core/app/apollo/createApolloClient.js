import ApolloClient, { toIdValue } from 'apollo-client'

// Normalization with dataIdFromObject
// Use unique IDs across all types of objects

function dataIdFromObject (result) {
  if (result._id && result.__typename) {
    return result.__typename + result._id
  }
  return null
}

export default options => new ApolloClient(Object.assign({}, {
  addTypename: true,
  dataIdFromObject,

  // use the existing cache from the previous list view query
  // customResolvers: {
  //   Query: {
  //     post: (_, { _id }) => toIdValue(dataIdFromObject({
  //       __typename: 'PostType',
  //       _id
  //     })),
  //   },
  // }
}, options))
