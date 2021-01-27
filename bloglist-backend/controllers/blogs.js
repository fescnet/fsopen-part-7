const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const token = req.token
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const createdBlog = await blog.save()
  user.blogs = user.blogs.concat(createdBlog._id)
  await user.save()
  res.status(201).json(createdBlog)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const body = req.body
  const blogId = req.params.id

  const blog = await Blog.findById(blogId)
  const comment = new Comment({
    content: body.content,
    blog: blogId
  })
  const createdComment = await comment.save()
  blog.comments = blog.comments.concat(createdComment._id)
  await blog.save()
  res.status(201).json(createdComment)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const token = req.token
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id).populate('blogs')
  const blog = await Blog.findById(id).populate('user')

  if(!blog){
    return res.status(204).end()
  }

  if(!blog.user._id.equals(user._id)){
    return res.status(401).json({ error: 'removal denied.  User is not the blog\'s creator' })
  }

  await blog.remove()
  user.blogs = user.blogs.filter(b => !b.equals(blog))
  await user.save()
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true })
  res.json(blog)
})

module.exports = blogsRouter
