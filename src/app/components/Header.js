import React from 'react'
import {Link} from 'react-router'

import Nav from 'components/Nav'
import s from 'styles/components/Header.scss'

function Header () {
  return (
    <header className={s.container}>
      <div className={s.logo}>
        <h1><Link to="/">Logo</Link></h1>
      </div>
      <Nav />
      <div className={s.write}>
        <Link className={s.writeButton} to="/write">New story</Link>
      </div>
    </header>
  )
}

export default Header
