import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import { pure, withHandlers, compose } from 'recompose'
import { ADD_POST } from 'app/modules/post/graphql/postMutations'

import WritePage from 'components/pages/Write/WritePage'

export default compose(
  graphql(ADD_POST),
  withHandlers({
    submitForm: ({ mutate, router }) => variables => {
      mutate({ variables })
        .then(() => {
          router.push('/')
        }).catch((e) => {
          console.error(e)
        })
    }
  }),
  withRouter,
  pure
)(WritePage)
