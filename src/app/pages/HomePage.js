import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import CSSModules from 'react-css-modules'

import withData from 'hocs/withData'
import withPage from 'hocs/withPage'
import { fetchData1 } from 'modules/post/postActions'

import ErrorPage from 'noxt/app/pages/ErrorPage'

import styles from 'styles/pages/Homepage.scss'

@withData(({ post, error }) => ({ post, error }), [ fetchData1 ])
@withPage()
@CSSModules(styles)
class HomePage extends Component {
  render () {
    const { post, error } = this.props
    if (error !== false) {
      return <ErrorPage status={error.status} message={error.message} />
    }
    return (
      <div styleName="container">
        <Helmet
          title="Home"
          meta={[
            {
              name: 'description',
              content: 'This is homepage.'
            }
          ]}
        />
        HomePage
        <p>{post.login}</p>
      </div>
    )
  }
}

HomePage.propTypes = {
  post: PropTypes.shape({
    login: PropTypes.string.isRequired
  }),
  error: PropTypes.shape({
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  })
}

export default HomePage
