import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import useField from '../hooks'

const BlogForm = () => {

  const dispatch = useDispatch()

  const user = useSelector(store => store.user)

  const newTitle = useField('text', 'Title', 'title')
  const newAuthor = useField('text', 'Author', 'author')
  const newUrl = useField('text', 'URL', 'url')

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title : newTitle.value,
      author: newAuthor.value,
      url: newUrl.value
    }, user))
    newTitle.reset()
    newUrl.reset()
    newAuthor.reset()
  }

  const btnStyle = {
    marginTop: 20
  }

  return (
    <div>
      <h2>Create new blog post</h2>
      <form onSubmit={addBlog}>
        <TextField {...newTitle} reset='' />
        <TextField {...newAuthor} reset='' />
        <TextField {...newUrl} reset='' />
        <Button variant="contained" color="primary" type="submit" id="submit_new_blog_form" style={btnStyle}>create</Button>
      </form>
    </div>
  )}

export default BlogForm
