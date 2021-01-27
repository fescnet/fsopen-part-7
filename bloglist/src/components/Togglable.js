import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hideBtnBeforeChildren = props.hideBtnBeforeChildren
  const hideBtn = <Button variant="contained" style={showWhenVisible} onClick={toggleVisibility}>{props.hideButtonLabel}</Button>
  const children = <div style={showWhenVisible} className="togglableContent">{props.children}</div>
  const hideBtnAndChildren = (hideBtnBeforeChildren)?
    <span>{hideBtn}{children}</span>
    : <span>{children}{hideBtn}</span>

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <span>
      <Button variant="contained" color="primary" style={hideWhenVisible} onClick={toggleVisibility}>
        {props.showButtonLabel}
      </Button>
      {hideBtnAndChildren}
    </span>
  )
})

Togglable.propTypes = {
  hideBtnBeforeChildren: PropTypes.bool.isRequired,
  hideButtonLabel: PropTypes.string.isRequired,
  showButtonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
