import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

import { resetError } from 'noxt/app/redux/modules/error/errorActions'

function withPage () {
  return (ComposeComponent) => {
    class ComponentWithPage extends Component {
      componentWillUnmount () {
        this.props.dispatch(resetError())
      }
      render () {
        return <ComposeComponent {...this.props} />
      }
    }
    ComponentWithPage.propTypes = {
      dispatch: PropTypes.func.isRequired
    }
    return connect(null)(ComponentWithPage)
  }
}

export default withPage
