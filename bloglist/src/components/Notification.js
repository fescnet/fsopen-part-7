import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(store => store.notification)
  if(!notification){
    return null
  }
  const className = notification.isError ? 'error' : 'success'
  return (
    <div className={className}>
      {notification.msg}
    </div>
  )
}

export default Notification
