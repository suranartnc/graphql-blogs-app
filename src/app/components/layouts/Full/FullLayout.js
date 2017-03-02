import React, {PropTypes} from 'react'
import Header from '../commons/Header/Header'
import DevTools from 'components/modules/DevTools'

import s from './styles.scss'

function FullLayout ({ children }) {
  return (
    <div>
      <Header />
      <main className={s.main}>
        {children}
      </main>
      <DevTools />
    </div>
  )
}

FullLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default FullLayout
