import EntryPage from 'pages/EntryPage'

import { graphql } from 'react-apollo'
import { compose, pure } from 'recompose'
import { GET_POST } from 'app/modules/post/graphql/postQueries'
import withPreloader from 'hocs/withPreloader'

export default compose(
  graphql(GET_POST, {
    options: ({ params: { id } }) => ({
      variables: {
        id
      }
    })
  }),
  withPreloader,
  pure
)(EntryPage)
