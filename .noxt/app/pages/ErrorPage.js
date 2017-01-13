import React, {Component, PropTypes} from 'react'
import withPage from 'hocs/withPage'

@withPage()
class ErrorPage extends Component {
  render () {
    return (
      <div>
        <h1>{this.props.status}</h1>
        <p>{this.props.message}</p>
      </div>
    )
  }
}

ErrorPage.defaultProps = {
  status: '404',
  message: 'Not Found'
}

ErrorPage.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string
}

export default ErrorPage
