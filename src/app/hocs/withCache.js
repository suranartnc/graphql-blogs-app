import React from 'react'
// import Redis from 'redis'
import { branch, renderComponent } from 'recompose'

export default branch(
  (props) => {
    // const cacheKey = JSON.stringify(props)
    // if (Redis.get(cacheKey) !=== null) {
    //  return true
    // }
    return false
  },
  renderComponent(() => {
    // const cacheKey = JSON.stringify(props)
    // return (<p>{Redis.get(cacheKey)}</p>)
    return (<p>cached!!!</p>)
  }),
)
