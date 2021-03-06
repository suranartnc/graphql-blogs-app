import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import PostList from 'components/modules/Post/PostList/PostList'
import PostItem from 'components/modules/Post/PostItem/PostItem'

import s from './HomePage.scss'

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
      <PostList data={data} template={PostItem} />
      <div className={s.loadbox}>
        <button className={s.loadmore} onClick={onNextPageClicked}>Next page</button>
      </div>
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
