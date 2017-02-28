import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames/bind'

import s from './styles.scss'

let cx = classNames.bind(s)

const PostItemClass = (props) => cx({
  container: true,
  [`${props.theme}`]: true
})

function PostItem (props) {
  const {
    post: {
      _id,
      title,
      excerpt
    },
    count
  } = props

  const renderPostItemClass = PostItemClass(props)
  console.log(renderPostItemClass)
  return (
    <article key={_id} className={renderPostItemClass}>
      <div className={s.thumbnail}>
        <Link to={`/post/${_id}`}>
          <img src={`http://lorempixel.com/640/360/nature/${count}`} alt={title} />
        </Link>
      </div>
      <div className={s.detail}>
        <h2 className={s.postTitle}>
          <Link to={`/post/${_id}`}>{title}</Link>
        </h2>
        <div className={s.postDesc}>
          <p>{excerpt}</p>
        </div>
      </div>
    </article>
  )
}

PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired
  }).isRequired,
  count: PropTypes.number,
  theme: PropTypes.string
}

PostItem.defaultProps = {
  theme: 'default'
}

export default PostItem
