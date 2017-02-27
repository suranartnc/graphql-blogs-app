import React, {PropTypes} from 'react'
import Header from 'components/commons/Header'

import s from 'styles/components/layouts/Layout.scss'

function PageLayout ({ children }) {
  return (
    <div>
      <Header />
      <main className={s.main}>
        {children}
      </main>
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageLayout
