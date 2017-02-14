import React, {Component} from 'react'

import styles from 'styles/storybook/styleguide.scss'
import logo from 'static/images/react.png'

class Styleguide extends Component {
  render () {
    return (
      <div className={styles.container}>
        <img src={logo} style={{ width: '300px', height: '300px' }} />
      </div>
    )
  }
}

export default Styleguide
