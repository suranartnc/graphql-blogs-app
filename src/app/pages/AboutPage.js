import React, {Component} from 'react'
import Helmet from 'react-helmet'

import withPage from 'hocs/withPage'

@withPage()
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
        About page
      </div>
    )
  }
}

export default AboutPage
