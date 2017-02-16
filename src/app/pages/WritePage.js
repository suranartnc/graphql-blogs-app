import React, { PropTypes} from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import { pure, withState, withHandlers, compose } from 'recompose'

import { ADD_POST } from 'app/modules/post/graphql/postMutations'

function WritePage ({ onSubmit, onInputChange }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onInputChange('title')} />
        <textarea onChange={onInputChange('body')} />
        <button>Submit</button>
      </form>
    </div>
  )
}

WritePage.propTypes = {
  input: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  setInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default compose(
  graphql(ADD_POST),
  withState('input', 'setInput', {
    title: '',
    body: ''
  }),
  withHandlers({
    onInputChange: ({ input, setInput }) => inputField => event => {
      setInput(Object.assign({}, input, {
        [inputField]: event.target.value
      }))
    },
    onSubmit: ({ mutate, input: { title, body }, router }) => event => {
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
