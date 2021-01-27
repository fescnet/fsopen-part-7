const reducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'UNSET_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (msg, seconds, isError = false) => {
  return async (dispatch, getState) => {
    const curNotification = getState().notification
    if(curNotification){
      clearTimeout(curNotification.timeoutID)
    }
    const timeoutID = setTimeout(() => {
      dispatch(unsetNotification())
    }, seconds * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: { msg, timeoutID, isError }
    })
  }
}

export const unsetNotification = () => {
  return {
    type: 'UNSET_NOTIFICATION'
  }
}

export default reducer
