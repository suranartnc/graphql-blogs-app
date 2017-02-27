import React, { PropTypes} from 'react'

import WriteForm from 'components/WriteForm'

function WritePage ({ submitForm }) {
  return (
    <div>
      <WriteForm submitForm={submitForm} />
    </div>
  )
}

WritePage.propTypes = {
  submitForm: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default WritePage
