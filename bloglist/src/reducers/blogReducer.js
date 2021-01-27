import blogService from '../services/blogs'
import commentService from '../services/comments'
import { setNotification } from './notificationReducer'
import { addBlogToUser, removeBlogFromUser } from './userReducer'

const order = (blogs) => {
    const orderedBlogs = [ ...blogs ]
    return orderedBlogs.sort((a,b) => {
      if (a.likes < b.likes) {
        return 1
      }
      if (a.likes > b.likes) {
        return -1
      }
      return 0
    })
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return order([...state, action.data])
    case 'UPDATE_BLOG':
      const updatedBlogs = state.map(blog =>
        blog.id !== action.data.id ? blog : action.data
      )
      return order(updatedBlogs)
    case 'DELETE_BLOG':
      const notDeletedBlogs = state.filter(blog => blog.id !== action.data.id)
      return order(notDeletedBlogs)
    case 'INIT_BLOGS':
      return order(action.data)
    case 'ADD_COMMENT_TO_BLOG':
      return state.map(b => {
        if(b.id === action.data.blog.id){
          return { ...b, comments: b.comments.concat(action.data.comment) }
        }
        return b
      })
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
      })
    }
    catch (e) {
      dispatch(setNotification('something went wrong', 5, true))
    }
  }
}

export const createBlog = (blog, user) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      newBlog.user = { ...user }
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
      dispatch(addBlogToUser(user, newBlog))
      dispatch(setNotification(`blog '${newBlog.title}' created!`, 5))
    }
    catch (e) {
      dispatch(setNotification('something went wrong', 5, true))
    }
  }
}

export const like = blog => {
  return async dispatch => {
    try {
      const changedBlog = {
        ...blog,
        likes: blog.likes + 1,
        comments: blog.comments.map(c => c.id)
      }
      const updatedBlog = await blogService.update(changedBlog.id, changedBlog)
      updatedBlog.user = { ...blog.user }
      updatedBlog.comments = [ ...blog.comments ]
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })
      dispatch(setNotification(`you liked '${updatedBlog.title}'`, 5))
    }
    catch (e) {
      dispatch(setNotification('something went wrong', 5, true))
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.deleteOne(blog.id)
      dispatch({
        type: 'DELETE_BLOG',
        data: blog,
      })
      dispatch(removeBlogFromUser(blog.user, blog))
      dispatch(setNotification(`Blog ${blog.title} removed successfully`, 5, false))
    }
    catch (e) {
      dispatch(setNotification('something went wrong', 5, true))
    }
  }
}

export const addCommentToBlog = (blog, comment) => {
  return async dispatch => {
    try {
      const createdComment = await commentService.create(blog.id, comment)
      dispatch({
        type: 'ADD_COMMENT_TO_BLOG',
        data: { blog, comment: createdComment },
      })
    }
    catch (e) {
      dispatch(setNotification('something went wrong', 5, true))
    }
  }
}

export default reducer
