import React, {PropTypes} from 'react'
import Nav from 'components/Nav'

const PageLayout = props => {
  return (
    <div>
      <Nav />
      {props.children}
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageLayout
