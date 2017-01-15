import React, {Component, PropTypes} from 'react'

class WritePage extends Component {

  state = {
    title: '',
    body: ''
  }

  handleInputChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" onChange={this.handleInputChange('title')} />
          <textarea onChange={this.handleInputChange('body')} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

WritePage.propTypes = {

}

export default WritePage
