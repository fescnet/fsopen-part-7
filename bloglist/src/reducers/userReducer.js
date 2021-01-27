import userService from '../services/users'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.data
    case 'ADD_BLOG_TO_USER':
      return state.map(u => {
        if(u.username === action.data.user.username){
          return { ...u, blogs: u.blogs.concat(action.data.blog) }
        }
        return u
      })
    case 'REMOVE_BLOG_FROM_USER':
      return state.map(u =>
        u.username === action.data.user.username
        ? { ...u, blogs: u.blogs.filter(b => b.id !== action.data.blog.id) }
        : u
      )
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()
      dispatch({
        type: 'INIT_USERS',
        data: users,
      })
    }
    catch (e) {
      dispatch(setNotification('something went wrong', 5, true))
    }
  }
}

export const addBlogToUser = (user, blog) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_BLOG_TO_USER',
      data: { user, blog },
    })
  }
}

export const removeBlogFromUser = (user, blog) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_BLOG_FROM_USER',
      data: { user, blog },
    })
  }
}

export default reducer
