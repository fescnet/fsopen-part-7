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

const UserList = () => {

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

  const users = useSelector(store => store.users)

  if(!users){
    return null
  }

  return (
    <div className="user-list">
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell align="center">Blogs created</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <StyledTableRow key={user.id}>
                <StyledTableCell><Link to={`/users/${user.id}`}>{user.name}</Link></StyledTableCell>
                <StyledTableCell align="center">{user.blogs.length}</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
