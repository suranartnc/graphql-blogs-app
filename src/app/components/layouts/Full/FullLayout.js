import React, {PropTypes} from 'react'
import Header from '../commons/Header/Header'

import s from './FullLayout.scss'

function FullLayout ({ children }) {
  return (
    <div>
      <Header />
      <main className={s.main}>
        {children}
      </main>
    </div>
  )
}

FullLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default FullLayout
