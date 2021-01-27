import React from 'react'
import { useDispatch } from 'react-redux'
import { addCommentToBlog } from '../reducers/blogReducer'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import useField from '../hooks'

const CommentForm = ({blog}) => {

  const dispatch = useDispatch()
  const newComment = useField('text', 'Your comment', 'comment')

  const addComment = (event) => {
    event.preventDefault()
    dispatch(addCommentToBlog(blog, {
      content : newComment.value
    }))
    newComment.reset()
  }

  const btnStyle = {
    marginTop: 20
  }

  return (
    <form onSubmit={addComment}>
      <TextField {...newComment} reset='' />
      <Button variant="contained" style={btnStyle} size="small" color="primary" type="submit">add comment</Button>
    </form>
  )
}

export default CommentForm
