import React, { PropTypes} from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import { pure, withState, withHandlers, compose } from 'recompose'

import { ADD_POST } from 'app/modules/post/graphql/postMutations'

function WritePage ({ onSubmit, onTitleChange, onBodyChange }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onTitleChange} />
        <textarea onChange={onBodyChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

WritePage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onBodyChange: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setBody: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default compose(
  withState('title', 'setTitle', ''),
  withState('body', 'setBody', ''),
  graphql(ADD_POST),
  withHandlers({
    onTitleChange: ({ setTitle }) => event => {
      setTitle(event.target.value)
    },
    onBodyChange: ({ setBody }) => event => {
      setBody(event.target.value)
    },
    onSubmit: ({ mutate, title, body, router }) => event => {
      event.preventDefault()
      mutate({
        variables: {
          title,
          body
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addPost: {
            __typename: 'addPostResponseType',
            post: {
              __typename: 'PostType',
              _id: new Date().getTime(),
              title,
              body
            },
            errors: []
          }
        }
      })
      .then(() => {
        router.push('/')
      }).catch((error) => {
        console.log('there was an error sending the query', error)
      })
    }
  }),
  withRouter,
  pure
)(WritePage)
