import React, { useEffect, useRef } from 'react'
import Container from '@material-ui/core/Container'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoggedUser from './components/LoggedUser'
import UserList from './components/UserList'
import User from './components/User'
import BlogView from './components/BlogView'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loginLocalStorage } from './reducers/loginReducer'
import {
  useRouteMatch, Switch, Route, Link
} from "react-router-dom"
import { AppBar, Toolbar, Button } from '@material-ui/core'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loginLocalStorage())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

  const blogFormRef = useRef()
  const user = useSelector(store => store.user)
  const users = useSelector(store => store.users)
  const blogs = useSelector(store => store.blogs)

  const smTopMargin = {
    marginTop: 20
  }

  const match = useRouteMatch('/users/:id')
  const userView = match
    ? users.find(u => u.id === match.params.id)
    : null

  const matchABlog = useRouteMatch('/blogs/:id')
  const blogView = matchABlog
    ? blogs.find(b => b.id === matchABlog.params.id)
    : null

  return (
    <div>
      {user === null ?
        <Container component="main" maxWidth="xs">
          <Notification />
          <Login />
        </Container>
        :
        <Container>
          <div>
            <AppBar position="static">
              <Toolbar>
                <Button color="inherit" component={Link} to="/">
                  blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  users
                </Button>
                <LoggedUser />
              </Toolbar>
            </AppBar>
          </div>
          <h1>Blog app</h1>
          <Notification />
          <Switch>
            <Route path="/blogs/:id">
              <BlogView blog={blogView} />
            </Route>
            <Route path="/users/:id">
              <User user={userView} />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/">
              <Togglable showButtonLabel='create new blog post' hideButtonLabel='cancel blog creation' hideBtnBeforeChildren={true} ref={blogFormRef}>
                <BlogForm />
              </Togglable>
              <div style={smTopMargin}>
                <BlogList />
              </div>
            </Route>
          </Switch>
        </Container>
      }
    </div>
  )
}

export default App
