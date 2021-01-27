import React from 'react'

const Notification = ({ msg }) => {
  return (
    msg ? <div>{msg}</div> : <div></div>
  )
}

export default Notification
