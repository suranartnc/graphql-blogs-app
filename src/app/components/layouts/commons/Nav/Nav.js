import React from 'react'
import {Link} from 'react-router'

import s from './styles.scss'

function Nav () {
  return (
    <div className={s.container}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/grid">Grid</Link></li>
      </ul>
    </div>
  )
}

export default Nav
