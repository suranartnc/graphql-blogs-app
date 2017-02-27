import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { mapToCssModules } from 'core/app/utils/coreui'

const propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  noGutters: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
}

const defaultProps = {
  tag: 'div'
}

const Row = (props) => {
  const {
    className,
    cssModule,
    noGutters,
    tag: Tag,
    ...attributes
  } = props

  const classes = mapToCssModules(classNames(
    className,
    noGutters ? 'no-gutters' : null,
    'row'
  ), cssModule)

  return (
    <Tag {...attributes} className={classes} />
  )
}

Row.propTypes = propTypes
Row.defaultProps = defaultProps

export default Row
