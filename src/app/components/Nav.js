import React, {Component} from 'react'
import {Link} from 'react-router'

class Nav extends Component {
  render () {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/grid">Grid</Link></li>
          <li><Link to="/write">Write</Link></li>
        </ul>
      </div>
    )
  }
}

export default Nav
