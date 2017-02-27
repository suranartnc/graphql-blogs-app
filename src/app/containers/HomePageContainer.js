import { graphql } from 'react-apollo'
import { pure, withHandlers, compose } from 'recompose'
import { GET_POSTS } from 'app/modules/post/graphql/postQueries'
import { fetchMore as fetchMoreUtil } from 'utils/apollo'
import withPreloader from 'hocs/withPreloader'

import HomePage from 'components/pages/HomePage'

export default compose(
  graphql(GET_POSTS, {
    options: {
      forceFetch: true,
      variables: {
        limit: 9,
        offset: 0
      }
    }
  }),
  withPreloader,
  withHandlers({
    onNextPageClicked: ({ data: { posts, fetchMore } }) => event => fetchMoreUtil({
      name: 'posts',
      data: posts,
      fetchMore
    })
  }),
  pure
)(HomePage)
