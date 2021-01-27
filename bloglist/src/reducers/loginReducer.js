import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(action.data)
      )
      blogService.setToken(action.data.token)
      return action.data
    case 'LOGOUT':
      window.localStorage.clear()
      return null
    default:
      return state
  }
}

export const loginServer = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5, true))
    }
  }
}

export const loginLocalStorage = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default reducer
