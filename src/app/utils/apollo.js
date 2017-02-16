import update from 'immutability-helper'

export function fetchMore ({ name, data, fetchMore, position = 'APPEND' }) {
  return fetchMore({
    variables: {
      offset: data.length
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult.data) {
        return previousResult
      }

      const command = {
        'PREPEND': '$unshift',
        'APPEND': '$push'
      }[position]

      return update(previousResult, {
        [name]: {
          [command]: fetchMoreResult.data[name]
        }
      })
    }
  })
}
