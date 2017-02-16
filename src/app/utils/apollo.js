export function fetchMore ({ name, data, fetchMore }) {
  return fetchMore({
    variables: {
      offset: data.length
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult.data) { return prev }
      return Object.assign({}, prev, {
        [name]: [...prev[name], ...fetchMoreResult.data[name]]
      })
    }
  })
}
