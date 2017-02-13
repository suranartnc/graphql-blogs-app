import React, {Component} from 'react'
import Helmet from 'react-helmet'

import styles from '../styles/pages/About.scss'

class AboutPage extends Component {
  render () {
    return (
      <div>
        <Helmet
          title="About"
          meta={[
            {
              name: 'description',
              content: 'This is about page.'
            }
          ]}
        />
        <p className={styles.red}>About page</p>
      </div>
    )
  }
}

export default AboutPage
