import React, { Component } from 'react'
import ToDoApp from './ToDo/ToDoApp'
import cx from 'classnames'

import { todos } from 'src/config/tasks'

import s from './DevTools.scss'

class DevTools extends Component {
  state = {
    expand: false
  }

  onCloseButtonClicked = (e) => {
    this.setState({
      expand: !this.state.expand
    })
  }

  render () {
    if (process.env.NODE_ENV === 'production') {
      return null
    }
    const buttonName = this.state.expand ? 'Close' : 'DevTools'
    return (
      <div className={cx(s.container, { 'expand': this.state.expand })}>
        <div className={cx({ 'hide': !this.state.expand })}>
          <ToDoApp todos={todos} />
        </div>
        <button className={cx(s.button, { 'fixed': this.state.expand })} onClick={this.onCloseButtonClicked}>{buttonName}</button>
      </div>
    )
  }
}

export default DevTools
