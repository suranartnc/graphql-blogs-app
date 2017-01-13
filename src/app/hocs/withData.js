import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

function withData (mapStateToProps = null, actions = []) {
  return (ComposeComponent) => {
    class ComponentWithData extends Component {
      static prefetchData = actions
      componentDidMount () {
        actions.forEach((action) => {
          this.props.dispatch(action())
        })
      }
      render () {
        return <ComposeComponent {...this.props} />
      }
    }
    ComponentWithData.propTypes = {
      dispatch: PropTypes.func.isRequired
    }
    return connect(mapStateToProps)(ComponentWithData)
  }
}

export default withData
