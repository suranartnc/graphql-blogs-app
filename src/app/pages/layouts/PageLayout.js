import React, {PropTypes} from 'react'
import Header from 'components/Header'

import s from 'styles/pages/Layout.scss'

const PageLayout = props => {
  return (
    <div>
      <Header />
      <main className={s.main}>
        {props.children}
      </main>
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageLayout
