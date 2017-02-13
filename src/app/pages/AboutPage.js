import React, {Component} from 'react'
import Helmet from 'react-helmet'

import '../styles/pages/About.scss'

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
        <p styleName="red">About page</p>
      </div>
    )
  }
}

export default AboutPage
