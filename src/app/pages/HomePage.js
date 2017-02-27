import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import PostList from 'components/PostList'

function HomePage ({ data, onNextPageClicked }) {
  return (
    <div>
      <Helmet
        title="Home"
        meta={[
          {
            name: 'description',
            content: 'This is homepage.'
          }
        ]}
      />
      <PostList data={data} />
      <button onClick={onNextPageClicked}>Next page</button>
    </div>
  )
}

HomePage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    fetchMore: PropTypes.func.isRequired
  }),
  onNextPageClicked: PropTypes.func.isRequired
}

export default HomePage
