import React from 'react'
import Helmet from 'react-helmet'

import s from 'styles/pages/About.scss'

function AboutPage () {
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
      <p className={s.red}>About page</p>
    </div>
  )
}

export default AboutPage
