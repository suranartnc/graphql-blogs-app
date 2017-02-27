import React from 'react'

import styles from 'styles/storybook/styleguide.scss'
import logo from 'images/react.png'

const componentName = () => {
  return (
    <div className={styles.container}>
      <img src={logo} />
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </div>
  )
}

export default componentName
