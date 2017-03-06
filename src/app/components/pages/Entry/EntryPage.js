import React, { PropTypes } from 'react'

import PostEntry from 'components/modules/Post/PostEntry/PostEntry'
import { Container } from 'core/app/components'
import s from './EntryPage.scss'

function EntryPage ({ data: { post } }) {
  return (
    <Container className={s.container}>
      <PostEntry post={post} />
    </Container>
  )
}

EntryPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    post: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    })
  }).isRequired
}

export default EntryPage
