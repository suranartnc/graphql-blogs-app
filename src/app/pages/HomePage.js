import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import CSSModules from 'react-css-modules'

import styles from 'styles/pages/Homepage.scss'

@CSSModules(styles)
class HomePage extends Component {
  render () {
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
      </div>
    )
  }
}

export default HomePage
