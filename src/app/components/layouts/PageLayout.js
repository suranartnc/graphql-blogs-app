import React, {PropTypes} from 'react'
import Header from 'components/commons/Header/Header'

import s from './styles.scss'

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
