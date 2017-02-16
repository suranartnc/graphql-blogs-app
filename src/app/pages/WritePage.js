import React, { PropTypes} from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import { pure, withHandlers, compose } from 'recompose'

import { ADD_POST } from 'app/modules/post/graphql/postMutations'
import WriteForm from 'components/WriteForm'

function WritePage ({ createPost }) {
  return (
    <div>
      <WriteForm createPost={createPost} />
    </div>
  )
}

WritePage.propTypes = {
  createPost: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default compose(
  graphql(ADD_POST),
  withHandlers({
    createPost: ({ mutate, router }) => variables => {
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
