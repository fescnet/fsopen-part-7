import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, deleteBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'
import Comments from './Comments'
import CommentForm from './CommentForm'
import { Button } from '@material-ui/core'

const BlogView = ({blog}) => {

  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const history = useHistory()

  if(!blog){
    return null
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      history.push('/')
    }
  }

  let removeButton = ''
  if(user.username === blog.user.username){
    removeButton = <Button variant="outlined" color="secondary" onClick={() => removeBlog(blog)} id="remove_button">remove</Button>
  }

  return (
    <div>
      <h2>{ blog.title } <br />written by { blog.author }</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={() => dispatch(like(blog))}>like</button></div>
      <div>added by {blog.user.name}</div>
      <br />
      {removeButton}
      <h3>comments</h3>
      <CommentForm blog={blog} />
      <Comments comments={ blog.comments } />
    </div>
  )
}

export default BlogView
