import React, { PropTypes } from 'react'
import { pure, withState, withHandlers, compose } from 'recompose'

function WriteForm ({ onSubmit, onInputChange }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" onChange={onInputChange('title')} />
      <textarea onChange={onInputChange('body')} />
      <button>Submit</button>
    </form>
  )
}

WriteForm.propTypes = {
  input: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  setInput: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default compose(
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
    onSubmit: ({ input, createPost }) => event => {
      event.preventDefault()
      return createPost(input)
    }
  }),
  pure
)(WriteForm)
