import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const BlogList = () => {

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

  const blogs = useSelector(store => store.blogs)

  if(!blogs){
    return null
  }

  return (
    <div className="blog-list">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Blog</StyledTableCell>
              <StyledTableCell align="center">Likes</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map(blog =>
              <StyledTableRow key={blog.id}>
                <StyledTableCell className="blog-list-item">
                  <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {blog.likes}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
