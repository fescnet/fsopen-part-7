import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const LoggedUser = () => {

  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  return (
    <em className="logged-user">
      {user.name} logged-in <button onClick={() => dispatch(logout())}>logout</button>
    </em>
  )
}

export default LoggedUser
