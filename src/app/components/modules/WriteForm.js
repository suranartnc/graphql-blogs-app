import React, { PropTypes } from 'react'
import withForm from 'hocs/withForm'

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
  submitForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default withForm({
  title: '',
  body: ''
})(WriteForm)
